const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {

  entry: './src/ReactResponsiveSelect.js',

  output: {
    filename: 'ReactResponsiveSelect.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'ReactResponsiveSelect',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },

  externals: [
    nodeExternals({ whitelist: ['prop-types'] })
  ],

  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: path.resolve(__dirname, 'node_modules')
    }]
  }

};
