const cspHeader = `
    default-src 'none';
    connect-src 'self' api-gateway.umami.dev cloud.umami.is;
    img-src 'self';
    script-src 'self' 'sha256-RlhVC6WGhVrcsY0hAmbU/YhaSUz2iA2q1f16/7A6jLU=' 'sha256-cd+HpnSsLaEz1lKWBNn+k+xOe1m2p5ZgfjoyNvHy9eU=' 'sha256-v02Xi6tc4gTft1Z2IHGBjcCvwkmIABD6UiWsQxrqT5I=' 'sha256-Ci9dM7U4EJ5koykaEIHKxlIIsoTrFULRVPUG01vXyEU='${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ""};
    style-src 'self' 'unsafe-inline' fonts.googleapis.com;
    font-src 'self' *.gstatic.com;
    media-src 'self';
    base-uri 'self';
    upgrade-insecure-requests;
`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
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
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Xss-Protection',
            value: '0'
          },
          {
            key: 'Permissions-Policy',
            value: 'interest-cohort=(), browsing-topics=(), camera=(), microphone=(), geolocation=(), usb=()'
          },
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
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
          {
            key: 'Sec-GPC',
            value: '1'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'Server',
            value: 'Jarema'
          },
        ],
      },
    ]
  },

  reactStrictMode: true,
  compiler: {
    styledComponents: true,
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
        // About
        source: '/(about|a)',
        destination: 'https://jarema.me/blog',
        permanent: false,
      },
      {
        // Blog
        source: '/(blog)',
        destination: 'https://jarema.me/blog',
        permanent: false,
      },
      {
        // Blog entry perm redirect
        source: '/(blog)/:slug*',
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
        // Guestbook
        source: '/(guestbook|guest|g)',
        destination: 'https://jarema.me/guestbook',
        permanent: false,
      },
      {
        // Brand kit
        source: '/(brand|kit|k)',
        destination: 'https://jarema.me/brand',
        permanent: false,
      },
      {
        // Meeting
        source: '/(meeting|calcom|cal|meet|mt)',
        destination: 'https://cal.com/jaremaa',
        permanent: false,
      },
      {
        // Mail
        source: '/(mail|m)',
        destination: 'mailto:hi@jar.tf',
        permanent: false,
      },
      {
        // Now
        source: '/(now|n)',
        destination: 'https://jarema.me/now',
        permanent: false,
      },
      {
        // Uses
        source: '/(uses|u)',
        destination: 'https://jarema.me/uses',
        permanent: false,
      },

      // Tools section
      {
        // Tools page
        source: '/(tools|t)',
        destination: 'https://jarema.me/tools',
        permanent: false,
      },
      {
        // Vaultwarden
        source: '/(vaultwarden|vw)',
        destination: 'https://vault.jarema.me/',
        permanent: false,
      },
      {
        // Docs
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

      // Social links
      {
        // Matrix
        source: '/(matrix|mx)',
        destination: 'https://matrix.to/#/@jar1:tchncs.de',
        permanent: false,
      },
      {
        // Twitter
        source: '/(twitter|tweet|twt|tw)',
        destination: 'https://twitter.com/jarema_me',
        permanent: false,
      },
      {
        // Mastodon
        source: '/(mastodon|masto|tootio|toot|ms)',
        destination: 'https://blob.cat/jar',
        permanent: false,
      },
      {
        // Telegram
        source: '/(telegram|tele|tme|tg)',
        destination: 'https://t.me/jaremame',
        permanent: false,
      },
      {
        // Signal
        source: '/(signal|sgnl|sig|sn)',
        destination: 'https://signal.me/#eu/wHpqXqMSQ6LSg0zijVcCCWm5PK5gwshaDFOAg0aj-aq5BSs94E9CLJ5ThNuy4t6A',
        permanent: false,
      },
      {
        // Discord
        source: '/(discord|dis|ds)',
        destination: 'https://discord.com/users/444078929314185217',
        permanent: false,
      },
      {
        // Codeberg
        source: '/(codeberg|cd)',
        destination: 'https://github.com/jartf',
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
        source: '/(gitlab|gl)',
        destination: 'https://gitlab.com/jartf',
        permanent: false,
      },
      {
        // Bluesky
        source: '/(bluesky|bsky|bl)',
        destination: 'https://bsky.app/profile/jarema.me',
        permanent: false,
      },
      {
        // IndieWeb
        source: '/(indieweb|iw)',
        destination: 'https://indieweb.org/User:Jarema.me',
        permanent: false,
      },
      {
        // Pronouns.page
        source: '/(pronouns|prn|pp)',
        destination: 'https://pronouns.page/@jerryv',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
