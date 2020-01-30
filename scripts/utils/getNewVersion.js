const semver = require("semver");

module.exports = function functionName(current, newSem) {
  if (newSem === "beta") {
    return semver.inc(current, "prerelease", "beta");
  }
  if (newSem === "alpha") {
    return semver.inc(current, "prerelease", "alpha");
  }
  return semver.inc(current, newSem);
};
