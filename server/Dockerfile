FROM node:16.14.2-alpine
COPY . /tmp
WORKDIR /tmp
RUN npm install
CMD [ "node", "/src/api/app.ts" ]
