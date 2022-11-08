/** @type {import('next').NextConfig} */
const nextConfig = {


  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@prisma/client'],
    scrollRestoration: true

  },
  productionBrowserSourceMaps: false,
  webpack(config) {

    config.module.rules.push({
      test: /\.svg$/,
      use: [{
        loader: '@svgr/webpack',
        options: {
          Memo: true
        }
      }],
    });

    return config;
  }
}

module.exports = nextConfig
