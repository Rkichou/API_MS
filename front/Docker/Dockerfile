FROM node:lts-slim

WORKDIR /home/node/app

COPY ./package*.json ./
RUN npm install

COPY . .

EXPOSE 5172

CMD ["npm", "start"]
