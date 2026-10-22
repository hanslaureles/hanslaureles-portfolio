// Shared by routing and the proxy so migrated pages cannot keep the legacy CSP.
export const legacyPages: string[] = [];
export const legacyPaths = legacyPages.map(page => `/${page}`);
