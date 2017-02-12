const path = require('path');

module.exports = {

  devServer: {
    inline: true
  },

  devtool: 'eval',

  entry: {
    index: './src/index.js'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [{
      test: /src\/.*\.js/,
      loader: 'babel-loader'
    }]
  }

};
