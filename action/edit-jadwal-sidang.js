"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

/**
 * Update jadwal sidang
 */
export const updateJadwalSidang = async (data) => {
  try {
    const updatedEvent = await prisma.jadwalSidang.update({
      where: { id: parseInt(data.id) },
      data: {
        title: data.title,
        description: data.description,
        start: data.start,
        end: data.end,
      },
    });

    revalidatePath("/dashboard/jadwal-sidang");
    return updatedEvent;
  } catch (error) {
    console.error("❌ Gagal update jadwal sidang:", error);
    return null;
  }
};