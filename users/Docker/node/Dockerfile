FROM node:lts-slim

WORKDIR /home/node/app

COPY ./package*.json ./
RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
