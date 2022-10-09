/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: "build",
};

// module.exports = withPWA({
//   ...nextConfig,
// });
module.exports = withPWA(nextConfig);
