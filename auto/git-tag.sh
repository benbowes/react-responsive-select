#!/bin/bash

# Tag release with package.json version
PACKAGE_VERSION=$(node --print --eval "require('./package.json').version")

git tag $PACKAGE_VERSION

# Push commited changes to master
git push origin master --tags
