const webpack = require('webpack');
const path = require('path');

const DEV = process.env.NODE_ENV !== 'production';

module.exports = {

  devServer: {
    inline: true,
  },

  mode: process.env.NODE_ENV,

  devtool: 'source-map',

  entry: {
    index: './demo/src/index.js',
  },

  output: {
    filename: 'demo.js',
    path: path.resolve(__dirname, 'demo'),
    publicPath: 'demo',
  },

  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: path.resolve(__dirname, 'node_modules'),
      options: {
        presets: ['env'],
      },
    }],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(DEV ? 'development' : 'production'),
      },
    }),
  ],
};
