/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [
      'scoprixlabs.com',
      'api.scoprixlabs.com',
      'cdn.scoprixlabs.com'
    ],
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error']
    } : false,
  },
  
  // Bundle analyzer (uncomment for analysis)
  // bundleAnalyzer: {
  //   enabled: process.env.ANALYZE === 'true',
  // },
  
  // Headers for security and performance
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/(.*)',
        headers: [
          // Security headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          // Performance headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          }
        ],
      },
      {
        // Cache static assets
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
      {
        // Cache fonts
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      }
    ]
  },
  
  // Redirects for SEO
  async redirects() {
    return [
      // Redirect old URLs if any
      {
        source: '/change-order-automation',
        destination: '/hvac-change-order-automation',
        permanent: true,
      },
      {
        source: '/quote-validation',
        destination: '/vendor-quote-validation',
        permanent: true,
      }
    ]
  },
  
  // Rewrites for clean URLs
  async rewrites() {
    return [
      // API routes
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
      // Sitemap
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      // Robots.txt
      {
        source: '/robots.txt',
        destination: '/api/robots',
      }
    ]
  },
  
  // Environment variables
  env: {
    CUSTOM_KEY: 'value',
  },
  
  // Webpack customization
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRun