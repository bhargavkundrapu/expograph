/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  async redirects() {
    return [
      { source: '/deck', destination: '/presentation', permanent: true },
      { source: '/product-story', destination: '/presentation', permanent: true },
    ];
  },
};

module.exports = nextConfig;
