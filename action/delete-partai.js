"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"



export const deletePartai = async (id) => {
    if (!id) {
        return
    }
    try {
        await prisma.partai.delete({
            where:{
                id: parseInt(id)
            }
        })
        revalidatePath('/dashboard/partai')
    } catch (error) {
        console.log(`error saat menghapus partai dengan ID ${id}`, error.message)
        return false
    }
}