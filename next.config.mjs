/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/cms',
    images: {
        domains: ['livingphotos.blob.core.windows.net'],
        
        remotePatterns: [
          {
            protocol: 'http',
            hostname: '64.23.178.44'
        },
        ],
      },
};

export default nextConfig;
