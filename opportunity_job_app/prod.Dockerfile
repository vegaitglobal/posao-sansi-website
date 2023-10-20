FROM node:18 as build

WORKDIR /app

COPY --chmod=777 package*.json .
RUN npm ci

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/.next            ./.next
COPY --from=build /app/public           ./public
COPY --from=build /app/package.json     .
COPY --from=build /app/node_modules     ./node_modules
COPY --from=build /app/start_prod.sh    .

EXPOSE 3000

CMD [ "sh", "/app/start_prod.sh" ]
