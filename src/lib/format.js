export const usd = v => (v == null || v === '' ? '' : (+v % 1 ? `$${(+v).toFixed(2)}` : `$${+v}`));
export const hours = v => (v ? `${+v} ${+v === 1 ? 'hour' : 'hours'}` : '');
export const truncate = (s, n=140) => (s && s.length>n ? s.slice(0,n-1) + '…' : s || '');