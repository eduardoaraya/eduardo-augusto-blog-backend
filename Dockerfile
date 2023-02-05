FROM node:16-alpine
ARG NODE_ENV=production
ARG PORT=3333
WORKDIR /var/api/
COPY ./app-back/package*.json .
RUN yarn install
COPY ./app-back/ .
EXPOSE $PORT
ENTRYPOINT [ "yarn", "server" ]