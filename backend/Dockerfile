FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json tsconfig.json ./
COPY src ./src
RUN npm ci
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY --from=builder /app/dist ./dist
RUN npm ci --production
EXPOSE 8080
CMD ["node", "dist/index.js"]
