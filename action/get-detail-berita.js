"use server";

import { prisma } from "@/lib/db";


export const getDetailBerita = async (id) => {
    try {
        if (!id) {
            throw new Error("Parameter tidak valid")
        }
        const berita = await prisma.berita.findFirst({
                            where:{
                                id:parseInt(id)
                            }
                        })

        const beritas = await prisma.berita.findMany({
                            where:{
                                NOT:{
                                id: berita.id
                                }
                            },
                            orderBy:{
                                createdAt:'desc'
                            },
                            take: 3
                        })
        
        return {berita: berita, beritas: beritas}
    } catch (error) {
        console.error("Terjadi error saat mengambil detail berita : ",error.message )
        return {berita: null, beritas: null}
    }
}