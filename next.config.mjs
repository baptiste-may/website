import os from "node:os";

// Next.js only trusts the hostname the dev server was started on (localhost by
// default). Testing from another device on the LAN means reaching this machine
// by one of its own addresses, which changes with DHCP, so allow every
// non-internal IPv4 address currently assigned. IPv6 is skipped: URL hostnames
// keep the brackets (`[fe80::1]`), which would not match a bare address.
const allowedDevOrigins = Object.values(os.networkInterfaces())
  .flat()
  .filter((iface) => iface?.family === "IPv4" && !iface.internal)
  .map((iface) => iface.address);

/** @type {import("next").NextConfig} */
const nextConfig = {
  webpack(config) {
    // Find the file loader rule that handles SVGs
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg"),
    );

    config.module.rules.push(
      // Re-apply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: {
          not: [...(fileLoaderRule.resourceQuery?.not || []), /url/],
        }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  },
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  reactStrictMode: false,
  allowedDevOrigins,
};

export default nextConfig;
