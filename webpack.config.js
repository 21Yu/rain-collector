const path = require('path');

module.exports = {
  entry: './src/asset/js/index.js',
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};