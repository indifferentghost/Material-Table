const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const BASE_DIR = path.resolve(__dirname, '../');
const PUBLIC_DIR = path.resolve(BASE_DIR, './public');

module.exports = {
  entry: path.resolve(BASE_DIR, './src/index.tsx'),
  output: {
    path: path.resolve(BASE_DIR, './dist'),
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
      template: path.resolve(PUBLIC_DIR, './index.ejs'),
      filename: 'index.html',
      title: 'Table',
      publicDir: PUBLIC_DIR,
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.wasm', '.mjs', '.js', '.json'],
  },
};
