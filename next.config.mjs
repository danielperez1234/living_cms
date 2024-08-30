/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/cms',
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: '64.23.178.44',
            port: '',
            pathname: '/cms/**', 
        },
        ],
      },
};

export default nextConfig;
