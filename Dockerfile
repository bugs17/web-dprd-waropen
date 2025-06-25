# Menggunakan base image Node.js
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Menyalin seluruh direktori proyek ke dalam container
COPY . .

# Install dependencies
RUN npm install

# COPY .env .

# Generate Prisma Client
# RUN npx prisma generate

# Build aplikasi Next.js
RUN rm -rf .next
RUN npm run build

# Set environment variables
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Expose port 3000
EXPOSE 3000