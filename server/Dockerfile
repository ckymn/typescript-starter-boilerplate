FROM node:14
ADD pacakge.json /tmp/package.json
RUN rm -rf build
RUN cd /tmp && npm install 
ADD ./ /src/api/v1
RUN rm -rf src/api/v1/node_modules && cp -a /tmp/node_modules /src/api/v1
WORKDIR /src/api/v1
RUN npm build
CMD [ "node", "build/src/api/v1/app.js" ]