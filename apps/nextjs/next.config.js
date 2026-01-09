/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  // Enable TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },
  // Enable ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;
