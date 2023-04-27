FROM node:18


WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm config set registry http://registry.npmjs.org
RUN npm install
RUN npm install -g typescript

COPY . .

EXPOSE ${NODE_ENV}

CMD ["npm", "run", "serve"]