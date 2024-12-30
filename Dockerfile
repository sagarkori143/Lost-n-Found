FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine AS runner

WORKDIR /app

# Copy the built app from the builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./

# Install production dependencies
RUN npm install --only=production

# Expose the port used by Next.js
EXPOSE 3000

# Run the Next.js app
CMD ["npm", "start"]
