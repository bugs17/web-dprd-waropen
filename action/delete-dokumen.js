"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deleteDocument = async (id) => {
    try {
        if (!id) {
            throw new Error("ID tidak valid!")
        }

        await prisma.dokumen.delete({
            where:{
                id:parseInt(id)
            }
        })

        revalidatePath('/dashboard/docs')
        return true

    } catch (error) {
        console.error("Terjadi error saar mencoba menghapus Dokumen", error.message)
        return false
    }
}