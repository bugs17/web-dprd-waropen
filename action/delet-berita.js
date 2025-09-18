"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"



export const deleteBerita = async (id) => {
    if (!id) {
        return false
    }
    try {
        await prisma.berita.delete({
            where:{
                id: parseInt(id)
            }
        })
        revalidatePath('/dashboard/berita')
        return true
    } catch (error) {
        console.log("error saat berita", error.message)
        return false
    }
}