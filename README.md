# Jarema's link-in-bio page

A fast and highly customizable Linktree alternative, built with Next.js. Forked from [vijay verma](https://github.com/realvjy)'s [nxtlnk](https://github.com/realvjy/nxt-lnk) and made my own improvements. Made sincerely for people who love making their own link-in-bio page.

This repository is hosted on [Codeberg](https://codeberg.org/jartf/links) and mirrored on [GitHub](https://github.com/jartf/links) and [GitLab](https://gitlab.com/jartf/links).

See the site in action: [https://jar.tf](https://jar.tf)

## Features

- Group your links by categories
- Manage everything directly from data objects in [`data/`](./data/)
- Dark/light mode, of course lol
- Easily handle redirects and short URLs
- Out-of-the-box metadata support configured via `next-seo`
- Modular and reusable component styling

## Stack

- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Styling**: [`styled-components`](https://styled-components.com/)
- **SEO**: `next-seo`
- **Theming**: `next-themes`

## Development

### Quick deployment

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/jartf/links)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jartf/links)

### Prerequisites

Ensure you have Node.js and pnpm (preferred, though npm or any other is fine) installed.

### Installation

1. Clone this repository, or yours if you’ve already deployed it:

   ```bash
   git clone https://codeberg.org/jartf/links.git
   cd links
   ```

2. Install the dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) or whatever URL is displayed in the terminal.

## Customization

All configurations live in [`data/`](./data/) and root. If you're only changing the profile info and links, these are the only files you'll ever need to touch :D

- **Profile**: [`data/BioData.js`](./data/BioData.js) contains the site's name, avatar, bio text, the whole nine yards of information.
- **Links**: [`data/LinksData.js`](./data/LinksData.js) contains displayed links. You can assign different link types to organize them into sections. For my configuration, section `top` is the mini top bar right below the site info for social links.
- **Shortlinks**: [`data/ShortLinks.js`](./data/ShortLinks.js) contains URL redirects to other sites and allows the site to double as a custom link shortener.
- **SEO details**: [`next-seo.config.js`](./next-seo.config.js) is the site’s meta tags and OpenGraph objects configuration.

## Implementation details

If you want to understand how the code works and/or customize it further, here’s a quick overview of the implementation:

### Layout

- Most of the UI is built with [`components/`](./components/).
  - [`WebLinks.js`](./components/WebLinks.js) is the core UI. It parses `BioData.js` and `LinksData.js` to render the profile and links.
  - [`Layout.js`](./components/Layout.js) is the wrapper component for all pages. It contains the floating `<ThemeToggle />` button for theme switching.
  - [`Seo.js`](./components/Seo.js) injects metadata tags onto the page.
- [`pages/index.js`](./pages/index.js) is the main page but really only imports and displays the `<Seo />` and `<WebLinks />` components. Nothing too fancy there.
- Styling (`styles/`):
  - [`theme.config.js`](./styles/theme.config.js) contains the color variables for dark and light themes.
  - [`GlobalStyle.js`](./styles/GlobalStyle.js) contains typography and default styles.
  - Dark mode triggers via `next-themes` and is configured at [`pages/_app.js`](./pages/_app.js).

### Shortlinks

There are two types of shortlinks:

- A **"temporary" shortlink** is a simple redirect from a path on the site to an external URL.
  - You can configure these in [`data/ShortLinks.js`](./data/ShortLinks.js) and they'll be handled by the catch-all route in [`pages/[...slug].js`](./pages/[...slug].js).
  - Alternatively, you can add them directly in the redirects array of [`next.config.js`](./next.config.js), but it can get messy fast in the long run.
- A **"permanent" shortlink** (aka a [permashortlink](https://indieweb.org/permashortlink)) is a redirect configured in the Next.js middleware ([`proxy.js`](./proxy.js)). It formats links to point to my blog based on 4 URL patterns, in the following order:
  - `/b/YYMMDDHHMM`: Checks for a 10-digit number in the format of year-month-day-hour-minute, and redirects to `https://jarema.me/blog/20YY/MM/DD/hh/mm/`.
  - `/b/AAATTT`: This is an algorithmic shortlink with 6 alphanumeric characters, encoded in [Base36](https://en.wikipedia.org/wiki/Base36) to point to a blog datetime.
    - `AAA` = Base36 days since 2000-01-01, covers dates from 2000 to end of 2099.
    - `TTT` = Base36 minutes since midnight, range 0-1439.
    - **Example**: [`https://jar.tf/b/7eb0nr`](https://jar.tf/b/7eb0nr) decodes to `https://jarema.me/blog/2026/04/01/14/15/` (case-insensitive). Try it out, I've hyperlinked that one shortlink :3
  - `/b/YYMM/slug`: Extracts the date and slug, and redirects to `https://jarema.me/blog/20YY/MM/slug/`.
  - `/b/slug`: Redirects to `https://jarema.me/blog/slug/`.

More about the algorithmic shortlink format in an upcoming blog post :D

### Security

The [`next.config.js`](./next.config.js) uses these HTTP security headers to try to minimise attack surface:

- **Content-Security-Policy**: Default is nothing running with `default-src 'none'`, inline scripts are scoped with sha256 checksums. I had to temporarily allow `'unsafe-eval'` in development because of React, but it's not in production. Styles are `unsafe-inline` because of `styled-components` sadly.
- **Permissions-Policy**: Disables FLoC/topics tracking, camera, microphone, geolocation, and USB.
- **Strict-Transport-Security**: 1-year max age with subdomains included.
- **Cross-origin policies**: Implements `require-corp` embedder policy, `same-origin-allow-popups` opener policy, and `same-site` resource policy.
- Other protections:
  - `Referrer-Policy` is set to `strict-origin`
  - `X-Frame-Options` is `DENY`
  - `X-Content-Type-Options` is `nosniff`
  - `X-XSS-Protection` is `0`, not `1; mode=block` because browsers have deprecated the header and now prefer to rely on Content-Security-Policy for XSS protection, and [the old header can cause issues](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-XSS-Protection#security_considerations).
  - `Sec-GPC` (Global Privacy Control) is `1`, not that I track anything but hey, might as well respect it.
  - `Origin-Agent-Cluster` is set to `?1` to enable origin isolation and mitigate memory attacks.

## Contributing

Issues, feature requests, pull requests, or even just comments are all welcome! Feel free to check the [issues page on Codeberg](https://codeberg.org/jartf/links/issues).

### Contributors

Thanks to [vijay verma (@realvjy)](https://github.com/realvjy) for creating the original [nxt-lnk](https://github.com/realvjy/nxt-lnk).

### Dependencies

A huge thanks to the maintainers of the open-source projects this site relies on:

- [Next.js](https://nextjs.org/) & [React](https://react.dev/)
- [styled-components](https://styled-components.com/)
- [next-seo](https://github.com/garmeeh/next-seo)
- [next-themes](https://github.com/pacocoursey/next-themes)

## License

This project is licensed under the [MIT License](LICENSE).
