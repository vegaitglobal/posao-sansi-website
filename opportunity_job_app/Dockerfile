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

CMD [
    # We are echoing environment variable into .env file because
    # the variable will be available after the container is started:
    "echo \"NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL\" > .env",
    "npm start"
]

#########################
### Development image ###
#########################

FROM base AS development

CMD ["/bin/sh", "-c", "npm install; npm run start"]
