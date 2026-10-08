"use server";
import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/db";

export const updateHero = async (data) => {
    try {
        if (!data.id) {
            throw new Error("ID Hero tidak ditemukan untuk update");
        }

        let namaFileDiDb;
        
        if (data.file && data.file !== null) {
            const timestamp = Date.now();
            const originalName = data.file.name.replace(/\s+/g, "");
            const extension = path.extname(originalName);
            const fileName = `${path.basename(originalName, extension)}-${timestamp}${extension}`;
        
            const filePath = path.join(process.cwd(), "/uploads/hero", fileName);
            await writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));
            namaFileDiDb = fileName;
        }
    
        const updateData = {
            tagline: data.tagline,
            description: data.description,
        };
    
        if (namaFileDiDb) {
            updateData.urlImage = namaFileDiDb;
        }

        const updatedInstance = await prisma.hero.update({
            where: {
                id: parseInt(data.id),
            },
            data: updateData,
        });

        revalidatePath("/dashboard/hero-setting");
        revalidatePath("/");

        return updatedInstance;
    } catch (error) {
        console.error("Terjadi error saat update data hero", error.message);
        return null;
    }
};