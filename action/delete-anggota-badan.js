"use server";

import { prisma } from "@/lib/db";

export const deleteAnggotaBadan = async (id) => {
    try {
        if (!id) {
            throw new Error("Parameter tidak valid")
        }
        await prisma.badanAnggota.delete({
            where:{
                id:parseInt(id)
            }
        })
        return true
    } catch (error) {
        console.error("Terjadi error saat menghapus anggota badan", error.message)
        return false
    }
}