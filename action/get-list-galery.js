"use server";

import { prisma } from "@/lib/db";

export const getListGalery = async () => {
    try {
        const data = await prisma.galery.findMany({
            orderBy:{
                id:"desc"
            }
        })
        return data
    } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data galery", error.message)
    }
}