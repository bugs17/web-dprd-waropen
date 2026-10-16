"use server";

import { prisma } from "@/lib/db";

export const listAnggotaBadan = async () => {
  try {
    // Ambil semua data dewan dan setwan secara langsung tanpa filter
    const dewan = await prisma.anggotaDewan.findMany();
    const setwan = await prisma.pejabatSetwan.findMany();

    // Format data agar seragam untuk UI dari 2 tabel
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