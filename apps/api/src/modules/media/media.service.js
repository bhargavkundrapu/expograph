// apps/api/src/modules/media/media.service.js

function mustGetEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

async function createCloudflarePlaybackToken({ videoUid }) {
  const accountId = mustGetEnv("CF_ACCOUNT_ID");
  const apiToken = mustGetEnv("CF_API_TOKEN");

  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/stream/${videoUid}/token`;

  // Node 22+ has global fetch
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
      signal: controller.signal,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const msg = data?.errors?.[0]?.message || `Cloudflare token failed (${res.status})`;
      const err = new Error(msg);
      err.statusCode = 502;
      err.details = data;
      throw err;
    }

    const token = data?.result?.token;
    if (!token) {
      const err = new Error("Cloudflare token missing in response");
      err.statusCode = 502;
      err.details = data;
      throw err;
    }

    return token;
  } finally {
    clearTimeout(timeout);
  }
}

function buildPlaybackUrls({ token }) {
  const customerCode = mustGetEnv("CF_STREAM_CUSTOMER_CODE"); // like customer-xxxxxx

  // Cloudflare docs: use token in URL to play (iframe/manifest)
  // https://customer-<CODE>.cloudflarestream.com/<TOKEN>/iframe
  // https://customer-<CODE>.cloudflarestream.com/<TOKEN>/manifest/video.m3u8
  const base = `https://${customerCode}.cloudflarestream.com/${token}`;

  return {
    iframeUrl: `${base}/iframe`,
    hlsUrl: `${base}/manifest/video.m3u8`,
  };
}

module.exports = {
  createCloudflarePlaybackToken,
  buildPlaybackUrls,
};
