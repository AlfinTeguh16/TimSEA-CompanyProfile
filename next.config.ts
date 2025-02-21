import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["127.0.0.1"], // Tambahkan domain ini agar Next.js mengizinkan gambar dari Laravel
  },
};

export default nextConfig;
