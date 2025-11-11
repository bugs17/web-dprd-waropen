"use server";

const { prisma } = require("@/lib/db");
const { revalidatePath } = require("next/cache");


export const addFraksi = async (nama) => {
    try {
        if (!nama) {
            throw new Error("Parameter tidak valid");
        }

        const newfraksi = await prisma.fraksi.create({
            data:{
                nama:nama
            },
            include:{
                partai:true
            }
        })

        revalidatePath('/dashboard/fraksi')
        return newfraksi

    } catch (error) {
        console.error("Terjadi error saat add data fraksi ke DB", error.message)
        return false
    }
}