/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    images: {
      domains: ["res.cloudinary.com"],
    },
  },
};

module.exports = nextConfig;
