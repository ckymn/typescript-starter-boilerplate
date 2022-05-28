FROM node:16.14.2-alpine
MAINTAINER ckymn
WORKDIR /app
COPY package.json .
RUN rm -rf build
RUN npm install
COPY . ./
RUN npm run build
CMD [ "node" ,"build/src/api/app.js" ]