FROM node:lts-slim

WORKDIR /home/node/app

COPY ./package*.json ./
RUN npm install

COPY . .

EXPOSE 3004

CMD ["npm", "start"]
