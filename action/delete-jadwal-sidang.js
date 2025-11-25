"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";


/**
 * Hapus jadwal sidang
 */
export const deleteJadwalSidang = async (id) => {
  try {
    await prisma.jadwalSidang.delete({
      where: { id: parseInt(id) },
    });

    revalidatePath("/dashboard/jadwal-sidang");
    revalidatePath("/");
    return true;
  } catch (error) {
    console.error("❌ Gagal menghapus jadwal sidang:", error);
    return false;
  }
};
