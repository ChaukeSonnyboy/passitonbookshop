FROM node:22-alpine

WORKDIR /app

COPY package*.json .

RUN npm install --omit=dev

COPY ./ ./

CMD ["npm", "start"]