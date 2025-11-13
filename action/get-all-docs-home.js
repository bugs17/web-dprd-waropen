"use server";

import { prisma } from "@/lib/db";


export const getAllDocumentsHome = async () => {
    try {
        const docs = await prisma.dokumen.findMany({
            orderBy:{
                id:"desc"
            },
            take: 6
        })
        return docs
    } catch (error) {
        console.error("Terjadi error saat mengambil semua dokumen", error.message)
    }
}

export const getAllDocumentsHomeByKategory = async (kategory) => {
    try {
        const docs = await prisma.dokumen.findMany({
            where:{
                jenisDokumen:kategory
            },
            orderBy:{
                id:"desc"
            },
            take: 6
        })
        return docs
    } catch (error) {
        console.error("Terjadi error saat mengambil semua dokumen", error.message)
    }
}