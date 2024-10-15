FROM node:16-slim

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=3000
ENV PORT $PORT

ARG REACT_APP_API_URL=/api
ENV REACT_APP_API_URL $REACT_APP_API_URL

RUN npm i npm@latest -g

WORKDIR /app/frontend

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]
