"use server";

import { prisma } from "@/lib/db";



export const getGalery = async () => {
    try {
        const galery = await prisma.galery.findMany({
            orderBy:{
                id:"desc"
            }
        })
        return galery
    } catch (error) {
        console.error("Terjadi error saat mengambil data galery dari DB", error.message)
    }
}