const jsdom = require('jsdom');

// setup the simplest document possible
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');

// set globals for mocha that make access to document and window feel natural in the test environment
global.document = doc;
global.window = doc.defaultView;
global.navigator = { userAgent: 'node.js' };
