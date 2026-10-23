const config = require('./playwright.config');

module.exports = {
  ...config,
  testIgnore: [],
  testMatch: '**/parity.spec.js',
};
