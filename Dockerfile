FROM node:16-alpine
ARG NODE_ENV=develop
COPY ./app-back/ /var/api/
WORKDIR /var/api/
EXPOSE 3333
RUN yarn install