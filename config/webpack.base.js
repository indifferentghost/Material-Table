const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const BASE_DIR = path.resolve(__dirname, '../');
const STATIC_DIR = path.resolve(BASE_DIR, './static');

module.exports = {
  entry: path.resolve(BASE_DIR, './src/index.tsx'),
  output: {
    path: path.resolve(BASE_DIR, './public'),
    publicPath: '/',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js(x?)$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(STATIC_DIR, './index.ejs'),
      filename: 'index.html',
      title: 'Table',
      publicDir: STATIC_DIR,
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.wasm', '.mjs', '.js', '.json'],
  },
};
