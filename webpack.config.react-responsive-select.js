const nodeExternals = require('webpack-node-externals');
const path = require('path');

const entry = './src/ReactResponsiveSelect.js';
const library = 'ReactResponsiveSelect';
const moduleConfig = {
  rules: [{
    test: /\.js$/,
    loader: 'babel-loader',
    options: {
      presets: ['env'],
    },
    exclude: path.resolve(__dirname, 'node_modules'),
  }],
};

module.exports = [{

  entry,
  mode: process.env.NODE_ENV,
  module: moduleConfig,
  output: {
    filename: 'ReactResponsiveSelect.js',
    libraryTarget: 'umd',
    library,
  },
  externals: [nodeExternals({ whitelist: ['prop-types'] })],

}, {

  entry,
  mode: process.env.NODE_ENV,
  module: moduleConfig,
  output: {
    filename: 'ReactResponsiveSelect.window.js',
    libraryTarget: 'window',
    library,
  },
  externals: { react: 'React' },

}, {

  entry,
  mode: process.env.NODE_ENV,
  module: moduleConfig,
  output: {
    filename: 'ReactResponsiveSelect.var.js',
    libraryTarget: 'var',
    library,
  },
  externals: { react: 'React' },

}];
