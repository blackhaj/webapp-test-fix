/* eslint-disable @typescript-eslint/no-var-requires */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  node: {
    net: 'empty',
  },
};

module.exports = nextConfig;
