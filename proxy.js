// Handles /b/* blog permashortlinks
// Formats:
//   /b/YYMMDD    -> https://jarema.me/blog/20YY/MM/DD/
//   /b/AAATTT    -> https://jarema.me/blog/20YY/MM/DD/hh/mm/
//   /b/YYMM/slug -> https://jarema.me/blog/20YY/MM/slug/
//   /b/slug      -> https://jarema.me/blog/slug/
//
// Algorithmic permashortlink (base36, case-insensitive):
//   AAA = base36 dAys since 2000-01-01, covers 2000-2099
//   TTT = base36 minuTes since midnight, covers 0-1439

import { NextResponse } from 'next/server';

const epoch = 10957; // 2000-01-01, in days since Unix epoch

export function proxy(request) {
  const path = request.nextUrl.pathname.slice(3);
  const p = path.endsWith('/') ? path.slice(0, -1) : path;
  if (!p) return NextResponse.next();
  let dest;
  let match;

  // /b/YYMMDD
  if ((match = /^(\d{2})(\d{2})(\d{2})$/.exec(p))) {
    if (+match[2] < 1 || +match[2] > 12 || +match[3] < 1 || +match[3] > 31) return NextResponse.next();
    dest = `https://jarema.me/blog/20${match[1]}/${match[2]}/${match[3]}/`;

    // /b/AAATTT
  } else if ((match = /^([0-9a-z]{3})([0-9a-z]{3})$/i.exec(p))) {
    const a = parseInt(match[1], 36);
    const t = parseInt(match[2], 36);
    if (a > 36524 || t >= 1440) return NextResponse.next();
    const iso = new Date((epoch + a) * 86400000 + t * 60000).toISOString();
    dest = `https://jarema.me/blog/${iso.slice(0, 4)}/${iso.slice(5, 7)}/${iso.slice(8, 10)}/${iso.slice(11, 13)}/${iso.slice(14, 16)}/`;

    // /b/YYMM/slug
  } else if ((match = /^(\d{2})(\d{2})\/([^/]+)$/.exec(p))) {
    if (+match[2] < 1 || +match[2] > 12) return NextResponse.next();
    dest = `https://jarema.me/blog/20${match[1]}/${match[2]}/${match[3]}/`;

    // /b/slug
  } else if (/^[^/]+$/.test(p)) {
    dest = `https://jarema.me/blog/${p}/`;

  } else {
    return NextResponse.next();
  }
  return NextResponse.redirect(dest, 302);
}

export const config = {
  matcher: '/b/:path+',
};
