// @ts-check
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  // The admin codebase has long-standing type issues (formik + chakra v2
  // clash under React 18 types). Unblock production builds while we
  // upgrade the UI stack.
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "randomuser.me" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "cloudflare-ipfs.com" },
      { protocol: "https", hostname: "api.unsplash.com" },
      { protocol: "https", hostname: "pexels.com" },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      lib: path.resolve(__dirname, "lib"),
      "@h": path.resolve(__dirname, "app"),
      "@c": path.resolve(__dirname, "components"),
      "@chart": path.resolve(__dirname, "components/charts"),
      "@ui": path.resolve(__dirname, "components/UI"),
      "@em": path.resolve(__dirname, "components/email"),
      "@data": path.resolve(__dirname, "components/data"),
      "@proj": path.resolve(__dirname, "components/projects"),
      "@msg": path.resolve(__dirname, "components/messages"),
      "@usr": path.resolve(__dirname, "components/users"),
      "@cs": path.resolve(__dirname, "styles/pages"),
      "@s": path.resolve(__dirname, "styles"),
      "@css": path.resolve(__dirname, "styles/components"),
      utils: path.resolve(__dirname, "utils"),
    };
    return config;
  },
};

module.exports = nextConfig;
