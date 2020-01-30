const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

module.exports = ({ package, newVersion, semver }) => {
  const changelog = fs.readFileSync(
    path.join(__dirname, `../../packages/${package}/CHANGELOG.md`),
    {
      encoding: "UTF-8"
    }
  );
  if (!changelog.includes(`## ${newVersion}`)) {
    console.error(
      chalk.red(
        `The change log did not contain '## ${newVersion}', thus thinking the changelog has not been updated.`
      )
    );
    //throw new Error("Changelog Error");
  }

  //  TODO: check does the update contain [Breaking], [Fixes], [Changed, [Added] etc. and does the given semver match
  const currentChanges = changelog
    .split("##")
    .find(part => part.includes(`${newVersion}`));
  return "##" + currentChanges;
};
