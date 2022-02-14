FROM node:16.13.2-alpine

WORKDIR /app

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL $REACT_APP_API_URL
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

COPY . ./

CMD ["npm", "start"]