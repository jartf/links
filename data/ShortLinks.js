// Custom short link registry
// Keys are short codes, values are destination URLs
// Examples:
//   jar.tf/astro -> jarema.me/blog/2026/04/welcome-home-astro/
//   jar.tf/b -> jarema.me/blog/

const shortLinks = {
  // Website
  "w": "https://jarema.me",
  "main": "https://jarema.me",

  "about": "https://jarema.me/about",
  "a": "https://jarema.me/about",

  "blog": "https://jarema.me/blog",
  "b": "https://jarema.me/blog/",

  "contact": "https://jarema.me/contact",
  "c": "https://jarema.me/contact",

  "guestbook": "https://jarema.me/guestbook",
  "g": "https://jarema.me/guestbook",

  "brand": "https://jarema.me/brand",
  "k": "https://jarema.me/brand",

  "meeting": "https://cal.com/jaremaa",
  "mt": "https://cal.com/jaremaa",

  "now": "https://jarema.me/now",
  "n": "https://jarema.me/now",

  "uses": "https://jarema.me/uses",
  "u": "https://jarema.me/uses",

  "tools": "https://jarema.me/tools",
  "t": "https://jarema.me/tools",

  // Tools
  "vaultwarden": "https://vault.jarema.me/",
  "vw": "https://vault.jarema.me/",

  "docs": "https://docs.jarema.me/",

  "win": "https://win.jarema.me/",

  // Socials
  "matrix": "https://matrix.to/#/@jar1:tchncs.de",
  "mx": "https://matrix.to/#/@jar1:tchncs.de",

  "twitter": "https://twitter.com/jarema_me",
  "tw": "https://twitter.com/jarema_me",

  "mastodon": "https://blob.cat/jar",
  "ms": "https://blob.cat/jar",

  "tootio": "https://blob.cat/jar",
  "tt": "https://blob.cat/jar",

  "telegram": "https://t.me/jaremame",
  "tg": "https://t.me/jaremame",

  "signal": "https://signal.me/#eu/wHpqXqMSQ6LSg0zijVcCCWm5PK5gwshaDFOAg0aj-aq5BSs94E9CLJ5ThNuy4t6A",
  "sn": "https://signal.me/#eu/wHpqXqMSQ6LSg0zijVcCCWm5PK5gwshaDFOAg0aj-aq5BSs94E9CLJ5ThNuy4t6A",

  "discord": "https://discord.com/users/444078929314185217",
  "ds": "https://discord.com/users/444078929314185217",

  "codeberg": "https://codeberg.org/jartf",
  "cd": "https://codeberg.org/jartf",

  "github": "https://github.com/jartf",
  "gh": "https://github.com/jartf",

  "gitlab": "https://gitlab.com/jartf",
  "gl": "https://gitlab.com/jartf",

  "bluesky": "https://bsky.app/profile/jarema.me",
  "bsky": "https://bsky.app/profile/jarema.me",
  "bl": "https://bsky.app/profile/jarema.me",

  "indieweb": "https://indieweb.org/User:Jarema.me",
  "iw": "https://indieweb.org/User:Jarema.me",

  "pronouns": "https://pronouns.page/@jerryv",
  "pp": "https://pronouns.page/@jerryv"
};

export default shortLinks;
