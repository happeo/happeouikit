/**
 * packageExists
 *
 * @see Inspired by: https://github.com/react-boilerplate/react-boilerplate/blob/master/internals/generators/utils/componentExists.js
 *
 */

const fs = require("fs");
const path = require("path");
const packages = fs.readdirSync(path.join(__dirname, "../../packages"));

function packageExists(comp) {
  return packages.indexOf(comp) >= 0;
}

module.exports = packageExists;
