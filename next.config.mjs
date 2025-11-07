/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
    serverActions: {
      bodySizeLimit: '20mb', // kamu bisa sesuaikan misal 5mb, 10mb, 20mb
    },
  },
};

export default nextConfig;
