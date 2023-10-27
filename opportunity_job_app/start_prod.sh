#!/bin/bash

set -e

npm install -g serve

npm install

npm run build

echo "NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL" > .env

npm start
