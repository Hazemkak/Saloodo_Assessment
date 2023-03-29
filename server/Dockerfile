FROM node:16-alpine 


WORKDIR /server

COPY . .


RUN yarn

EXPOSE 4000

ENV PORT 4000

CMD ["yarn", "start"]