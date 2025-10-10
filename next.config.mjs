/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
      config.module.rules.push({
        test: /\.module\.css$/,
      });
      return config;
    },
  };
  
  export default nextConfig;
  