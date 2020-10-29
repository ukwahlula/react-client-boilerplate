#!/bin/bash

# Exit on any error
set -ex

GIT_TAG="${GITHUB_REF##refs/tags/}"
GIT_BRANCH="${GITHUB_REF##refs/heads/}"

if [ "$GIT_BRANCH" == "develop" ]; then
    export REACT_APP_API_SERVER=$REACT_APP_API_SERVER_TESTING
    make build
elif [ "$GIT_BRANCH" == "master" ]; then
    export REACT_APP_API_SERVER=$REACT_APP_API_SERVER_STAGING
    make build
elif [[ $GITHUB_REF != $GIT_TAG ]]; then
    export REACT_APP_API_SERVER=$REACT_APP_API_SERVER_PRODUCTION
    make build
fi
