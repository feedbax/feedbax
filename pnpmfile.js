module.exports = {
  hooks: {
    readPackage,
  },
};

function readPackage (pkg, context) {
  if (pkg.dependencies['caniuse-lite']) {
    pkg.dependencies['caniuse-lite'] = 'latest';
  }

  if (pkg.devDependencies['caniuse-lite']) {
    pkg.devDependencies['caniuse-lite'] = 'latest';
  }

  return pkg;
}
