"use server";

import { prisma } from "@/lib/db";

export const addAnggotaBadan = async (badanId, jabatan, anggotaId, source, nama ) => {
    try {
        if (!badanId || !jabatan || !anggotaId || !source, !nama) {
            throw new Error("Parameter tidak sesuai")
        }

        await prisma.badanAnggota.create({
            data:{
                badanId:parseInt(badanId),
                jabatan:jabatan,
                nama:nama,
                anggotaDewanId: source === "dewan" ? anggotaId : null,
                pejabatSetwanId: source === "setwan" ? anggotaId : null
            }
        })
        return true

    } catch (error) {
        console.error("Terjadi error saat melakukan add anggota badan", error.message)
        return false
    }
}