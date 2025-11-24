"use server";

import { prisma } from "@/lib/db";


export const getAllFraksi = async () => {
    try {
        const datas = await prisma.fraksi.findMany({
            include:{
                partai:{
                    include:{
                        anggotaDewan:true
                    }
                }
            }
        })
        return datas
    } catch (error) {
        console.error("Terjadi kesalahan saat get list fraksi", error.message)
    }
}