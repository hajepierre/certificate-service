FROM node:12-alpine

WORKDIR /usr/src/app

COPY package*.json ./
ENV NODE_ENV=production
RUN npm install

COPY . . 

RUN npm run build
EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]