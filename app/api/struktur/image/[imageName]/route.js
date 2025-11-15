// app/api/uploads/[filePath]/route.js
import path from 'path';
import fs from 'fs/promises';

export async function GET(req, { params }) {
  const { imageName } = await params; // Mengambil filePath dari URL

  try {
    // Gabungkan path dengan folder "uploads"
    const file = await fs.readFile(path.join(process.cwd(), 'uploads/struktur', imageName));

    // Dapatkan ekstensi file untuk Content-Type
    const ext = path.extname(imageName).substring(1);
    const contentType = getContentType(ext);

    // Kembalikan file sebagai respons
    return new Response(file, {
      headers: {
        'Content-Type': contentType,
      },
    });
  } catch (error) {
    console.error("File not found:", error.message);
    return new Response("File not found", { status: 404 });
  }
}

// Fungsi untuk mendapatkan Content-Type berdasarkan ekstensi
function getContentType(ext) {
  const mimeTypes = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    svg: "image/svg+xml",
    webp: "image/webp",
    pdf: "application/pdf",
    txt: "text/plain",
  };
  return mimeTypes[ext] || 'application/octet-stream';
}