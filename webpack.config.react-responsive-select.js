const nodeExternals = require('webpack-node-externals');
const path = require('path');

const entry = './src/ReactResponsiveSelect.js';
const library = 'ReactResponsiveSelect';
const moduleConfig = {
  rules: [{
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: path.resolve(__dirname, 'node_modules')
  }]
};

module.exports = [{

  entry,
  module: moduleConfig,
  output: {
    filename: './dist/ReactResponsiveSelect.js',
    libraryTarget: 'umd',
    library
  },
  externals: [ nodeExternals({ whitelist: ['prop-types'] }) ]

}, {

  entry,
  module: moduleConfig,
  output: {
    filename: './dist/ReactResponsiveSelect.window.js',
    libraryTarget: 'window',
    library
  },
  externals: { react: 'React' }

}, {

  entry,
  module: moduleConfig,
  output: {
    filename: './dist/ReactResponsiveSelect.var.js',
    libraryTarget: 'var',
    library
  },
  externals: { react: 'React' }

}];
