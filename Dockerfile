# Menggunakan base image Node.js
FROM node:22

# Set working directory
WORKDIR /app

# Salin package dulu untuk efisiensi layer
COPY package*.json ./
RUN npm install

# PAKSA instalasi binary lightningcss untuk linux x64 gnu
RUN npm install lightningcss-linux-x64-gnu

# Menyalin seluruh direktori proyek ke dalam container
COPY . .


# Pastikan entrypoint bisa dieksekusi
# RUN chmod +x docker-entrypoint.sh


# COPY .env .

# Generate Prisma Client
RUN npx prisma generate

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
