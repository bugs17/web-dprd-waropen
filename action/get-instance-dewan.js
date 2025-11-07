"use server";

import { prisma } from "@/lib/db";

export const getAnggotaDewanById = async (id) => {
    try {
        if (id === null) {
            throw new Error("ID anggota dewan yang ingin di ambil tidak valid!")
        }

        let dewan = await prisma.anggotaDewan.findFirst({
            where:{
                id:parseInt(id)
            },
            include:{
                badan:true,
                komisi:true,
                partai:true,
                riwayatPekerjaan:true,
                riwayatPendidikan:true
            }
        })

        return dewan
        
    } catch (error) {
        console.error("Terjadi kesalahan saat mencari anggota dewan by ID", error.message)
    }
}