// Shared by routing and the proxy so migrated pages cannot keep the legacy CSP.
export const legacyPages = ['about', '404', 'case-lsfm', 'case-ciel', 'case-memory',
  'case-aura', 'case-lumina', 'case-vellum', 'case-fintrack'];
export const legacyPaths = ['/', '/ciel', '/ciel-hud', ...legacyPages.map(page => `/${page}`)];
