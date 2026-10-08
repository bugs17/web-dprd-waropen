"use server";
import { revalidatePath } from "next/cache";
import { unlink } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/db";

export const deleteKartuUcapan = async (id) => {
  try {
    // 1. Ambil data kartu ucapan berdasarkan ID untuk mendapatkan nama file gambar
    const kartu = await prisma.kartuUcapan.findUnique({
      where: { id },
    });

    if (!kartu) {
      throw new Error("Data kartu ucapan tidak ditemukan");
    }

    // 2. Hapus file fisik dari folder penyimpanan (jika filenya ada/bukan default)
    if (kartu.urlImage && kartu.urlImage !== "-") {
      try {
        const filePath = path.join(process.cwd(), "/uploads/kartu-ucapan", kartu.urlImage);
        await unlink(filePath);
      } catch (fileError) {
        console.warn("File fisik tidak ditemukan atau sudah terhapus:", fileError.message);
      }
    }

    // 3. Hapus data dari database menggunakan Prisma
    await prisma.kartuUcapan.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/dashboard/kartu-ucapan");
  } catch (error) {
    console.error("Gagal menghapus kartu ucapan:", error.message);
    throw new Error("Gagal menghapus kartu ucapan");
  }
};