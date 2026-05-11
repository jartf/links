// Blog permashortlinks
// Formats:
//   /b/YYMM/slug -> https://jarema.me/blog/20YY/MM/slug/
//   /b/slug      -> https://jarema.me/blog/slug/
// Examples:
//   jar.tf/b/2604/welcome-home-astro -> jarema.me/blog/2026/04/welcome-home-astro/
//   jar.tf/b/hello-world             -> jarema.me/blog/hello-world/

import Head from 'next/head';

// Scrape <meta> tag
function scrapeMeta(html, ...attrs) {
  for (const attr of attrs) {
    const m = html.match(
      new RegExp(`<meta[^>]+${attr}[^>]*content=["']([^"']+)["']`, 'i') ||
      new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+${attr}`, 'i')
    );
    if (m?.[1]) return m[1];

    // Reversed attribute order
    const m2 = html.match(
      new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+${attr}`, 'i')
    );
    if (m2?.[1]) return m2[1];
  }
  return null;
}

export async function getServerSideProps({ params }) {
  const parts = params.params ?? [];

  let destination;

  if (parts.length === 2 && /^\d{4}$/.test(parts[0])) {
    // /b/YYMM/slug
    const yymm = parts[0];
    const year = '20' + yymm.slice(0, 2);
    const month = yymm.slice(2, 4);
    const slug = parts[1];
    const y = parseInt(year, 10);
    const m = parseInt(month, 10);
    if (y < 2020 || y > 2099 || m < 1 || m > 12 || !slug) {
      return { notFound: true };
    }
    destination = `https://jarema.me/blog/${year}/${month}/${slug}/`;
  } else if (parts.length === 1 && parts[0]) {
    // /b/slug
    destination = `https://jarema.me/blog/${parts[0]}/`;
  } else {
    return { notFound: true };
  }

  // Fetch OG tags from the target blog post
  let og = { title: null, description: null, image: null };
  try {
    const res = await fetch(destination, {
      headers: { 'User-Agent': 'jar.tf/shortlink-bot' },
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const text = await res.text();
      const head = text.slice(0, text.toLowerCase().indexOf('</head>') + 7);

      og.title = scrapeMeta(head, 'og:title') ?? scrapeMeta(head, 'twitter:title');
      og.description = scrapeMeta(head, 'og:description') ?? scrapeMeta(head, 'twitter:description') ?? scrapeMeta(head, 'name="description"');
      og.image = scrapeMeta(head, 'og:image') ?? scrapeMeta(head, 'twitter:image');
    }
  } catch { }

  return { props: { destination, og } };
}

export default function BlogShortlink({ destination, og }) {
  const title = og.title ?? 'jarema.me — blog';
  const description = og.description ?? '';
  const image = og.image ?? 'https://jarema.me/favicon.png';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={destination} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:site_name" content="jarema.me" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@jarema_me" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta httpEquiv="refresh" content={`0; url=${destination}`} />
        <link rel="canonical" href={destination} />
      </Head>

      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace(${JSON.stringify(destination)});`,
        }}
      />
    </>
  );
}
