FROM node:bookworm-slim
ENV NODE_ENV=production

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy everything
COPY . .

# Expose port and start
EXPOSE 8080
CMD [ "node", "index.js" ]