"use server";
import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/db";

export const addKartuUcapan = async (desc, image) => {
  try {
    // Pastikan parameter file diterima
    if (!image || typeof image !== "object") {
      throw new Error("File gambar tidak valid");
    }

    // Modifikasi nama file: hilangkan spasi dan tambahkan timestamp
    const timestamp = Date.now();
    const originalName = image.name.replace(/\s+/g, ""); // Hapus semua spasi
    const extension = path.extname(originalName); // Ekstensi file (.jpg, .png, dll)
    const fileName = `${path.basename(originalName, extension)}-${timestamp}${extension}`;

    // Tentukan lokasi penyimpanan file
    const filePath = path.join(process.cwd(), "/uploads/kartu-ucapan", fileName);

    // Simpan file ke server
    const namaFileDiDb = `${fileName}`;
    await writeFile(filePath, Buffer.from(await image.arrayBuffer()));

    // Coba simpan ke database
    await prisma.kartuUcapan.create({
      data: {
        description: desc,
        urlImage: namaFileDiDb,
      },
    });
    
    revalidatePath("/");
    revalidatePath("/dashboard/kartu-ucapan");
  } catch (error) {
    console.error("Gagal add kartu ucapan:", error);
    // Lempar error kembali agar client tahu kalau prosesnya gagal total
    throw new Error(error.message);
  }
};