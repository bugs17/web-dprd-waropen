"use server";

import { prisma } from "@/lib/db";

export const getBadanList = async () => {
    try {
        const badans = await prisma.badan.findMany({
            include:{
                anggota:{
                    include:{
                        anggotaDewan:true,
                        pejabatSetwan:true
                    }
                }
            }
        })

        return badans
    } catch (error) {
        console.error("Terjadi error saat mengambil list badan", error.message)
        return null
    }
}