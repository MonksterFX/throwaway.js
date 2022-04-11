# build step frontend
FROM node:16-alpine as builder-frontend

WORKDIR /usr/src/app

COPY lib lib
COPY frontend frontend

WORKDIR /usr/src/app/frontend

RUN npm ci 
RUN npm run build

# build step backend
FROM node:16-alpine as builder-backend

WORKDIR /usr/src/app

COPY server/ .

RUN npm ci
RUN npm run build

# build final container
FROM node:16-alpine

WORKDIR /usr/src/app

COPY --from=builder-backend /usr/src/app/dist/ dist/
COPY --from=builder-backend /usr/src/app/node_modules/ node_modules/
COPY --from=builder-frontend /usr/src/app/frontend/dist/ public/

EXPOSE 5000

CMD [ "node", "dist/server.js" ]


