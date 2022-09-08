FROM node:18
ENV APP_PATH /hasura-starter
WORKDIR $APP_PATH
COPY ./package*.json ./
RUN npm install
COPY ./ ./
RUN npm run build
EXPOSE 8000
CMD [ "npm", "run", "prod" ]