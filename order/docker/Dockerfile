FROM node:lts-slim

WORKDIR /home/node/app

COPY ./order/package*.json ./
RUN npm install

COPY ./order ./

EXPOSE 3000

CMD ["npm", "start"]