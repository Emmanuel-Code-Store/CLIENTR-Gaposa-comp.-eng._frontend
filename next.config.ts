import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve.alias['@tenderStep'] = path.join(__dirname, 'src');
    return config;
  },
};

export default nextConfig;
