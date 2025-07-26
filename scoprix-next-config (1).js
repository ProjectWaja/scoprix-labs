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
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    // Important: return the modified config
    
    // Optimize bundle splitting
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20
          },
          // Common chunk
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      }
    }
    
    // PDF.js worker configuration
    config.resolve.alias.canvas = false
    config.resolve.alias.encoding = false
    
    // File loader for PDFs and other construction documents
    config.module.rules.push({
      test: /\.(pdf|dwg|dxf)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/files/',
          outputPath: 'static/files/',
        },
      },
    })
    
    // SVG optimization
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })
    
    return config
  },
  
  // Output settings
  output: 'standalone',
  
  // Typescript configuration
  typescript: {
    // Allow production builds to complete even if there are type errors
    ignoreBuildErrors: false,
  },
  
  // ESLint configuration
  eslint: {
    // Allow production builds to complete even if there are lint errors
    ignoreDuringBuilds: false,
  },
  
  // PoweredByHeader
  poweredByHeader: false,
  
  // Compress
  compress: true,
  
  // React strict mode
  reactStrictMode: true,
  
  // SWC minify
  swcMinify: true,
  
  // Trailing slash
  trailingSlash: false,
}

module.exports = nextConfig