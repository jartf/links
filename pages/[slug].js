// Custom short codes from ShortLinks.js
// Priority:
// 1. next.config.js redirects
// 2. proxy.js
// 3. This file
// 4. pages/index.js

import shortLinks from '../data/ShortLinks';

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const destination = shortLinks[slug];

  if (!destination) { return { notFound: true } }

  return {
    redirect: {
      destination,
      permanent: false,
    },
  };
}

export default function ShortLink() { return null }
