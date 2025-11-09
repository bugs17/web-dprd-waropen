import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req, { params }) {
  const { fileName } = params;

  // Path ke folder tempat file disimpan
  const filePath = path.join(process.cwd(), "uploads", "file-document", fileName);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  // Baca file dari sistem
  const fileBuffer = fs.readFileSync(filePath);

  // Deteksi ekstensi untuk set header Content-Type
  const ext = path.extname(fileName).toLowerCase();
  let mimeType = "application/octet-stream"; // default

  if (ext === ".pdf") mimeType = "application/pdf";
  else if (ext === ".docx") mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  else if (ext === ".doc") mimeType = "application/msword";
  else if (ext === ".jpg" || ext === ".jpeg") mimeType = "image/jpeg";
  else if (ext === ".png") mimeType = "image/png";

  // Set header agar browser mendownload file
  const headers = new Headers();
  headers.append("Content-Disposition", `attachment; filename="${fileName}"`);
  headers.append("Content-Type", mimeType);

  return new NextResponse(fileBuffer, { headers });
}
