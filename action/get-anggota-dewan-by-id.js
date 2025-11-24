"use server";

const { prisma } = require("@/lib/db");


export const getAnggotaDewanById = async (id) => {
    try {
        if (!id) {
            throw new Error("Parameter tidak valid")
        }
        const dewan = await prisma.anggotaDewan.findFirst({
            where:{
                id:parseInt(id),
            },
            
            include:{
                riwayatPekerjaan:true,
                riwayatPendidikan:true,
                partai:{
                    include:{
                        fraksi:true
                    }
                },
                komisi:true,
                badanAnggota:{
                    include:{
                        badan:true
                    }
                }
            }
        })
        return dewan
    } catch (error) {
        console.error("Terjadi error saat melakukan pengambilan instance anggota dewan by id", error.message)
        return null
    }
}