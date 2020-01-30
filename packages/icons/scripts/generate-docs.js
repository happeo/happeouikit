const fs = require("fs");
const path = require("path");
const getIconNames = require("./getIconNames");

const docsDest = path.join(__dirname, "../docs");
const templateSource = path.join(
  __dirname,
  "./template/list-of-icons.mdx.template"
);
const IMPORT_INJECT_TAG = "<!-- INJECT_IMPORT -->";
const TABLE_INJECT_TAG = "<!-- INJECT_TABLE -->";

let docsFile = fs.readFileSync(templateSource, { encoding: "utf8" });

const icons = getIconNames();

const importContent = icons.reduce((acc, icon, index) => {
  if (index === 0) acc = acc + "import { \n";
  acc = acc + `    ${icon}`;
  if (index === icons.length - 1) acc = acc + `\n} from "../src";`;
  else acc = acc + `,\n`;
  return acc;
}, "");

const oneRow = iconName =>
  `<tr><td>${iconName}</td><td><${iconName} height="36px" width="36px"/></td></tr>`;

const tableContent = icons.reduce(
  (acc, icon) => (acc = acc + `${oneRow(icon)}\n`),
  ""
);

docsFile = docsFile.replace(IMPORT_INJECT_TAG, importContent);
docsFile = docsFile.replace(TABLE_INJECT_TAG, tableContent);

fs.writeFileSync(`${docsDest}/list-of-icons.mdx`, docsFile, {
  encoding: "utf8"
});
