"use server";

import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/db";

export const addGalery = async (judul, file, thumbnailFile = null) => {
    try {
        if (!judul || !file) {
            throw new Error("Parameter tidak valid");
        }

        const timestamp = Date.now();
        
        // 1. Simpan file utama (Gambar / Video)
        const originalName = file.name.replace(/\s+/g, "");
        const extension = path.extname(originalName);
        const fileName = `${path.basename(originalName, extension)}-${timestamp}${extension}`;
        const filePath = path.join(process.cwd(), "/uploads/galery", fileName);
        await writeFile(filePath, Buffer.from(await file.arrayBuffer()));

        let thumbnailName = "-";

        // 2. Jika ada file thumbnail (khusus video), simpan juga
        if (thumbnailFile) {
            const thumbOriginalName = thumbnailFile.name.replace(/\s+/g, "");
            const thumbExt = path.extname(thumbOriginalName);
            thumbnailName = `thumb-${path.basename(thumbOriginalName, thumbExt)}-${timestamp}${thumbExt}`;
            const thumbPath = path.join(process.cwd(), "/uploads/galery", thumbnailName);
            await writeFile(thumbPath, Buffer.from(await thumbnailFile.arrayBuffer()));
        }

        const newData = await prisma.galery.create({
            data: {
                judul: judul,
                imageUrl: fileName,
                thumbnail: thumbnailName,
            }
        });

        revalidatePath("/dashboard/galery");
        return newData;
    } catch (error) {
        console.error("Terjadi kesalahan saat menambahkan data ke galery di DB", error.message);
        return false;
    }
};