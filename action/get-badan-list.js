"use server";

import { prisma } from "@/lib/db";

export const getBadanList = async () => {
    try {
        const badans = await prisma.badan.findMany()

        return badans
    } catch (error) {
        return null
    }
}