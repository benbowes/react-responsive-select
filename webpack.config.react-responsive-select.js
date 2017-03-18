const path = require('path');

module.exports = {

  devServer: {
    inline: true
  },

  devtool: 'eval',

  entry: {
    index: './src/ReactResponsiveSelect.js'
  },

  output: {
    filename: 'ReactResponsiveSelect.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: path.resolve(__dirname, 'node_modules')
    }]
  }

};
