"use server";

import { prisma } from "@/lib/db";


export const getJadwalSidangs = async () => {
    try {
        const sidangs = await prisma.jadwalSidang.findMany()

        return sidangs
    } catch (error) {
        console.error("Terjadi kesalahan saat mengambil list jadwal sidang", error.message)
    }
}