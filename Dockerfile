
# build step lib
FROM node:16-alpine as builder-lib

COPY lib/ .

RUN npm ci
RUN npm run bundle:browser


# build step backend
FROM node:16-alpine as builder-backend

COPY server/ .

RUN npm ci
RUN npm run build


# build step frontend
FROM node:16-alpine as builder-frontend

COPY frontend/ .

COPY --from=builder-lib dist/ src/lib/

RUN npm ci
RUN npm run build


