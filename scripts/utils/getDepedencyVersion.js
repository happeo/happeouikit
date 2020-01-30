/**
 *  Gets the depedency version. Either dev or direct dep
 *
 */
module.exports = function(packageJson, depName) {
  if (!packageJson) throw new Error("No package json given :/");
  if (packageJson.dependencies[depName])
    return packageJson.dependencies[depName];
  else if (packageJson.devDependencies[depName])
    return packageJson.devDependencies[depName];
  else throw new Error("No such depedency");
};
