module.exports = packageName => {
  const pkg = require(`../../packages/${packageName}/package.json`);
  return pkg.version;
};
