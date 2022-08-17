FROM node:16.5.0

WORKDIR /danil/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["node", "dist/main"]