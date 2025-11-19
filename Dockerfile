# Menggunakan base image Node.js
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Menyalin seluruh direktori proyek ke dalam container
COPY . .

# Install dependencies
RUN npm install

# Pastikan entrypoint bisa dieksekusi
RUN chmod +x docker-entrypoint.sh


# COPY .env .

# Generate Prisma Client
# RUN npx prisma generate

# Push schema ke database (akan bikin file .db untuk SQLite)
# RUN npx prisma db push

# Build aplikasi Next.js
RUN rm -rf .next
RUN npm run build

# Set environment variables
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Expose port 3000
EXPOSE 3000

ENTRYPOINT ["./docker-entrypoint.sh"]