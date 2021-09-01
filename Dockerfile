FROM node:12-alpine

WORKDIR /usr/src/app

COPY package*.json ./
ENV NODE_ENV=production
#RUN npm ci
RUN npm install ci
COPY . . 

RUN npm run build

CMD [ "npm", "run", "start:prod" ]