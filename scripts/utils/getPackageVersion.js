const path = require("path");
module.exports = function getPackageVersion(pkgName) {
  try {
    return require(path.join(
      __dirname,
      `../../packages/${pkgName}/package.json`
    )).version;
  } catch (e) {
    throw e;
  }
};
