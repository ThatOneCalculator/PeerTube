#!/bin/bash

set -eu

if [ ! -f "./client/dist/en-US/index.html" ]; then
  if [ -z ${1+x} ] || [ "$1" != "--skip-client" ]; then
    echo "client/dist/en-US/index.html does not exist, compile client files..."
    npm run build:client
  fi
fi

# Copy locales
mkdir -p "./client/dist"
rm -rf "./client/dist/locale"
cp -r "./client/src/locale" "./client/dist/locale"

rm -rf "./dist"

mkdir -p "./dist/server/lib"

cp -r ./server/static ./server/assets ./dist/server
cp -r "./server/lib/emails" "./dist/server/lib"

./node_modules/.bin/webpack -c ./webpack/webpack.server.js --watch --env target development
