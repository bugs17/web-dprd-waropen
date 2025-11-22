"use server";

import { prisma } from "@/lib/db";

export const getBadanList = async () => {
    try {
        const badans = await prisma.badan.findMany({
            include:{
            anggotaDewan:true
            },
            orderBy:{
            id:"desc"
            }
        })

        return badans
    } catch (error) {
        return null
    }
}