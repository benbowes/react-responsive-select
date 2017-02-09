module.exports = {
  devServer: {
    inline: true
  },
  devtool: 'eval',
  entry: {
    index: './src/index.js'
  },
  output: {
    path: './dist/',
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /src\/.*\.js/,
      loader: 'babel'
    }]
  }
};
