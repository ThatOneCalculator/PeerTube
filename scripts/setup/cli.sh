#!/bin/sh

set -eu

NOCLIENT=1 yarn install --pure-lockfile

rm -rf ./dist/server/tools/

(
    cd ./server/tools
    yarn install --pure-lockfile
)

./node_modules/.bin/webpack -c ./webpack/webpack.cli.js --env target production --stats-error-details

cp -r "./server/tools/node_modules" "./dist/server/tools"
