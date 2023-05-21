require("dotenv/config");

const isProd = process.env.PROD === "true";
console.log({ isProd });
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
};

module.exports = nextConfig;
