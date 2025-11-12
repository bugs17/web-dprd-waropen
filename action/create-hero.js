"use server";
import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/db";

export const createHero = async (data) => {
    try {
        console.log(data)
        if (!data.tagline || !data.description || !data.file) {
            throw new Error("Parameter tidak valid")
        }
        // Modifikasi nama file: hilangkan spasi dan tambahkan timestamp
        const timestamp = Date.now();
        const originalName = data.file?.name.replace(/\s+/g, ""); // Hapus semua spasi
        const extension = path.extname(originalName); // Ekstensi file (.jpg, .png, dll)
        const fileName = `${path.basename(originalName, extension)}-${timestamp}${extension}`;
    
        // Tentukan lokasi penyimpanan file
        const filePath = path.join(process.cwd(), "/uploads/hero", fileName);
    
        // Simpan file ke server
        const namaFileDiDb = `${fileName}`
        await writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));
    
        const newdata = {
            tagline: data.tagline,
            description: data.description,
        }
    
        if (data.file !== null) {
            newdata.urlImage = namaFileDiDb
        }


        const newInstance = await prisma.hero.create({
            data:newdata
        })

        revalidatePath("/dashboard/hero-setting")
        revalidatePath("/")

        return newInstance

    } catch (error) {
        console.error("Terjadi error saat create data hero", error.message)
        return null
    }
}