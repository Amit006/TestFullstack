FROM node:12.13.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install node-pre-gyp -g
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
