"use server";

import { prisma } from "@/lib/db";


export const getKetua = async () => {
    try {
        const ketua = await prisma.anggotaDewan.findFirst({
            where:{
                peranDewan:"KETUA DPRK"
            }
        })

        return ketua
    } catch (error) {
        console.log("Error saat mengambil data ketua dewan dari DB", error.message)
    }
}