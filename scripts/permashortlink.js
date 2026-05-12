const epoch = 10957; // 2000-01-01, in days since Unix epoch

// Generate a base36 permashortlink code for a given UTC datetime.
// Usage: generateCode('2026-05-12T00:29:00Z') -> '1sj00t'
export function generateCode(isoDatetime) {
  const date = new Date(isoDatetime);
  const a = Math.floor(date.getTime() / 86400000) - epoch;
  const t = date.getUTCHours() * 60 + date.getUTCMinutes();
  if (a < 0 || a > 36524) throw new Error('Date out of range (2000-2099)');
  return a.toString(36).padStart(3, '0') + t.toString(36).padStart(3, '0');
}
