/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://todo-a61k.vercel.app/api/:path*',
          },
        ]
      },
};

module.exports = nextConfig;
