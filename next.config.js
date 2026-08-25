/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['fonts.gstatic.com'],
  },
  async redirects() {
    const devRedirects = [
      'hero-text-options',
      'hero-options',
      'hero-layout-options',
      'hero-subheading-options',
      'work-typography-options',
      'tag-options',
      'card-options',
      'header-options',
      'workflow-node-options',
      'gallery-options',
      'gallery-format-options',
      'gallery-text-options',
      'storytelling-options',
      'tesla-style-options',
      'bento-workflows',
      'palette-duo-editor',
    ].flatMap((segment) => [
      { source: `/${segment}`, destination: `/dev/${segment}`, permanent: false },
      { source: `/${segment}/:path*`, destination: `/dev/${segment}/:path*`, permanent: false },
    ])

    return [{ source: '/work', destination: '/', permanent: true }, ...devRedirects]
  },
  webpack(config, { isServer }) {
    // Suppress warnings about dynamic requires
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }

    return config
  },
}

module.exports = nextConfig
