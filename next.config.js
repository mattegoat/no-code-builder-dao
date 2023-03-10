const removeImports = require('next-remove-imports')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatar.tobi.sh'],
  },
  swcMinify: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(md|mdx)?$/,
      use: [
        {
          loader: '@mdx-js/loader',
          /** @type {import('@mdx-js/loader').Options} */
          options: {},
        },
      ],
    })
    return config
  },
}

module.exports = removeImports(nextConfig)
