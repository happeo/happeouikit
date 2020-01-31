# Changelog

This is the Changelog for the happeouikit engine and the Documentation. **Not for individual components**.
See their Changelog in the respective packages.

## 3.0.0

- Use IBM Plex Sans as base font instead of Karla

## 2.0.0

- Upgraded to docz v2
- Removed cjs files, only use esm 
- Used Lerna + Yarn workspaces instead of Bolt for package managing
- Pointed `module` property from each package to src instead of dist so the packages can be used without installing them first
- `Props` is used instead of `PropsTable` for documentation
- Moved package-specific dependencies to each package's `package.json`   
- Added dynamic module loading for Rich text editor to avoid SSR errors
- Removed `.babelrc`, all the configuration moved to `babel.config.js` instead
- Added `src` dir for Gatsby-specific configuration overrides

## 1.3.0

- Added content renderer
- Added emojis

## 1.2.0

- Fixed generator script, it was not publishing nor making git commits.
- Changed the names of cjs and esm compiling scripts to `compile:cjs` and `compile:esm`, to avoid confusion with building.
- Added master branch check for patch, minor and major updates.
- Updated README with more specific guides for publishing.

## 1.1.0

- Updated generator script

## 1.0.0

- Initial version
- Generators
- Documentation site works alright
