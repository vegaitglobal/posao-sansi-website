FROM node:18

ENV PORT 3000

RUN mkdir -p /usr/app

RUN npm install -g serve

WORKDIR /usr/app

COPY    ./  /usr/app/

EXPOSE 3000

CMD ["/bin/sh", "-c", "npm install; npm run build; npm start"]
