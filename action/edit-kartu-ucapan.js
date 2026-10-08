"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

export const toggleKartuUcapan = async (id, currentStatus) => {
  try {
    await prisma.kartuUcapan.update({
      where: { id },
      data: { isShow: !currentStatus },
    });

    revalidatePath("/");
    revalidatePath("/dashboard/kartu-ucapan");
  } catch (error) {
    console.error("Gagal mengubah status kartu ucapan:", error.message);
    throw new Error("Gagal mengubah status");
  }
};