"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";




export const deleteAnggotaDewan = async (id) => {
    
    try {
        if (!id) {
            throw new Error("ID anggota dewan yang ingin di hapus tidak valid")
        }

        await prisma.anggotaDewan.delete({
            where:{
                id:parseInt(id)
            }
        })

        revalidatePath("/dashboard/anggota-dewan")
        return true
        
    } catch (error) {
        console.error("Terjadi Error saat mencoba menghapus anggota dewan", error.message)
        return false
    }
}