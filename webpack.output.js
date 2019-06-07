const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'production',

  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },

  entry: {
    'ReactResponsiveSelect': './src/ReactResponsiveSelect.tsx',
    'ReactResponsiveSelect.min': './src/ReactResponsiveSelect.tsx'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'ReactResponsiveSelect',
    umdNamedDefine: true
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  devtool: 'source-map',

  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            inline: false
          },
          warnings: false,
          parse: {},
          mangle: true, // Note `mangle.properties` is `false` by default.
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_fnames: false,
        }
      })
    ],
  },

  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
    }]
  }
};