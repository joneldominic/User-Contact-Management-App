FROM node:16.13.2-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./frontend/package.json ./
COPY ./frontend/package-lock.json ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g --silent

COPY ./frontend ./

CMD ["npm", "start"]