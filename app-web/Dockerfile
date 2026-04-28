# Use official Bun image
FROM oven/bun:latest

WORKDIR /app

# Copy package + prisma FIRST (important!)
COPY package.json bun.lock ./
COPY prisma ./prisma

# Install dependencies (now prisma works)
RUN bun install

# Copy the rest of the project
COPY . .

# (Optional but safe)
RUN bunx prisma generate

EXPOSE 3000

CMD ["bun", "run", "dev"]