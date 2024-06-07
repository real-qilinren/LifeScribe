FROM node:16

LABEL authors="qilinren"

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3001

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = 'test' ]; then npm test; else node index.js; fi"]