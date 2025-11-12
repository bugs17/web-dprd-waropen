'use server'

import { prisma } from '@/lib/db'

export async function getBerita(cursor) {
  const LIMIT = 5 // jumlah per batch

  const beritas = await prisma.berita.findMany({
    take: LIMIT,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { id: 'desc' },
  })

  return beritas
}
