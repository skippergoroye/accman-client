# stage1 - build react app first
FROM node:18.16.0-alpine3.18
WORKDIR /account-management-system
COPY ./package*.json ./
COPY vite.config.js .
RUN npm install
COPY . .
RUN npm run build
ENV PORT=8080
EXPOSE 8080
CMD ["npm", "run", "preview"]

#end