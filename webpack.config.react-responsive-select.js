const path = require('path');

module.exports = {

  devServer: {
    inline: true
  },

  devtool: 'eval',

  entry: {
    index: './src/SelectBox.js'
  },

  output: {
    filename: 'SelectBox.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader'
    }]
  }

};
