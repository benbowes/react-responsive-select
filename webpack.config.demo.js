const path = require('path');

module.exports = {

  devServer: {
    inline: true
  },

  devtool: 'eval',

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
  }

};
