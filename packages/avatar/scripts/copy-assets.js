const path = require("path");
const shell = require("child_process").execSync;

const src = path.join(__dirname, "../src/assets");
const dest = path.join(__dirname, "../dist/assets");
const paths = [dest];

paths.forEach(function(p) {
  shell(`mkdir -p ${p}`);
  shell(`cp -rf ${src}/* ${p}`);
});
