"use server";

import { prisma } from "@/lib/db";


export const getAllAnggotaDewan = async () => {
    try {
        const data = await prisma.anggotaDewan.findMany({
            orderBy:{
                id:"desc"
            }
        })
        return data
    } catch (error) {
        console.error("Error saat mengambil list anggota dewan", error.message)
    }
}