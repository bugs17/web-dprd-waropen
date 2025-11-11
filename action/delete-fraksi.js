"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";


export const deleteFraksi = async (id) => {
    try {
        if (!id) {
            throw new Error("ID tidak valid")
        }

        console.log(id)

        await prisma.fraksi.delete({
            where:{
                id:id
            }
        })
        revalidatePath('/dashboard/fraksi')
        return true

    } catch (error) {
        console.log("Terjad keslahan saat menghapus data fraksi", error.message)
        return false
    }
}