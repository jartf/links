// Blog permashortlinks
// Formats:
//   /b/YYMM/slug -> https://jarema.me/blog/20YY/MM/slug/
//   /b/slug      -> https://jarema.me/blog/slug/

import { useState, useEffect } from 'react';
import Head from 'next/head';

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

  return { props: { destination } };
}

export default function BlogShortlink({ destination }) {
  const [og, setOg] = useState({ title: null, description: null, image: null });

  useEffect(() => {
    fetch(`/api/og?url=${encodeURIComponent(destination)}`)
      .then(r => r.json())
      .then(data => {
        setOg(data);
        // Brief pause so the updated OG tags land in the DOM before redirect
        setTimeout(() => window.location.replace(destination), 100);
      })
      .catch(() => window.location.replace(destination));
  }, [destination]);

  const title = og.title ?? 'jarema.me blog';
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
    </>
  );
}
