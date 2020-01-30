const { exec } = require("child_process");

module.exports = ({ newVersion, package }) => {
  // Do not use string interpolation here,
  // it will add weirdly these two characters at the beginning of the string ^\'
  // IE. don't do this: const commitMessage = `[${package}] updated to version ${newVersion}`;
  const commitMessage = [
    "[",
    package,
    "]",
    " Updated to version: ",
    newVersion
  ].join("");

  return new Promise((resolve, reject) => {
    exec(
      `git add ./packages/${package} && git commit -m "${commitMessage}" && git push origin && git push --tags`,
      (error, stdout, stderr) => {
        if (error) return reject(error);
        resolve(stdout);
      }
    );
  });
};
