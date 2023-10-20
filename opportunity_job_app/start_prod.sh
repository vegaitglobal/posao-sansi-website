#!/bin/bash

set -e

echo "NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL" > .env

npm start
