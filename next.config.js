const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-eval' 'unsafe-inline' fonts.googleapis.com;
    frame-src 'self' giscus.app;
    font-src 'self' *.gstatic.com;
    media-src 'self' data:;
    base-uri 'self';
    frame-ancestors 'self' giscus.app;
    upgrade-insecure-requests;
`

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // CORS headers for API routes
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*.jarema.me",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          // Prefetch control
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          // Security headers
          {
            key: 'Referrer-Policy',
            value: 'strict-origin'
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
            key: 'Permissions-Policy',
            value: 'browsing-topics=()'
          },
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
          // Cross origin headers
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp'
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups'
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-site'
          },
          // Global Privacy Control
          {
            key: 'Sec-GPC',
            value: '1'
          },
        ],
      },
    ]
  },

  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  optimizeFonts: false, async rewrites() {
    return [
      {
        // rewrite links url as base
        source: '/(links|lnk|l)',
        destination: '/',
      },
    ]
  },
  async redirects() {
    return [
      // Web section
      {
        // Main
        source: '/(w|main|web|site|website)',
        destination: 'https://jarema.me',
        permanent: false,
      },
      {
        // Blog
        source: '/(blog|b)',
        destination: 'https://jarema.me/blog',
        permanent: false,
      },
      {
        // Blog entry perm redirect
        source: '/(blog|b)/:slug*',
        destination: 'https://jarema.me/blog/:slug*',
        permanent: true,
      },
      {
        // Contact
        source: '/(contact|c)',
        destination: 'https://jarema.me/contact',
        permanent: false,
      },
      {
        // Mail (working on a better method)
        source: '/(mail|m)',
        destination: 'https://jarema.me/contact',
        permanent: false,
      },
      {
        // Pronouns.page
        source: '/(pronouns|prn)',
        destination: 'https://pronouns.page/@jerryv',
        permanent: false,
      },

      // Tools section
      {
        // Nextcloud
        source: '/cloud',
        destination: 'https://cloud.jarema.me',
        permanent: false,
      },
      {
        // VSCode Web
        source: '/code',
        destination: 'https://code.jarema.me/',
        permanent: false,
      },
      {
        // Vaultwarden
        source: '/(vaultwarden|vw)',
        destination: 'https://vw.jarema.me/',
        permanent: false,
      },
      {
        // Docus
        source: '/docs',
        destination: 'https://docs.jarema.me/',
        permanent: false,
      },
      {
        // Chris's tools
        source: '/win',
        destination: 'https://win.jarema.me/',
        permanent: false,
      },

      // Support section
      {
        // Ko-fi
        source: '/(kofi|ko-fi|kf)',
        destination: 'https://ko-fi.com/jarema',
        permanent: false,
      },
      {
        // GitHub Sponsors
        source: '/(github-sponsor|ghsponsors|ghs)',
        destination: 'https://github.com/sponsors/jartf',
        permanent: false,
      },
      {
        // Paypal
        source: '/(paypal|ppl|pp)',
        destination: 'https://paypal.me/jaremame',
        permanent: false,
      },
      {
        // Wise
        source: '/wise',
        destination: 'https://wise.com/pay/me/vietanhv4',
        permanent: false,
      },
      {
        // MoMo
        source: '/(momo|mmvn|mm)',
        destination: 'https://me.momo.vn/vietanh',
        permanent: false,
      },
      {
        // Patreon
        source: '/(patreon|patron|pt)',
        destination: 'https://www.patreon.com/jartf',
        permanent: false,
      },
      {
        // Liberapay
        source: '/(liberapay|libera|libpay)',
        destination: 'https://liberapay.com/jarema',
        permanent: false,
      },

      // Social links
      {
        // Twitter
        source: '/(twitter|tweet|twt|tw|x)',
        destination: 'https://twitter.com/jartf_',
        permanent: false,
      },
      {
        // Mastodon
        source: '/(mastodon|masto|tootio|toot)',
        destination: 'https://toot.io/@jar',
        permanent: false,
      },
      {
        // Telegram
        source: '/(telegram|tele|tme|tg)',
        destination: 'https://t.me/jarema_me',
        permanent: false,
      },
      {
        // Signal
        source: '/(signal|sig|sn)',
        destination: 'https://signal.me/#eu/lTzwFNSwyplWc4hG7LQxSByIgXxGxkcoHCfTs5oK_i8PmVNMGhxFgaAD8qjgb-TE',
        permanent: false,
      },
      {
        // Threads
        source: '/(threads|threadsnet)',
        destination: 'https://threads.net/@jarema.says',
        permanent: false,
      },
      {
        // GitHub
        source: '/(github|gh)',
        destination: 'https://github.com/jartf',
        permanent: false,
      },
      {
        // GitLab
        source: '/(gitlab|glab)',
        destination: 'https://gitlab.com/jartf',
        permanent: false,
      },
      {
        // Instagram
        source: '/(instagram|insta|ig)',
        destination: 'https://instagram.com/jarema.says',
        permanent: false,
      },
      {
        // LinkedIn
        source: '/(linkedin|lnkin|in)',
        destination: 'https://www.linkedin.com/in/vietanhv/',
        permanent: false,
      },
      {
        // Zalo
        source: '/(zalo|zl)',
        destination: 'https://zalo.me/',
        permanent: false,
      },
      {
        // Bluesky
        source: '/(bluesky|bsky)',
        destination: 'https://bsky.app/profile/jartf.bsky.social',
        permanent: false,
      },
      {
        // Google Developer
        source: '/gdev',
        destination: 'https://g.dev/jarema',
        permanent: false,
      },
      {
        // IndieWeb
        source: '/indieweb',
        destination: 'https://indieweb.org/User:Jarema.me',
        permanent: false,
      },
      {
        // OpenStreetMap
        source: '/(openstreetmap|osm)',
        destination: 'https://openstreetmap.org/user/Equate',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
