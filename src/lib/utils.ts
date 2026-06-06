/**
 * Centralize path normalization for navigation and link handling.
 */
export function normalizePath(path: string): string {
  let p = path.replace(/\/$/, '');
  if (p === '') p = '/';
  return p;
}
