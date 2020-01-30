const { exec } = require("child_process");
const path = require("path");

module.exports = (semver, packagePath) => {
  return new Promise((resolve, reject) => {
    const absPath = path.join(__dirname, `../../packages/${packagePath}`);
    exec(
      `cd ${absPath} && yarn version --no-git-tag-version --new-version "${semver}"`,
      (error, stdout, stderr) => {
        if (error) {
          console.error("error", error);
          return reject(error);
        }
        return resolve(stdout);
      }
    );
  });
};
