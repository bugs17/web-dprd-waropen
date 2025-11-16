"use server";

import { prisma } from "@/lib/db";

export async function getBeritaInfinite({ search = "", page = 1, limit = 6 }) {
  const skip = (page - 1) * limit;

  const items = await prisma.berita.findMany({
    where: {
      judul: {
        contains: search || "",
        // mode: "insensitive",
      },
    },
    orderBy: { createdAt: "desc" },
    skip,
    take: limit,
  });

  return items;
}
