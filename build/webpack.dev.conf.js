const path = require('path');

const resolve = dir => path.join(__dirname, dir);
module.exports = {
  devtool: 'eval-source-map'
};
