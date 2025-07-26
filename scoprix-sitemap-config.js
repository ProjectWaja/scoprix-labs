/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://scoprixlabs.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  
  // Exclude API routes and admin pages
  exclude: [
    '/api/*',
    '/admin/*',
    '/dashboard/*',
    '/auth/*',
    '/404',
    '/500',
    '/server-sitemap-index.xml' // Dynamic sitemap
  ],
  
  // Additional paths for manual inclusion
  additionalPaths: async (config) => {
    const result = []
    
    // Add dynamic routes
    const servicePages = [
      '/hvac-change-order-automation',
      '/vendor-quote-validation',
      '/rom-budget-estimation',
      '/construction-document-analysis',
      '/mechanical-contractor-software'
    ]
    
    const locationPages = [
      '/los-angeles-hvac-contractors',
      '/san-francisco-mechanical-contractors',
      '/san-diego-construction-software',
      '/phoenix-hvac-change-orders',
      '/seattle-construction-ai-tools',
      '/las-vegas-mechanical-estimating'
    ]
    
    const campaignPages = [
      '/free-hvac-cor-template',
      '/construction-ai-demo',
      '/mechanical-contractor-efficiency-audit',
      '/scoprix-vs-traditional-methods',
      '/construction-document-automation-roi'
    ]
    
    const blogPages = [
      '/blog/hvac-change-order-best-practices',
      '/blog/construction-document-analysis-guide',
      '/blog/smacna-labor-standards-explained',
      '/blog/mechanical-contractor-efficiency-tips',
      '/blog/construction-ai-trends-2024'
    ]
    
    // Add all pages with appropriate priorities
    const allPages = [
      ...servicePages.map(path => ({ loc: path, priority: 0.9, changefreq: 'monthly' })),
      ...locationPages.map(path => ({ loc: path, priority: 0.8, changefreq: 'monthly' })),
      ...campaignPages.map(path => ({ loc: path, priority: 0.7, changefreq: 'weekly' })),
      ...blogPages.map(path => ({ loc: path, priority: 0.6, changefreq: 'monthly' }))
    ]
    
    for (const page of allPages) {
      result.push({
        loc: page.loc,
        priority: page.priority,
        changefreq: page.changefreq,
        lastmod: new Date().toISOString(),
      })
    }
    
    return result
  },
  
  // Robot.txt configuration
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
          '/auth/',
          '/_next/',
          '/staging/'
        ]
      },
      // Allow specific AI bots for training (strategic)
      {
        userAgent: 'GPTBot',
        allow: [
          '/blog/',
          '/resources/',
          '/documentation/'
        ],
        disallow: [
          '/pricing/',
          '/customer-data/',
          '/proprietary-algorithms/'
        ]
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/'
        ]
      },
      {
        userAgent: 'ChatGPT-User',
        allow: [
          '/public-resources/',
          '/blog/',
          '/documentation/'
        ],
        disallow: [
          '/competitive-intelligence/',
          '/internal-data/'
        ]
      }
    ],
    additionalSitemaps: [
      'https://scoprixlabs.com/server-sitemap-index.xml', // Dynamic content
    ],
  },
  
  // Transform function for custom modifications
  transform: async (config, path) => {
    // Custom priority based on path
    let priority = 0.7
    let changefreq = 'monthly'
    
    if (path === '/') {
      priority = 1.0
      changefreq = 'weekly'
    } else if (path.includes('/hvac-change-order-automation')) {
      priority = 0.9
      changefreq = 'monthly'
    } else if (path.includes('/vendor-quote-validation')) {
      priority = 0.9
      changefreq = 'monthly'
    } else if (path.includes('/los-angeles') || path.includes('/san-francisco')) {
      priority = 0.8
      changefreq = 'monthly'
    } else if (path.includes('/blog/')) {
      priority = 0.6
      changefreq = 'monthly'
    } else if (path.includes('/case-studies/')) {
      priority = 0.7
      changefreq = 'yearly'
    }
    
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
      alternateRefs: [
        {
          href: `https://scoprixlabs.com${path}`,
          hreflang: 'en-US',
        },
      ],
    }
  },
}