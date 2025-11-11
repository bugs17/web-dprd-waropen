"use server";

import { prisma } from "@/lib/db";

export const getContactInfo = async () => {
    try {
        const kontak = await prisma.kontak.findFirst()
        return kontak
    } catch (error) {
        console.error("Terjadi Error saat mencoba mengambil data Kontak dari DB", error.message)
        return null
    }
}