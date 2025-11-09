"use server";
import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/db";


export const addDocument = async (nama, kategori, file) => {

    try {
        if (!file || typeof file !== "object") {
            throw new Error("File Document tidak valid");
        }
    
        // Modifikasi nama file: hilangkan spasi dan tambahkan timestamp
        const timestamp = Date.now();
        const originalName = file.name.replace(/\s+/g, ""); // Hapus semua spasi
        const extension = path.extname(originalName); // Ekstensi file (.jpg, .png, dll)
        const fileName = `${path.basename(originalName, extension)}-${timestamp}${extension}`;
    
        // Tentukan lokasi penyimpanan file
        const filePath = path.join(process.cwd(), "/uploads/file-document", fileName);
    
        // Simpan file ke server
        const namaFileDiDb = `${fileName}`
        await writeFile(filePath, Buffer.from(await file.arrayBuffer()));


        const newInstance = await prisma.dokumen.create({
            data:{
                namaDokumen:nama,
                jenisDokumen:kategori,
                urlDokumen:namaFileDiDb
            }
        })

        revalidatePath('/dashboard/docs')
        return newInstance

    } catch (error) {
        console.error("Terjadi kesalahan saat menambahkan file ke DB", error.message)
    }

}