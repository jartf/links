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

function decodePermashortlink(code) {
  const a = parseInt(code.slice(0, 3), 36);
  const t = parseInt(code.slice(3, 6), 36);
  if (a > 36524 || t >= 1440) return null;

  const date = new Date((epoch + a) * 86400000);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hh = String(Math.floor(t / 60)).padStart(2, '0');
  const mm = String(t % 60).padStart(2, '0');

  return `https://jarema.me/blog/${year}/${month}/${day}/${hh}/${mm}/`;
}

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const parts = pathname.slice(3).split('/').filter(Boolean);
  let dest;

  if (parts.length === 1) {
    const p = parts[0];

    if (/^\d{6}$/.test(p)) {
      // /b/YYMMDD
      const yy = p.slice(0, 2);
      const mm = p.slice(2, 4);
      const dd = p.slice(4, 6);
      const y = 2000 + +yy;
      const m = +mm;
      const d = +dd;
      if (y < 2000 || y > 2099 || m < 1 || m > 12 || d < 1 || d > 31) return NextResponse.next();
      dest = `https://jarema.me/blog/20${yy}/${mm}/${dd}/`;

    } else if (p.length === 6 && /^[0-9a-z]{6}$/i.test(p)) {
      // /b/AAATTT
      dest = decodePermashortlink(p.toLowerCase());
      if (!dest) return NextResponse.next();

    } else {
      // /b/slug
      dest = `https://jarema.me/blog/${p}/`;
    }

  } else if (parts.length === 2 && /^\d{4}$/.test(parts[0])) {
    // /b/YYMM/slug
    const yy = parts[0].slice(0, 2);
    const mm = parts[0].slice(2, 4);
    const y = 2000 + +yy;
    const m = +mm;
    if (y < 2000 || y > 2099 || m < 1 || m > 12 || !parts[1]) return NextResponse.next();
    dest = `https://jarema.me/blog/20${yy}/${mm}/${parts[1]}/`;

  } else {
    return NextResponse.next();
  }

  return NextResponse.redirect(dest, 302);
}

export const config = {
  matcher: '/b/:path+',
};
