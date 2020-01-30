/**
 * The app is built using server side rendering, so any packages depending on 'window' object, will throw an error. To
 * fix it, a dummy loader is used for those packages during SSR. Any packages that depend on window object should be added
 * to the test prop of the null loader.
 */
exports.onCreateWebpackConfig = ({ stage, loaders, actions, plugins }) => {
  if (stage === "develop-html" || stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /universe|croppie|tribute|codemirror/,
            use: loaders.null()
          }
        ]
      }
    });
  }

  // Remove 'speedy mode' CSS injection when deploying documentation
  // to allow editing styles
  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        SC_DISABLE_SPEEDY: true
      })
    ]
  });
};
