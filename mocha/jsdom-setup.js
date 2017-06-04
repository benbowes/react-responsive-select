const jsdom = require('jsdom');
const { JSDOM } = jsdom;
// setup the simplest document possible
const dom = new JSDOM('<!doctype html><html><body></body></html>');

// set globals for mocha that make access to document and window feel natural in the test environment
global.window = dom.window;
global.document = dom.window.document;
global.navigator = { userAgent: 'node.js' };
