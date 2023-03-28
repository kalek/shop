/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['naszsklep-api.vercel.app'],
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/products/0',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
