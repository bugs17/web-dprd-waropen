"use client";

import { Ban, Loader, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import DialogDeleteAnggotaDewan from "./dialog-delete-anggota-dewan";
import { useEffect, useState } from "react";
import { getAllAnggotaDewan } from "@/action/get-list-anggota-dewan";

const ProfileCard = ({ name, role, imageUrl, urlEdit, dewanId }) => {

  const [dewans, setDewans] = useState([])
  const [isPending, setIsPending] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllAnggotaDewan()
      if (data) {
        setDewans(data)
      }
      setIsPending(false)
    }
    fetchData()
  }, [])

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-amber-400">
        <Loader className="w-5 h-5 mr-2 animate-spin" />
        Memuat data anggota dewan...
      </div>
    )
  }

  return (
    <div className="flex flex-wrap w-full pb-6 pt-6 gap-4 justify-center">
    {dewans.length > 0 ? (
      dewans.map((d, i) => (
        
      <div key={i} className="relative w-[210px] h-[280px] rounded-xl overflow-hidden shadow-lg group">
        {/* Foto profil penuh */}
        <img
          src={`/api/anggota-dewan/image/${d.imageUrl}`}
          alt={d.nama}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Overlay bawah */}
        <div className="absolute bottom-0 left-0 w-full p-3 flex justify-between items-end 
                        bg-black/40 backdrop-blur-md">
          {/* Nama & role */}
          <div className="text-white">
            <p className="text-sm font-semibold leading-tight">{d.nama}</p>
            <p className="text-xs text-gray-300">{d.peranDewan}</p>
          </div>

          {/* Aksi */}
          <div className="flex gap-2">
            <button
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <Link href={`/dashboard/anggota-dewan/edit/${d.id}`}>
                <Pencil size={16} className="text-white" />
              </Link>
            </button>
            <button
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <DialogDeleteAnggotaDewan namaPartai={d.nama} idAnggotaDewan={d.id} />
            </button>
          </div>
        </div>
      </div>
      ))

    ) : (
        <div className="flex items-center justify-center min-h-[50vh] text-zinc-400">
          <Ban className="w-5 h-5 mr-2" />
            Belum ada data.
        </div>
    )}
    </div>
  );
};

export default ProfileCard;

