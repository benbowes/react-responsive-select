#!/bin/bash

# Check if there are uncommited changes. Exit with an error if there are.
if [[ `git diff-index HEAD` != "" ]];
  then echo "ERROR! You have uncommited changes..." && exit 1;
  else echo "Deploy in progress...";
fi

# eslint and test
npm run test

# Build ReactResponsiveSelect JS && Build demo JS
npm run build

# git add new dist/ assets
git add .

# Commit dist/ changes
git commit -m "Deploy to gh-pages..."

# Tag release with package.json version
PACKAGE_VERSION=$(node --print --eval "require('./package.json').version")

git tag $PACKAGE_VERSION

# Push commited changes to master
git push origin master --tags

# Push dist folder to gh-pages branch
git push -f origin master:gh-pages

# Publish to npm
# npm publish
