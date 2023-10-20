#!/bin/bash

set -e

DEV_ARG="dev"
PROD_ARG="prod"

#########################################################################
# START: execution ######################################################
#########################################################################
if [ "$1" = "$PROD_ARG" ]; then
  echo "NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL" > .env
  npm run build
  npm start

elif [ "$1" = "$DEV_ARG" ]; then
  npm install
  npm run dev

else
  echo "Unknown argument: \"$1\" \n"
  echo "Exiting!\n" "info"
  exit 1
fi
#########################################################################
# END: execution ########################################################
#########################################################################
