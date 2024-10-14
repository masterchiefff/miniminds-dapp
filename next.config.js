/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
          test: /\.m?js$/,
          resolve: {
            fullySpecified: false, 
          },
        });
    
        return config;
    },
}

module.exports = nextConfig
