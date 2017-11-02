const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: __dirname,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  entry: './js/main.js',
  output: {
    path: path.resolve(__dirname, 'scripts'),
    filename: 'main.bundle.js'
  }
};
