require("dotenv/config");

const isProd = process.env.PROD === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  env: {
    NEXT_PUBLIC_BASE_URL: isProd
      ? process.env.NEXT_PUBLIC_BASE_URL_SERVER
      : process.env.NEXT_PUBLIC_BASE_URL_LOCAL,
  },
  compiler: {
    removeConsole: false,
  },
};

module.exports = nextConfig;
