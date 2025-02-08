export function parseNumber(input?: string) {
  if (!input) {
    return undefined;
  }
  const num = Number(input);
  return Number.isNaN(num) ? undefined : num;
}
