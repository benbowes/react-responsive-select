#!/bin/bash

# Check if there are uncommited changes. Exit with an error if there are.
if [[ `git diff-index HEAD` != "" ]];
then echo "ERROR! You have uncommited changes..." && exit 1;
else echo "Deploy in progress...";
fi

# eslint and test
npm run test

# Build demo JS
webpack --config webpack.config.react-responsive-select.js

# Build SelectBox JS
webpack --config webpack.config.demo.js

# git add new dist/ assets
git add .

# Commit dist/ changes
git commit -m "Deploy to gh-pages..."

# Push commited changes to master
git push origin master

# Push dist folder to gh-pages branch
git push -f origin master:gh-pages
