#!/bin/bash

# Check if there are uncommited changes. Exit with an error if there are.
if [[ `git diff-index HEAD` != "" ]];
then echo "ERROR! You have uncommited changes..." && exit 1;
else echo "Deploy in progress...";
fi

# Build JS into dist/app.js
webpack --config webpack.config.js

# git add new dist/ assets
git add dist/index.js dist/SelectBox.js dist/index.html dist/styles.css

# Commit dist/ changes
git commit -m "Deploy to gh-pages..."

# Push commited changes to master
git push origin master

# Push dist folder to gh-pages branch
git subtree push --prefix dist origin gh-pages
