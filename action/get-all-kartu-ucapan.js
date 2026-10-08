"use server";

import { prisma } from "@/lib/db";

export const getAllKartuUcapan = async () => {
  try {
    const listData = await prisma.kartuUcapan.findMany({
      where: {
        isShow: true,
      },
      orderBy: {
        id: "desc",
      },
    });
    return listData;
  } catch (error) {
    console.error("Gagal mengambil data kartu ucapan:", error.message);
    return []; // Mengembalikan array kosong jika terjadi error
  }
};