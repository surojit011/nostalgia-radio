import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/nostalgia-radio",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

