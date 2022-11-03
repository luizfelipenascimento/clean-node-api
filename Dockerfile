FROM node:14
WORKDIR /usr/src/clean-node-api
COPY ./package.json .
RUN npm install --only=prod
RUN mkdir -p /usr/src/clean-node-api/dist
EXPOSE 5000
