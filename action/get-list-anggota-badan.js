"use server";

import { prisma } from "@/lib/db";

export const listAnggotaBadan = async () => {
  try {
    // ambil semua badan ketua/wakil
    const used = await prisma.badanAnggota.findMany({
      where: {
        jabatan: { in: ["KETUA", "WAKIL"] },
      },
    });


    const usedDewanIds = used
      .map(x => x.anggotaDewanId)
      .filter(Boolean);

    const usedSetwanIds = used
      .map(x => x.pejabatSetwanId)
      .filter(Boolean);

    // Ambil dewan yang ID-nya tidak terpakai
    const dewan = await prisma.anggotaDewan.findMany({
      where: {
        id: { notIn: usedDewanIds },
      },
    });

    // Ambil setwan yang ID-nya tidak terpakai
    const setwan = await prisma.pejabatSetwan.findMany({
      where: {
        id: { notIn: usedSetwanIds },
      },
    });

    // Format data rake UI melihat dari 2 tabel
    const result = [
      ...dewan.map(d => ({
        id: d.id,
        nama: d.nama,
        source: "dewan",
      })),
      ...setwan.map(s => ({
        id: s.id,
        nama: s.nama,
        source: "setwan",
      })),
    ];

    return result;
  } catch (error) {
    console.error(
      "terjadi kesalahan saat mengambil data anggota badan",
      error
    );
    return null;
  }
};
