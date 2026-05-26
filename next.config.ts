import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/research",
        destination: "/science",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
