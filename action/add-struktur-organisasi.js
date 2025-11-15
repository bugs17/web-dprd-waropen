"use server";
import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/db";

export const addStruktur = async (file) => {
    try {
        if (!file) {
            throw new Error("Parameter file tidak valid")
        }


        // Modifikasi nama file: hilangkan spasi dan tambahkan timestamp
        const timestamp = Date.now();
        const originalName = file.name.replace(/\s+/g, ""); // Hapus semua spasi
        const extension = path.extname(originalName); // Ekstensi file (.jpg, .png, dll)
        const fileName = `${path.basename(originalName, extension)}-${timestamp}${extension}`;
    
        // Tentukan lokasi penyimpanan file
        const filePath = path.join(process.cwd(), "/uploads/struktur", fileName);
    
        // Simpan file ke server
        const namaFileDiDb = `${fileName}`
        await writeFile(filePath, Buffer.from(await file.arrayBuffer()));



        const newData = await prisma.setwan.create({
            data:{
                urlImageStrukturOrganisasi:namaFileDiDb
            }
        })

        revalidatePath("/dashboard/struktur-setwan")
        return newData
    } catch (error) {
        console.error("Terjadi error saat add data struktur organisasi", error.message)
    }
}