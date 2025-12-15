export function isAValidNumber(s: string): boolean {
  const trimmed = s?.trim();

  if (!trimmed) return false;

  return Number.isFinite(+trimmed);
}

export function nChars(s: string, n: number) {
  return s?.length > n ? s.slice(0, n) : s;
}

export function onlyNumbers(s: string) {
  return s?.replace(/\D/g, '');
}
