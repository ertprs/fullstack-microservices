FROM node:alpine

WORKDIR /app

COPY package.json ./ 

RUN npm install --no-package-lock

COPY ./ ./

CMD [ "npm","run","dev" ]
