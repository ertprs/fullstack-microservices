FROM node:alpine

WORKDIR /app

COPY package.json ./

RUN npm cache clean --force

RUN npm install --only=prod --no-package-lock

COPY ./ ./

CMD [ "npm","start" ]