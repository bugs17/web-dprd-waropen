"use server";

import { prisma } from "@/lib/db";

export const getBadanListGrouped = async () => {
    try {
    const badans = await prisma.badan.findMany({
        include: {
            anggota: {
                include: {
                    anggotaDewan: true,
                    pejabatSetwan: true
                }
            }
        }
    });

    const result = badans.map((badan) => {
    const anggotaFormatted = badan.anggota.map((a) => {
        // Tentukan sumber data
        let source = "manual";
        let profile = null;
        let nama = a.namaManual || "-";

        // Jika dari tabel AnggotaDewan
        if (a.anggotaDewan) {
            source = "dewan";
            profile = a.anggotaDewan;
            nama = a.anggotaDewan.nama;
        }

        // Jika dari tabel Setwan
        if (a.pejabatSetwan) {
            source = "setwan";
            profile = a.pejabatSetwan;
            nama = a.pejabatSetwan.nama;
        }

        return {
            id: a.id,
            nama,
            jabatan: a.jabatan,
            source,
            profile
        };
    });

        return {
            id: badan.id,
            nama: badan.nama,
            deskripsi: badan.deskripsi,
            tahunPeriode: badan.tahunPeriode,
            anggota: anggotaFormatted
        };
    });

        return result;

    } catch (error) {
        console.error("Error getBadanListGrouped:", error.message);
        return [];
    }
};
