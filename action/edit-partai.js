"use server";
import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/db";

export const editPartai = async (namaPartai, image, idPartai) => {
  try {

    let namaFileDiDb = null; 
    if (image) {
      
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
      namaFileDiDb = `${fileName}`
      await writeFile(filePath, Buffer.from(await image.arrayBuffer()));
    }



    await prisma.partai.update({
      where:{
        id:parseInt(idPartai)
        },
      data:{
            nama: namaPartai,
            ...(namaFileDiDb && { imageUrl: namaFileDiDb }),
        }
    })
    revalidatePath("/");
    revalidatePath("/dashboard/partai");
    

  } catch (error) {
    console.error("gagal add partai", error.message);
  }
};