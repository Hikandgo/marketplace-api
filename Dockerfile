FROM node:16-alpine
WORKDIR /opt/app
ADD package.json package.json
ADD . .
RUN npm install --legacy-peer-deps
RUN npm run build --legacy-peer-deps
RUN npm prune --production --legacy-peer-deps
CMD ["node", "./dist/main.js"]
