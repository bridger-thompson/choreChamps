FROM node:16-alpine AS builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install 

COPY . .
ENTRYPOINT npm run lint