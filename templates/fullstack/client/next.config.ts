import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: path.resolve(__dirname, "./")
  }
};

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig);
