const path = require("path/posix");

module.exports = {
  webpack: {
    alias: {
      $components: path.resolve(__dirname, "src/pages"),
      $contexts: path.resolve(__dirname, "src/contexts"),
      $hooks: path.resolve(__dirname, "src/hooks"),
      $canvas: path.resolve(__dirname, "src/canvas"),
    },
  },
  jest: {},
};
