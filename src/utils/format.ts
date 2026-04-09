export const usd = (v: number | string | null | undefined): string =>
  v == null || v === '' ? '' : (+v % 1 ? `$${(+v).toFixed(2)}` : `$${+v}`);

export const hours = (v: number | string | null | undefined): string =>
  v ? `${+v} ${+v === 1 ? 'hour' : 'hours'}` : '';

export const truncate = (s: string | null | undefined, n = 140): string =>
  s && s.length > n ? s.slice(0, n - 1) + '…' : s || '';
