"use server";

import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/db";


export const addGalery = async (judul, file) => {
    try {
        if (!judul || !file) {
            throw new Error("Parameter tidak falid")
        }

    
    
    
        // Modifikasi nama file: hilangkan spasi dan tambahkan timestamp
        const timestamp = Date.now();
        const originalName = file.name.replace(/\s+/g, ""); // Hapus semua spasi
        const extension = path.extname(originalName); // Ekstensi file (.jpg, .png, dll)
        const fileName = `${path.basename(originalName, extension)}-${timestamp}${extension}`;
    
        // Tentukan lokasi penyimpanan file
        const filePath = path.join(process.cwd(), "/uploads/galery", fileName);
    
        // Simpan file ke server
        const namaFileDiDb = `${fileName}`
        await writeFile(filePath, Buffer.from(await file.arrayBuffer()));



        const newData = await prisma.galery.create({
            data:{
                judul:judul,
                imageUrl:namaFileDiDb
            }
        })

        revalidatePath("/dashboard/galery")
        return newData
    } catch (error) {
        console.error("Terjadi kesalahan saat menambahkan data ke galery di DB", error.message)
        return false
    }
}