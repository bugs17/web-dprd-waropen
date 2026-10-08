"use server";
import { revalidatePath } from "next/cache";
import { unlink } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/db";

export const deleteHero = async (id) => {
    try {
        const hero = await prisma.hero.findUnique({
            where: { id: parseInt(id) },
        });

        if (!hero) {
            throw new Error("Data hero tidak ditemukan");
        }

        // Hapus file fisik jika ada
        if (hero.urlImage) {
            try {
                const filePath = path.join(process.cwd(), "/uploads/hero", hero.urlImage);
                await unlink(filePath);
            } catch (e) {
                console.warn("File fisik tidak ditemukan:", e.message);
            }
        }

        await prisma.hero.delete({
            where: { id: parseInt(id) },
        });

        revalidatePath("/dashboard/hero-setting");
        revalidatePath("/");
        return true;
    } catch (error) {
        console.error("Gagal menghapus hero:", error.message);
        return false;
    }
};