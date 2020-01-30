var fs = require("fs");
var path = require("path");
var kebabcase = require("lodash.camelcase");

fs.readdir("./icons", function(err, files) {
  const imports = files.map((file, i) => {
    const name = file.split(".")[0];
    return `export {default as ${kebabcase(name)}} from "./icons/${file}"`;
  });

  fs.writeFile("iconList.js", imports.join("\n"));
});
