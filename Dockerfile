FROM node:14
WORKDIR /usr/src/app

ENV NT_HOST="localhost"
ENV NT_PORT="25565"
ENV NT_USERNAME="anonymous"
ENV NT_PASSWORD="password"
ENV LOGIN_PASSWORD="password"
ENV LOGIN="no"
ENV NT_AUTH="mojang"

COPY package*.json ./

RUN npm install -g npm
RUN npm upgrade
RUN npm install

COPY . .

CMD ["npm", "start"]
