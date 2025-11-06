"use server";

import { prisma } from "@/lib/db";

export const getPartaiList = async () => {
    try {
        const partais = await prisma.partai.findMany()

        return partais
    } catch (error) {
        return null
    }
}