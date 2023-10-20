FROM node:18 as build

ENV NODE_ENV production

WORKDIR /app

COPY --chmod=777 package*.json .
RUN npm ci

COPY . .

FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/.next        ./.next
COPY --from=build /app/.env         .
COPY --from=build /app/public       ./public
COPY --from=build /app/package.json .
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

CMD ["sh", "/usr/app/scripts/entrypoint.sh", "prod"]
