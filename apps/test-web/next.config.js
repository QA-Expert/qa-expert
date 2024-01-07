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
  trailingSlash: true,
  /**
   * enables a static export as for this project we don't really need web service
   * @rul https://nextjs.org/docs/app/building-your-application/deploying/static-exports
   */
  output: 'export',
};

module.exports = nextConfig;
