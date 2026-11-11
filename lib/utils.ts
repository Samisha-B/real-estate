export const money = (n: number, rent = false) => '$' + Math.round(n).toLocaleString('en-US') + (rent ? '/mo' : '');
export const fmtDate = (d: string) => new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
export function monthlyPayment(P: number, ratePct: number, years: number) {
  const n = years * 12, r = ratePct / 1200;
  if (P <= 0 || n <= 0) return 0;
  return r === 0 ? P / n : (P * r) / (1 - Math.pow(1 + r, -n));
}
