const path = require('path');
const webpack = require('webpack');
module.exports = {
  entry: {
    vendor: ['vue', 'vue-i18n', 'vue-router', 'vuex', 'axios']
  },
  output: {
    path: path.resolve(__dirname, '../library/'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../library/', '[name]-manifest.json'),
      name: '[name]_library'
    })
  ]
};
