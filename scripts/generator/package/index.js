/**
 * Package Generator
 *
 */
const packageExists = require("../../utils/packageExists");

module.exports = {
  description: "Add an a package into the library",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Package name:",
      validate: value => {
        if (/.+/.test(value)) {
          return packageExists(value)
            ? "A package with this name already exists"
            : true;
        }

        return "The name is required";
      }
    },
    {
      type: "input",
      name: "description",
      message: "Short description what this component is about:"
    },
    {
      type: "list",
      name: "type",
      message: "Select the type of the sample component",
      default: "Stateless Function",
      choices: () => [
        "Stateless Function",
        "React.PureComponent",
        "React.Component"
      ]
    },
    {
      type: "confirm",
      name: "samples",
      default: true,
      message: "Do you want to include samples as well?"
    }
  ],
  actions: data => {
    // Generate index.js and index.test.js
    let componentTemplate;

    switch (data.type) {
      case "Stateless Function": {
        componentTemplate = "./package/stateless.js.hbs";
        break;
      }
      default: {
        componentTemplate = "./package/class.js.hbs";
      }
    }

    const actions = [
      {
        type: "add",
        path: "../../packages/{{kebab name}}/README.md",
        templateFile: "./package/README.md.hbs"
      },
      {
        type: "add",
        path: "../../packages/{{kebab name}}/CHANGELOG.md",
        templateFile: "./package/CHANGELOG.md.hbs"
      },
      {
        type: "add",
        path: "../../packages/{{kebab name}}/package.json",
        templateFile: "./package/package.json.hbs"
      },
      {
        type: "add",
        path: "../../packages/{{kebab name}}/docs/{{kebab name}}.mdx",
        templateFile: "./package/basedoc.mdx.hbs"
      },
      {
        type: "add",
        path: "../../packages/{{kebab name}}/src/{{properCase name}}.js",
        templateFile: componentTemplate
      },
      {
        type: "add",
        path: "../../packages/{{kebab name}}/src/index.js",
        templateFile: "./package/index.js.hbs"
      }
    ];
    return actions;
  }
};
