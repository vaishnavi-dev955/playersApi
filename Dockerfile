#Sample Dockerfile for NodeJS Apps

FROM node:18.16.0

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3014

CMD [ "node", "index.js" ]