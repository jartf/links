import Head from 'next/head';
import { ArticleJsonLd } from 'next-seo';
import seoData from '../next-seo.config';

export default function Seo({ page }) {
  const { title, coverImage } = page;
  const description = seoData.openGraph.description;
  const url = seoData.openGraph.url;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={seoData.openGraph.keywords} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content={seoData.openGraph.images[0].url} />
        <meta property="og:image:width" content={String(seoData.openGraph.images[0].width)} />
        <meta property="og:image:height" content={String(seoData.openGraph.images[0].height)} />
        <meta property="og:site_name" content={seoData.openGraph.site_name} />

        {/* Twitter */}
        <meta name="twitter:card" content={seoData.twitter.cardType} />
        <meta name="twitter:site" content={seoData.twitter.site} />
        <meta name="twitter:creator" content={seoData.twitter.handle} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={coverImage ?? seoData.openGraph.images[0].url} />

        <meta httpEquiv="x-ua-compatible" content="IE=edge; chrome=1" />
      </Head>

      <ArticleJsonLd
        type="BlogPosting"
        url={url}
        headline={title}
        description={description}
        images={[seoData.openGraph.images[0].url]}
        datePublished={new Date().toISOString()}
        author={[{
          "@type": "Person",
          name: seoData.openGraph.site_name,
          url: url,
        }]}
      />
    </>
  );
}
