const webpack = require('webpack');
const path = require('path');

const PHASER_DIR = path.join(__dirname, '/node_modules/phaser-ce');

module.exports = {
  context: __dirname,
  module: {
    loaders: [
      { test: /pixi.js/, loader: "script" },
      { test: /p2.js/, loader: "script" },
      { test: /phaser.js/, loader: "script" }
    ],
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
  resolve: {
    alias: {
      'phaser': path.join(PHASER_DIR, 'build/custom/phaser.js'),
      'pixi': path.join(PHASER_DIR, 'build/custom/pixi.js'),
      'p2': path.join(PHASER_DIR, 'build/custom/p2.js'),
    }
  },
  entry: './js/main.js',
  output: {
    path: path.resolve(__dirname, 'scripts'),
    filename: 'main.bundle.js'
  }
};
