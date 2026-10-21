export const LEGACY_CSP = "default-src 'self'; script-src 'self' 'sha256-CityW3eaBWHgazqMiMn47dd6tTGQlMKpYOtT2YnhMMw=' 'sha256-M3bwmOirMh114Uru7/L8rAcZ75l+YSyXYEY0hrHB2FY='; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'";

export function buildCsp(nonce) {
  return `default-src 'self'; script-src 'self' 'nonce-${nonce}' 'strict-dynamic'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'`;
}
