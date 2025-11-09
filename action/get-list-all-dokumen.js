"use server";

import { prisma } from "@/lib/db";


export const getAllDocuments = async () => {
    try {
        const docs = await prisma.dokumen.findMany()
        return docs
    } catch (error) {
        console.error("Terjadi error saat mengambil semua dokumen", error.message)
    }
}