// Shared by routing and the proxy so migrated pages cannot keep the legacy CSP.
export const legacyPages = ['about', 'case-lsfm', 'case-ciel', ];
export const legacyPaths = ['/', '/ciel', '/ciel-hud', ...legacyPages.map(page => `/${page}`)];
