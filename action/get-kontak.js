"use server";

import { prisma } from "@/lib/db";


export const getKontak = async () => {
    try {
        const data = await prisma.kontak.findFirst()
        return data
    } catch (error) {
        console.error("Terjadi error saat mengambil data kontak", error.message)
        return null
    }
}