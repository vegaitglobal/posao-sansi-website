##################
### Base image ###
##################

FROM node:18 as base

RUN mkdir -p    /usr/app
COPY            ./  /usr/app/
WORKDIR         /usr/app

########################
### Production image ###
########################

FROM base AS production

RUN npm install -g serve

CMD ["sh", "/usr/app/scripts/entrypoint.sh", "prod"]

#########################
### Development image ###
#########################

FROM base AS development

CMD ["sh", "/usr/app/scripts/entrypoint.sh", "dev"]
