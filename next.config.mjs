/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
        source: "/chat",
        destination: "/pages/chat",
      },
      {
        source: "/api/:path*",
        destination: "/pages/api/:path*",
      },
    ];
  },
};

export default nextConfig;
