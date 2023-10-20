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
RUN npm run build

CMD [ "sh", "/usr/app/start_prod.sh" ]

##########################
#### Development image ###
##########################

FROM base AS development

CMD [ "sh", "-c", "npm install; npm run start" ]
