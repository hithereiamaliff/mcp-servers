FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN addgroup -g 1001 -S nodejs && \
    adduser -S mcp -u 1001
RUN chown -R mcp:nodejs /app
USER mcp

EXPOSE 3000

CMD ["node", "index.js"]