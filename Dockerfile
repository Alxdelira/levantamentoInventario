FROM node:20-alpine 

WORKDIR /aip-levantamento-patrimonial

EXPOSE 3000

COPY . .

RUN npm install

ENTRYPOINT npm start