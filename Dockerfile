# Build Stage
FROM node:20-slim as builder
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json* . # Copy dependency files
RUN npm ci # Install dependencies

# Final Stage
FROM node:20-slim
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/ /usr/src/app/ # Copy built files
COPY . .
CMD ["npx", "quartz", "build", "--serve"]
