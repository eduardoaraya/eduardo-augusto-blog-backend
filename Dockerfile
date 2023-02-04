FROM node:16-alpine
ARG NODE_ENV=production
ARG PORT=3333
COPY ./app-back/ /var/api/
WORKDIR /var/api/
EXPOSE $PORT
RUN yarn install
ENTRYPOINT [ "yarn", "server" ]