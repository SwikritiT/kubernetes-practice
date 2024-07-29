FROM node:20.15-alpine

WORKDIR /usr/src/app

COPY package* ./

RUN npm ci

COPY index.js .

CMD ["npm", "run", "start"]