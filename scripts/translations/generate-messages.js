const fs = require("fs");
const path = require("path");
const pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

const pkgName = pkg.name.split("/")[1];

try {
  const messagePath = `${__dirname}/../../.intl/packages/${pkgName}/src/messages.json`;
  const destinationPath = `${__dirname}/../../packages/${pkgName}/messages.json`;
  const messages = require(path.normalize(messagePath));

  fs.writeFileSync(destinationPath, JSON.stringify(messages), {
    format: "UTF-8"
  });
} catch (err) {}
