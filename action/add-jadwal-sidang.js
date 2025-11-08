"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

/**
 * Tambah jadwal sidang baru
 */
export const addJadwalSidang = async (data) => {
  try {
    const newEvent = await prisma.jadwalSidang.create({
      data: {
        tentang: data.judul,
        date:data.tanggal,
        lokasi:data.lokasi,
        deskripsi:data.deskripsi
      },
    });

    revalidatePath("/dashboard/jadwal-sidang");
    return newEvent;
  } catch (error) {
    console.error("❌ Gagal menambah jadwal sidang:", error);
    return null;
  }
};
