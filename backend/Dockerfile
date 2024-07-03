FROM node:lts

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm cache clean --force && \
    rm -rf node_modules && \
    npm install && \
    npm rebuild bcrypt --build-from-source

EXPOSE 5000

CMD ["npm", "start"]