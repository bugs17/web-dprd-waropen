"use server";
import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import path from "path";
import { createSlug } from "@/lib/toSlug";
import { prisma } from "@/lib/db";

export const createBerita = async (judul, image, content, date) => {
  try {
    // Pastikan parameter file diterima
    if (!image || typeof image !== "object") {
      throw new Error("File gambar tidak valid");
    }

    const formatedDate = new Date(date)

    const slug = createSlug(judul)


    // Modifikasi nama file: hilangkan spasi dan tambahkan timestamp
    const timestamp = Date.now();
    const originalName = image.name.replace(/\s+/g, ""); // Hapus semua spasi
    const extension = path.extname(originalName); // Ekstensi file (.jpg, .png, dll)
    const fileName = `${path.basename(originalName, extension)}-${timestamp}${extension}`;

    // Tentukan lokasi penyimpanan file
    const filePath = path.join(process.cwd(), "/uploads/img-berita", fileName);

    // Simpan file ke server
    const namaFileDiDb = `${fileName}`
    await writeFile(filePath, Buffer.from(await image.arrayBuffer()));


    await prisma.berita.create({
        data:{
            judul: judul,
            imageUrl:namaFileDiDb,
            isi: content,
            slug: slug,
            createdAt: formatedDate
        }
    })
    revalidatePath("/");
    revalidatePath("/dashboard/berita");
    

  } catch (error) {
    console.error("gagal add berita", error.message);
  }
};