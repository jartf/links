// Handles /b/* blog permashortlinks
// Formats:
//   /b/YYMM/slug -> https://jarema.me/blog/20YY/MM/slug/
//   /b/slug      -> https://jarema.me/blog/slug/

import { NextResponse } from 'next/server';

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const parts = pathname.slice(3).split('/').filter(Boolean);
  let destination;
  if (parts.length === 2 && /^\d{4}$/.test(parts[0])) {
    // /b/YYMM/slug
    const year = '20' + parts[0].slice(0, 2);
    const month = parts[0].slice(2, 4);
    const slug = parts[1];
    const y = parseInt(year, 10);
    const m = parseInt(month, 10);
    if (y < 2020 || y > 2099 || m < 1 || m > 12 || !slug) {
      return NextResponse.next();
    }
    destination = `https://jarema.me/blog/${year}/${month}/${slug}/`;
  } else if (parts.length === 1 && parts[0]) {
    // /b/slug
    destination = `https://jarema.me/blog/${parts[0]}/`;
  } else {
    return NextResponse.next();
  }
  return NextResponse.redirect(destination, 302);
}

export const config = {
  matcher: '/b/:path+',
};
