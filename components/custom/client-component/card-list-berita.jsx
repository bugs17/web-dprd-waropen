'use client'

import { Ban, Construction, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { truncateHtml } from '@/lib/trunc-kalimat'
import toast from 'react-hot-toast'
import { deleteBerita } from '@/action/delet-berita'
import { useEffect, useRef, useState } from 'react'
import { getBerita } from '@/action/get-berita'

export default function NewsList() {

    const [news, setNews] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const loaderRef = useRef(null)

    // ✅ Load initial berita pertama kali
    useEffect(() => {
        const loadInitial = async () => {
        setIsLoading(true)
        const initial = await getBerita(null)
        setNews(initial)
        if (initial.length < 5) setHasMore(false)
        setIsLoading(false)
        }
        loadInitial()
    }, [])

    // ✅ Infinite Scroll Observer
    useEffect(() => {
        if (!loaderRef.current || isLoading || !hasMore) return

        const observer = new IntersectionObserver(async (entries) => {
        const first = entries[0]
        if (first.isIntersecting && !isLoading && hasMore) {
            setIsLoading(true)
            const last = news[news.length - 1]
            const moreNews = await getBerita(last?.id)
            if (moreNews.length === 0) setHasMore(false)
            else setNews((prev) => [...prev, ...moreNews])
            setIsLoading(false)
        }
        })

        observer.observe(loaderRef.current)
        return () => observer.disconnect()
    }, [news, isLoading, hasMore])


    const handleDeleteList = (id, judulBerita) => {
        // tampilkan confirm toast UI
        toast((t) => (
            <div className="flex flex-col gap-2">
            <span>Hapus Berita ini?</span>
            <span className="text-red-500">{judulBerita}</span>
            <div className="flex justify-end gap-2">
                <button
                onClick={() => toast.dismiss(t.id)}
                className="px-3 py-1 rounded-md bg-gray-700 text-white hover:bg-gray-600"
                >
                Batal
                </button>

                <button
                onClick={async () => {
                    // optimis: simpan snapshot dan remove dari UI dulu
                    toast.dismiss(t.id)
                    const snapshot = news
                    setNews((prev) => prev.filter((n) => n.id !== id))

                    try {
                    const deleted = await deleteBerita(id) // server action
                        if (deleted) {
                            toast('Berita Berhasil Dihapus', {
                            icon: <Trash2 className="text-red-500" />,
                            style: {
                                borderRadius: "12px",
                                background: "linear-gradient(135deg, #1a1a1a, #2a2a2a)",
                                color: "#f5f5f5",
                                border: "1px solid #3a3a3a",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                                padding: "14px 18px",
                                fontSize: "14px",
                                fontWeight: 500,
                            },
                            duration: 2000,
                            })

                            // jika setelah delete jumlah elements jadi lebih kecil dari page size,
                            // kamu bisa opsi untuk fetch more untuk mengisi (optional)
                            // if (news.length <= PAGE_SIZE && hasMore) { fetchMore() }
                        } else {
                            // rollback UI kalau delete gagal
                            setNews(snapshot)
                            toast('Gagal menghapus berita', {
                            icon: <Ban className="text-red-500" />,
                            style: {
                                borderRadius: "12px",
                                background: "linear-gradient(135deg, #1a1a1a, #2a2a2a)",
                                color: "#f5f5f5",
                                border: "1px solid #3a3a3a",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                                padding: "14px 18px",
                                fontSize: "14px",
                                fontWeight: 500,
                            },
                        })
                        }
                    } catch (err) {
                        console.error('delete error', err)
                        setNews(snapshot)
                        toast('Terjadi kesalahan saat hapus', {
                            icon: <Ban className="text-red-500" />,
                            style: {
                                borderRadius: "12px",
                                background: "linear-gradient(135deg, #1a1a1a, #2a2a2a)",
                                color: "#f5f5f5",
                                border: "1px solid #3a3a3a",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                                padding: "14px 18px",
                                fontSize: "14px",
                                fontWeight: 500,
                            },
                        })
                    }
                }}
                className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 flex items-center gap-1"
                >
                <Trash2 className="w-4 h-4" /> Hapus
                </button>
            </div>
            </div>
        ), {
            icon: null,
            style: {
            borderRadius: "12px",
            background: "linear-gradient(135deg, #1a1a1a, #2a2a2a)",
            color: "#f5f5f5",
            border: "1px solid #3a3a3a",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            padding: "14px 18px",
            fontSize: "14px",
            fontWeight: 500,
            },
            duration: 5000,
        })
        }



  return (
    <div className="space-y-4">
      {news.length === 0 && !isLoading ? (
        <div className="text-center flex flex-row gap-3 justify-center items-center text-sm text-zinc-500 py-8">
          <Construction />
          Belum ada berita yang ditambahkan.
        </div>
      ) : (
        news.map((item) => (
          <div
            key={item.id}
            className="bg-muted/50 rounded-xl flex items-center justify-between p-4 border border-zinc-800 hover:border-zinc-500 hover:bg-muted/70 transition"
          >
            {/* Gambar kiri */}
            <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 border border-zinc-700">
              <img
                src={`/api/berita/image/${item.imageUrl}`}
                alt={item.judul}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Konten tengah */}
            <div className="flex-1 px-4 overflow-hidden">
              <Link
                href={`/berita/${item.slug}`}
                target="_blank"
                className="text-base hover:text-amber-400 font-semibold text-zinc-100 truncate"
              >
                {item.judul}
              </Link>
              <p
                className="text-sm text-zinc-400 mt-1 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: truncateHtml(item.isi, 20) }}
              />
              <p className="text-xs text-zinc-500 mt-2">
                {new Date(item.createdAt).toLocaleDateString('id-ID', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>

            {/* Aksi kanan */}
            <div className="flex flex-col gap-4">
              <Link href={`/dashboard/berita/edit/${item.slug}`}>
                <Edit className="text-amber-500 hover:text-amber-400 cursor-pointer" size={16} />
              </Link>
              <Trash2
                onClick={() => handleDeleteList(item.id, item.judul)}
                className="text-red-500 hover:text-red-400 cursor-pointer"
                size={16}
              />
            </div>
          </div>
        ))
      )}

      {hasMore && (
        <div ref={loaderRef} className="flex justify-center py-6 text-zinc-500 text-sm">
          {isLoading ? 'Memuat berita...' : 'Scroll untuk memuat lebih banyak'}
        </div>
      )}
    </div>
  )
}
