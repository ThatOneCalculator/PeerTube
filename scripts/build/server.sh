#!/bin/bash

set -eu

rm -rf ./dist

./node_modules/.bin/webpack -c ./webpack/webpack.server.js --env target production --stats-error-details

cp -r "./server/static" "./server/assets" "./dist/server"
cp -r "./server/lib/emails" "./dist/server/lib"
