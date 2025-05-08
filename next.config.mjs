/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.icons8.com/**',
        port: '',
        search: '',
      },
    ],
  },
}

export default nextConfig
