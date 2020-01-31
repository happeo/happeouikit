/**
 * This generator approach is highly inspired from react-boilerplate generators
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/blob/master/internals/generators/index.js
 *
 */
"use strict";

const bundlePkg = require("../../package.json");
const kebabcase = require("lodash.kebabcase");
const capitalize = require("lodash.capitalize");
const camelCase = require("lodash.camelcase");
const upperFirst = require("lodash.upperfirst");

const packageGenerator = require("./package");
const getDepedencyVersion = require("../utils/getDepedencyVersion");
const getPackageVersion = require("../utils/getPackageVersion");

console.log(getDepedencyVersion(bundlePkg, "styled-components"));

module.exports = function(plop) {
  // controller generator
  plop.setWelcomeMessage("Welcome to the Happeo component generator!");

  // Text tools
  plop.setHelper("kebab", function(text) {
    return kebabcase(text);
  });
  plop.setHelper("titletext", function(text) {
    return capitalize(text);
  });
  plop.setHelper("properCase", function(text) {
    return upperFirst(camelCase(text));
  });

  // Defaults in a "hackish way"...
  plop.setHelper("kitname", function(text) {
    return "@happeouikit";
  });

  plop.setHelper("react-version", function(text) {
    return getDepedencyVersion(bundlePkg, "react");
  });

  plop.setHelper("styled-components-version", function(text) {
    return getDepedencyVersion(bundlePkg, "styled-components");
  });

  plop.setHelper("happeo-docs-version", function(text) {
    return getDepedencyVersion(bundlePkg, "@happeo/docs-tools");
  });

  plop.setHelper("happeo-colors-version", function(text) {
    return getPackageVersion("colors");
  });

  plop.setHelper("prop-types-version", function(text) {
    return getDepedencyVersion(bundlePkg, "prop-types");
  });

  plop.setGenerator("package", packageGenerator);
};
