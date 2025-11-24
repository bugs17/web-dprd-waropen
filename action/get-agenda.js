"use server";

import { prisma } from "@/lib/db";



export const getAgendaList = async () => {
    try {
        const data = await prisma.jadwalSidang.findMany()
        return data
    } catch (error) {
        console.log("Terjadi error saat mengambil data agenda", error.message)
        return null
    }
}