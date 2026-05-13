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
            value: `
              default-src 'none';
              connect-src 'self' api-gateway.umami.dev cloud.umami.is;
              img-src 'self';
              script-src 'self' 'sha256-RlhVC6WGhVrcsY0hAmbU/YhaSUz2iA2q1f16/7A6jLU=' 'sha256-cd+HpnSsLaEz1lKWBNn+k+xOe1m2p5ZgfjoyNvHy9eU=' 'sha256-v02Xi6tc4gTft1Z2IHGBjcCvwkmIABD6UiWsQxrqT5I=' 'sha256-pEPR7g1MXXYzMt4x4V6/oMT0FYjuax4cMA2A7XoG2nM=' ${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ""};
              style-src 'self' 'unsafe-inline' fonts.googleapis.com;
              font-src 'self' *.gstatic.com;
              media-src 'self';
              base-uri 'self';
              upgrade-insecure-requests;
            `.replace(/\n/g, ''),
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
            key: 'Origin-Agent-Cluster',
            value: '?1'
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
}

module.exports = nextConfig
