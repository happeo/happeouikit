// See help for monorepo setup: https://babeljs.io/docs/en/config-files#root-babelconfigjs-files

console.info(
  "Babel root configuration with environment: ",
  process.env.BABEL_ENV
);

const environments = {
  development: {
    plugins: [
      "@babel/plugin-transform-runtime",
      [
        "@babel/plugin-proposal-unicode-property-regex",
        { useUnicodeFlag: true }
      ]
    ]
  },
  production: {
    presets: [
      ["@babel/preset-env", { modules: false }],
      "@babel/preset-react",
      "@babel/preset-flow"
    ],
    plugins: [
      "babel-plugin-styled-components",
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-transform-runtime",
      [
        "@babel/plugin-proposal-unicode-property-regex",
        { useUnicodeFlag: true }
      ]
    ],
    ignore: ["__mocks__", "__tests__", "__fixtures__", "node_modules"]
  },
  test: {
    presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-flow"],
    plugins: [
      "babel-plugin-styled-components",
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-object-rest-spread",
      [
        "@babel/plugin-proposal-unicode-property-regex",
        { useUnicodeFlag: true }
      ]
    ]
  }
};

if (environments.hasOwnProperty(process.env.BABEL_ENV)) {
  const presets = environments[process.env.BABEL_ENV].presets;
  const plugins = environments[process.env.BABEL_ENV].plugins;
  module.exports = { presets, plugins };
}
