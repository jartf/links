/** @type {import('next').NextConfig} */
const nextConfig = {
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
