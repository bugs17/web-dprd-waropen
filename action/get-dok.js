"use server";

import { prisma } from "@/lib/db";


export const getDok = async (kategory) => {
    try {
        let data;
        if (kategory === 'keuangan') {
                data = await prisma.dokumen.findMany({
                    where:{
                        jenisDokumen:'Laporan Keuangan DPRK'
                    },
                    orderBy:{
                        id:"desc"
                    }
            })
        }else if (kategory === 'publikasi') {
            data = await prisma.dokumen.findMany({
                    where:{
                        jenisDokumen:'Dokumen Publikasi'
                    },
                    orderBy:{
                        id:"desc"
                    }
            })
        }else if (kategory === 'renstra') {
            data = await prisma.dokumen.findMany({
                    where:{
                        jenisDokumen:'Rencana Strategis DPRK'
                    },
                    orderBy:{
                        id:"desc"
                    }
            })
        }else if (kategory === 'hukum') {
            data = await prisma.dokumen.findMany({
                    where:{
                        jenisDokumen:'Produk Hukum'
                    },
                    orderBy:{
                        id:"desc"
                    }
            })
            
        }
        return data
    } catch (error) {
        console.error("Terjadi error saat mengambil data laporan keuangan", error.message)
        return null
    }
}