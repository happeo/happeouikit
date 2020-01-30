const fs = require("fs");
const path = require("path");
module.exports = () => {
  const names = fs.readdirSync(path.join(__dirname, "../../packages"));
  return names.filter(item => item !== ".DS_Store");
};
