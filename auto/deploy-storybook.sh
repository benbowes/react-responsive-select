#!/bin/bash

if [[ `git branch | grep \* | cut -d ' ' -f2` != 'master' ]];
    then echo 'ERROR! You are not on master branch' && exit 1;
fi

npm run compile

npm run build-storybook

storybook-to-ghpages