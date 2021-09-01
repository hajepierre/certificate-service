FROM node:12-alpine

WORKDIR /usr/src/app

COPY package*.json ./
ENV NODE_ENV=production
#RUN npm ci
#RUN npm install ci
RUN npm install --prefix assets && \
  npm --prefix ./assets ci --progress=false --no-audit --loglevel=error
COPY . . 

RUN npm run build

CMD [ "npm", "run", "start:prod" ]