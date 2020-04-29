FROM node
WORKDIR /
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]