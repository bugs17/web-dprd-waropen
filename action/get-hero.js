"use server";

import { prisma } from "@/lib/db";


export const getHero = async () => {
    try {
        const data = await prisma.hero.findMany()
        return data
    } catch (error) {
        console.log("Terjadi kesalahan saat mengambil data hero dari DB", error.message)
        return []
    }
}