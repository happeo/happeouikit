# Happeo UI Kit

Happeo component library for React Apps.

## Requirements

- [lerna](https://github.com/lerna/lerna)

## Notes

- **IMPORTANT:** This repository uses `lerna` and `yarn workspaces`. 
For this reason **don't use npm!!!**. It would mix things up as yarn is taking care of the npm functionality.

## Adding a new package

There is a nifty generator tool for this. Which should get you going easily. Just run the following:

    yarn run generate

The code for the generator can be found from `scripts` directory. If there is something wrong with the templates,
you can go and change them. The tool under the hood is called [plop](https://www.npmjs.com/package/plop) and the inspiration is from [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate).

## Developing a package

The idea of the component library is to develop isolated components that could be placed anywhere in React applications. This way we get reusable,
self-contained and easy to test components

That's why the preferred development flow is:

1. Install all packages by running: `lerna bootstrap`
1. If a new dependency is used in only one package of the kit, it'd be added to the `package.json` of that specific package.
Otherwise it can be added to the root `package.json` by running `yarn add -W package-name`.
1. The kit packages are linked straight from their source files and there's no need to run `build` script for development.  
1. Start the documentation engine at the repo root: `yarn run dev`.
1. Create new component with: `yarn run generate`.
1. Develop your component.
1. Update the document file as you need, you can also use the [Playground component](https://www.docz.site/docs/built-in-components#playground-component).
1. Make sure all the new components added have [Props component](https://www.docz.site/docs/built-in-components#component-props) in the documentation.
1. Make sure all your edits are documented in the docs, i.e. the new props are in the `Props` and new additions have examples.
1. Publish your edits: follow the "Publishing a Package" guide below.

## Adding a new icon to happeouikit

1. Add svg file to the folder `packages/icons/svgs`
2. Run `yarn run build`.
3. Start the documentation engine on the repo root: `yarn run dev`.
4. Publish your edits: follow the "Publishing a Package" guide below.

## Writing docs

The documentation engine used is [Docz](https://www.docz.site/).

- Try to write the docs as you develop, documenting all the use cases the component is made for.
- If another component is shown only in the documentation, like a button in a card. The other package needs to be included as a dependency of the package you are writing. So for example `@happeouikit/button` needs to be a dependency of `@happeouikit/card`.
- Sometimes the page just doesn't refresh or shows old stuff. This is the time to start the `yarn run dev`.
- If you get an error of a module cannot be found. Just stop the `dev` process and run `lerna bootstrap`. This will make sure all the dependencies are symlinked to the packages.

## Publishing a package

1. Think about the version increase (major, minor or patch) your edits require. Don't hesitate about releasing major if it really is a breaking change. However avoid making breaking changes too often in the first place. 
**Note**: if a major version of the UI kit is released, that means that all the packages have to be updated to the next major version (the version doesn't have to be the same for all of them). It can be easily done via `lerna publish major`. 
1. Make sure you have written notes into the package's `CHANGELOG.md`. Especially if you have added components write each additions. Breaking changes of course should be written loud and clear.
1. When all the above is done, run `yarn run publish` in the root and follow the instructions. This will make a git commit and publish your package. It will build all packages, but should only publish packages that have new git commits with versions.
1. In case there's a need to publish single package only, there's a script `publish:single`, which will have the same workflow as before the kit upgrade and will use `npm` to publish specified package.

### Troubleshooting:

- If you want to re-publish a version, you can delete uploaded version's `.tgz` files from JFrog. Be careful not to delete all versions. So read extra carefully. https://universe.jfrog.io/universe/webapp/#/artifacts/browse/tree/General/npm-local/@happeouikit.
- If the changes to a package aren't visible after it has been published, make sure that the files in the package's `dist` folder have the new changes. If yes you might need to publish it again, since for some reason the changes aren't picked up sometimes.
- If the files were not build, execute `yarn run build`.

## Testing and reviewing

1. Each created/updated PR will create a container hosting the newly introduced changes.
2. The url pointing to this container can be found at the end of the build pipeline (check `Live Draft Url` field).
3. The url can be shared with other devs/designers to speed up the testing/reviewing process.

## FAQ

### Styled components not appearing when using in app

https://github.com/styled-components/styled-components/issues/1305

> That depends entirely on your build setup. How are you building the component library?
> Also make sure the component library only has the dependency in peerDependencies and in devDependencies,
> and that both the app and the lib allow the same version.
>
> https://github.com/styled-components/styled-components/issues/1305#issuecomment-343457431
