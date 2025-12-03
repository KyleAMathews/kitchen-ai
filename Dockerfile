# Build stage
FROM node:22-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application (skip prerendering as it requires env vars)
ENV SKIP_PRERENDER=true
RUN pnpm run build

# Production stage
FROM node:22-alpine

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (needed for migration tools in release command)
RUN pnpm install --frozen-lockfile

# Copy built application from builder (Nitro v3 bundles everything in .output)
COPY --from=builder /app/.output ./.output

# Copy migration-related files for release command
COPY --from=builder /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/src/db ./src/db

# Expose port (Fly.io uses 8080 by default, but we can configure it)
EXPOSE 3000

# Start the application
CMD ["node", ".output/server/index.mjs"]
