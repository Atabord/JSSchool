const path = require('path');

module.exports = {
  mode: 'development',
  entry: '.\\src\\js\\index.js',
  output: {
    filename: 'boundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
};
