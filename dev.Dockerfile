FROM node:12.13-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ../.. .
RUN npm run build && npm prune --dev


FROM node:12.13-alpine

ENV PORT 5000
ENV NODE_ENV=development
WORKDIR /app

COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules

RUN rm -rf /app/dist/migrations/*.d.ts /app/dist/migrations/*.map

COPY --from=build /app/package.json /app/package.json

EXPOSE $PORT/tcp
ENTRYPOINT [ "node" ]
CMD ["dist/main.js"]
