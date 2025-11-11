"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const saveContactInfo = async (data) => {
    try {

        await prisma.kontak.create({
            data:{
                email:data.email,
                alamat:data.alamat,
                telp:data.telp,
                instagram: data.instagram,
                facebook: data.facebook,
                twitter: data.twitter,
                youtube: data.youtube
            }
        })

        revalidatePath("/dashboard/kontak-dan-alamat")
    } catch (error) {
        console.error("terjadi kesalahan ketika mencoba menambahkan data alamat ke DB", error.message)
    }
}