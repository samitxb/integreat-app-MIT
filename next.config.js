/** @type {import('next').NextConfig} */
const nextConfig = {
    reactExperimental: {
      serverComponents: true,
    },
    env: {
      NEXT_PUBLIC_API_URL: "/frontend/src/app/api",
    },
    apiRoutes: [
      {
        path: '/api',
        target: 'http://localhost:3000/api',
      },
    ],
    basePath: '/de',
    favicon: './public/favicon.png',
  };
  
  module.exports = nextConfig;
  
  module.exports = {
  
  };


