const runShellCommand = require("../utils/runShellCommand");

module.exports = async ({ package: pkg }) => {
  return runShellCommand("npm", ["publish", `packages/${pkg}`]);
};
