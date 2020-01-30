const execSync = require("child_process").execSync;

module.exports = () =>
  execSync("git rev-parse --abbrev-ref HEAD")
    .toString("utf8")
    .split("\n")[0];
