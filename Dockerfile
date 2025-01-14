FROM node:20-bookworm-slim AS build
WORKDIR /build
COPY . .
ENV MODE=production
RUN npm ci && npm run build

FROM node:20-bookworm-slim AS app
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /build/build/client /app/src/
RUN npm install serve@14.2.0
EXPOSE 8080
RUN chown -R node /app
USER node
WORKDIR /app/src
ENTRYPOINT ["node", "/app/node_modules/serve/build/main", "-p", "8080", "-s", "."]
