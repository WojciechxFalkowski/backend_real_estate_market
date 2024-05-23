FROM node:20.11.1-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm rebuild bcrypt --build-from-source

CMD [ "npm", "run", "start:dev" ]