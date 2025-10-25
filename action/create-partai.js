"use server";
import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import path from "path";
import { createSlug } from "@/lib/toSlug";
import { prisma } from "@/lib/db";

export const createPartai = async (namaPartai, image) => {
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
    const filePath = path.join(process.cwd(), "/uploads/logo-partai", fileName);

    // Simpan file ke server
    const namaFileDiDb = `${fileName}`
    await writeFile(filePath, Buffer.from(await image.arrayBuffer()));


    await prisma.partai.create({
        data:{
            nama: namaPartai,
            imageUrl:namaFileDiDb
        }
    })
    revalidatePath("/");
    revalidatePath("/dashboard/partai");
    

  } catch (error) {
    console.error("gagal add berita", error.message);
  }
};