"use server";
import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/db";

export const createHero = async (data) => {
    try {
        if (!data.file) {
            throw new Error("Parameter tidak valid");
        }

        const timestamp = Date.now();
        const originalName = data.file.name.replace(/\s+/g, "");
        const extension = path.extname(originalName);
        const fileName = `${path.basename(originalName, extension)}-${timestamp}${extension}`;
    
        const filePath = path.join(process.cwd(), "/uploads/hero", fileName);
        await writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));
    
        const newInstance = await prisma.hero.create({
            data: {
                urlImage: fileName,
            },
        });

        revalidatePath("/dashboard/hero-setting");
        revalidatePath("/");

        return newInstance;
    } catch (error) {
        console.error("Terjadi error saat create data hero", error.message);
        return null;
    }
};