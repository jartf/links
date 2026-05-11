function scrapeMeta(html, property) {
  const tagRe = /<meta\s[^>]+>/gi;
  let tag;
  while ((tag = tagRe.exec(html)) !== null) {
    const t = tag[0];
    if (new RegExp(`(?:property|name)=["']${property}["']`, 'i').test(t)) {
      const cm = t.match(/content="([^"]*)"/i) || t.match(/content='([^']*)'/i);
      if (cm) return cm[1];
    }
  }
  return null;
}

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'Missing url' });

  try {
    const r = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)' },
      signal: AbortSignal.timeout(5000),
    });
    if (!r.ok) return res.status(r.status).json({ error: 'Upstream error' });

    const html = await r.text();
    const head = html.slice(0, html.toLowerCase().indexOf('</head>') + 7);

    const og = {
      title:       scrapeMeta(head, 'og:title')       ?? scrapeMeta(head, 'twitter:title'),
      description: scrapeMeta(head, 'og:description') ?? scrapeMeta(head, 'twitter:description') ?? scrapeMeta(head, 'description'),
      image:       scrapeMeta(head, 'og:image')       ?? scrapeMeta(head, 'twitter:image'),
    };

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).json(og);
  } catch {
    return res.status(500).json({ error: 'Fetch failed' });
  }
}
