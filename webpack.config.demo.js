const webpack = require('webpack');
const path = require('path');
const DEV = process.env.NODE_ENV !== 'production';

module.exports = {

  devServer: {
    inline: true
  },

  devtool: 'source-map',

  entry: {
    index: './demo.js'
  },

  output: {
    filename: 'demo.js',
    path: path.resolve(__dirname, 'demo'),
    publicPath: 'demo'
  },

  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: path.resolve(__dirname, 'node_modules')
    }]
  },

  plugins: [
    new webpack.DefinePlugin({ 'process.env': {
      'NODE_ENV': JSON.stringify(DEV ? 'development' : 'production')
    }})
  ]
};
