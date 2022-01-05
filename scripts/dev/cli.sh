#!/bin/bash

set -eu

rm -rf ./dist/server/tools/

(
    cd ./server/tools
    yarn install --pure-lockfile
)

mkdir -p "./dist/server/tools"
cp -r "./server/tools/node_modules" "./dist/server/tools"

./node_modules/.bin/webpack -c ./webpack/webpack.cli.js --env target development --stats-error-details --watch
