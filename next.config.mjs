/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
    serverActions: {
      bodySizeLimit: '1GB', // kamu bisa sesuaikan misal 5mb, 10mb, 20mb
    },
    middlewareClientMaxBodySize: '1GB',
  },
};

export default nextConfig;
