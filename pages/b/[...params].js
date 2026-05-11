// Blog permashortlinks
// Formats:
//   /b/YYMM/slug -> https://jarema.me/blog/20YY/MM/slug/
//   /b/slug      -> https://jarema.me/blog/slug/
// Examples:
//   jar.tf/b/2604/welcome-home-astro -> jarema.me/blog/2026/04/welcome-home-astro/
//   jar.tf/b/hello-world             -> jarema.me/blog/hello-world/

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

  return {
    redirect: {
      destination,
      permanent: false,
    },
  };
}

export default function BlogShortlink() { return null }
