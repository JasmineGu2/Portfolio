const path = require('path')
const { execSync } = require('child_process')

// "Last revised" in the footer: the date of the newest git commit, read once when the server or build starts.
function lastRevised() {
  try {
    return execSync('git log -1 --format=%cI', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()
  } catch {
    return new Date().toISOString()
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Astryx ships ES modules written for React 19; transpile them so the `react` alias below applies on the server too.
  transpilePackages: ['@astryxdesign/core', '@astryxdesign/theme-neutral'],
  env: { NEXT_PUBLIC_LAST_REVISED: lastRevised() },
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

    return [
      { source: '/work', destination: '/', permanent: true },
      // The Journey and Play are now one page, About me. Exact sources only: the gallery images live under /gallery/<file>.
      { source: '/gallery', destination: '/about', permanent: false },
      { source: '/architecture', destination: '/about', permanent: false },
      { source: '/play', destination: '/about', permanent: false },
      ...devRedirects,
    ]
  },
  webpack(config, { isServer }) {
    // Suppress warnings about dynamic requires
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }

    // On Windows, pnpm's nested node_modules symlinks resolve to a differently-cased
    // real path than the project's own working directory. Webpack treats those as two
    // separate modules, duplicating Next's router/context modules and breaking React
    // context (e.g. "Missing ActionQueueContext"). Resolving via the symlink path
    // instead of realpath keeps casing consistent.
    config.resolve.symlinks = false

    // Astryx calls React 19's `use(context)`. Point only its `react` imports at a tiny shim that adds it (see lib/react19-shim.js).
    config.module.rules.push({
      test: /\.[cm]?js$/,
      include: /node_modules[\\/](?:\.pnpm[\\/][^\\/]*[\\/]node_modules[\\/])?@astryxdesign[\\/]/,
      resolve: { alias: { react$: path.resolve(__dirname, 'lib/react19-shim.js') } },
    })

    return config
  },
}

module.exports = nextConfig
