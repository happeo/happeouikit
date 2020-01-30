const fs = require("fs");
const path = require("path");
const getIconNames = require("./getIconNames");

const destPath = path.join(__dirname, "../src");
const icons = getIconNames();
const template = icons.reduce(
  (acc, icon) =>
    (acc = acc + `export { default as ${icon} } from "./icons/${icon}";\n`),
  ""
);

fs.writeFileSync(`${destPath}/index.js`, template, { encoding: "utf8" });
