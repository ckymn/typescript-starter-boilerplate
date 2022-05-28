FROM node:16.14.2-alpine
WORKDIR /opt/restapi-typescript
COPY . .
RUN npm install && npm run build
CMD [ "node" ,"build/src/app.js" ]