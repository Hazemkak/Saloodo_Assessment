FROM node:16

WORKDIR /client

COPY . .

RUN yarn

EXPOSE 3000

RUN yarn build

CMD ["yarn","start"]