#!/bin/bash

# Ensure on master branch. Exit with an error if not.
if [[ `git branch | grep \* | cut -d ' ' -f2` != 'master' ]];
    then echo 'ERROR! You are not on master branch' && exit 1;
fi

# Ensure no uncommited changes. Exit with an error if there are.
if [[ `git diff-index HEAD` != "" ]];
  then echo "ERROR! You have uncommited changes..." && exit 1;
fi
