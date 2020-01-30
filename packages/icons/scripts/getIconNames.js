const fs = require("fs");
const path = require("path");

const sourcePath = path.join(__dirname, "../src/icons");

const getIconNames = () => {
  const filenames = fs.readdirSync(sourcePath);
  return filenames.map(filename => filename.split(".")[0]);
};

module.exports = getIconNames;
