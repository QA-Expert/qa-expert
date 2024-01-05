/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  /**
   * @url https://nextjs.org/docs/app/building-your-application/configuring/typescript#statically-typed-links
   */
  experimental: {
    typedRoutes: true,
  },
};

module.exports = nextConfig;
