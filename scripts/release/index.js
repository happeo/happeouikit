const inquirer = require("inquirer");
const chalk = require("chalk");
const chalkInfo = chalk.bold.blue;
const chalkError = chalk.bold.red;
const chalkWarn = chalk.bold.yellow;

const consoleError = msg =>
  console.error("⛔️    " + chalkError("Error: ") + msg);
const consoleInfo = msg => console.info("❕    " + chalkInfo("Info: ") + msg);
const consoleWarn = msg =>
  console.warn("⚠️    " + chalkWarn("Warning: ") + msg);

const packageNames = require("../utils/packageNames");
const packageVersion = require("../utils/packageVersion");
const getChangeLog = require("../utils/getChangeLog");
const getNewVersion = require("../utils/getNewVersion");
const getBranchName = require("../utils/getBranchName");

const updateVersion = require("./updateVersion");
const commit = require("./commit");
const publishPackages = require("./publishPackages");

inquirer
  .prompt([
    {
      type: "list",
      name: "package",
      message: "Which component you want to release?",
      choices: packageNames(),
      filter: function(val) {
        return val.toLowerCase();
      }
    },
    {
      type: "list",
      name: "semver",
      message: function(answers) {
        const currentVersion = packageVersion(answers.package);
        return `Current version is ${currentVersion}. Which (semantic) version you would like to release?`;
      },
      choices: [
        {
          value: "patch",
          name: "patch (fixes, no additions nor behaviour changes, 0.0.+)"
        },
        {
          value: "minor",
          name: "minor (additions to features, no breaking changes, 0.+.0)"
        },
        { value: "major", name: "major (breaking changes, +.0.0)" },
        "alpha",
        "beta"
      ]
    },
    {
      type: "confirm",
      name: "changeLogOk",
      when: function(answers) {
        if (
          ["minor", "major", "patch"].includes(answers.semver) &&
          getBranchName() !== "master"
        ) {
          consoleError(
            "You can only publish major, minor or patch versions from master branch."
          );
          return false;
        }
        return true;
      },
      message: function(answers) {
        const { package, semver } = answers;

        const newVersion = getNewVersion(packageVersion(package), semver);
        const changeLog = getChangeLog({ package, newVersion, semver });
        return `Does the following changelog look good: \n----\n\n ${changeLog} \n----\n`;
      }
    },
    {
      type: "confirm",
      name: "confirmation",
      when: function(answers) {
        return answers.changeLogOk;
      },
      message: function(answers) {
        const newVersion = getNewVersion(
          packageVersion(answers.package),
          answers.semver
        );
        return `You wish to update '${answers.package}' to version ${newVersion}?`;
      }
    },
    {
      type: "confirm",
      name: "publish",
      default: true,
      when: function(answers) {
        return answers.confirmation;
      },
      message: "Do you want to publish the package as well?"
    }
  ])
  .then(answers => {
    const { package, confirmation, changeLogOk, semver, publish } = answers;

    if (!confirmation || !changeLogOk) {
      consoleInfo("Cancelled");
      return;
    }

    const currentVersion = packageVersion(package);
    const newVersion = getNewVersion(currentVersion, semver);
    // Define a async function to nicely wrap the consecutive async tasks
    async function tasks() {
      await updateVersion(newVersion, package);
      if (publish) {
        await commit({ newVersion, package });
        await publishPackages({ package });
      }
      return;
    }
    return tasks();
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
