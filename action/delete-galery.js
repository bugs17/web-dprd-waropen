"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";


export const deleteGalery = async (id) => {
    try {
        if (!id) {
            throw new Error("parameter id tidak valid")
        }

        await prisma.galery.delete({
            where:{
                id:parseInt(id)
            }
        })
        revalidatePath("/dashboard/galery")
        return true
        
    } catch (error) {
        console.error("Terjadi kesalahan saat menghapus galery", error.message)
        return false
    }
}