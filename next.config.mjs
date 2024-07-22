/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  basePath: "",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/pages/home",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/pages/home",
      },
      {
        source: "/login",
        destination: "/pages/login",
      },
      {
        source: "/check-email",
        destination: "/pages/check-email",
      },
      {
        source: "/conversation",
        destination: "/pages/conversation",
      },
    ];
  },
};

export default nextConfig;
