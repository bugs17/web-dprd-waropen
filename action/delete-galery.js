"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { unlink } from "fs/promises";
import path from "path";

export const deleteGalery = async (id) => {
    try {
        if (!id) {
            throw new Error("parameter id tidak valid");
        }

        // 1. Ambil data galery terlebih dahulu untuk mendapatkan nama file fisik
        const galleryItem = await prisma.galery.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!galleryItem) {
            throw new Error("Data galeri tidak ditemukan");
        }

        // 2. Hapus file utama (gambar / video) dari folder /uploads/galery jika ada
        if (galleryItem.imageUrl) {
            try {
                const mainFilePath = path.join(process.cwd(), "uploads", "galery", galleryItem.imageUrl);
                await unlink(mainFilePath);
            } catch (err) {
                console.error("Gagal menghapus file utama dari disk:", err.message);
            }
        }

        // 3. Jika ada file thumbnail dan bukan tanda default ("-"), hapus juga dari disk
        if (galleryItem.thumbnail && galleryItem.thumbnail !== "-") {
            try {
                const thumbFilePath = path.join(process.cwd(), "uploads", "galery", galleryItem.thumbnail);
                await unlink(thumbFilePath);
            } catch (err) {
                console.error("Gagal menghapus file thumbnail dari disk:", err.message);
            }
        }

        // 4. Hapus data dari database Prisma
        await prisma.galery.delete({
            where: {
                id: parseInt(id),
            },
        });

        revalidatePath("/dashboard/galery");
        return true;
        
    } catch (error) {
        console.error("Terjadi kesalahan saat menghapus galery", error.message);
        return false;
    }
};