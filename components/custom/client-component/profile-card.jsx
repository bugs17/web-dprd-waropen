"use client";

import { Ban, Loader, Pencil } from "lucide-react";
import Link from "next/link";
import DialogDeleteAnggotaDewan from "./dialog-delete-anggota-dewan";
import { useEffect, useState } from "react";
import { getAllAnggotaDewan } from "@/action/get-list-anggota-dewan";

// rank jabatan
const getRank = (jabatan) => {
  const lower = jabatan.toLowerCase();

  if (lower === "ketua dprk") return 1;

  if (lower === "wakil ketua i") return 2;
  if (lower === "wakil ketua ii") return 3;
  if (lower === "wakil ketua iii") return 4;

  if (lower.startsWith("ketua komisi")) return 5;
  if (lower.startsWith("wakil ketua komisi")) return 6;

  if (lower.startsWith("anggota")) return 7;

  return 999;
};

// sorting tanpa mutasi array asli
const sortAnggotaDewan = (list) => {
  return [...list].sort((a, b) => getRank(a.peranDewan) - getRank(b.peranDewan));
};

const ProfileCard = () => {
  const [dewans, setDewans] = useState([]);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllAnggotaDewan();
      if (data) {
        const sorted = sortAnggotaDewan(data);
        setDewans(sorted);
      }
      setIsPending(false);
    };

    fetchData();
  }, []);

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-amber-400">
        <Loader className="w-5 h-5 mr-2 animate-spin" />
        Memuat data anggota dewan...
      </div>
    );
  }

  return (
    <div className="flex flex-wrap w-full pb-6 pt-6 gap-4 justify-center">
      {dewans.length > 0 ? (
        dewans.map((d) => (
          <div
            key={d.id}
            className="relative w-[210px] h-[280px] rounded-xl overflow-hidden shadow-lg group"
          >
            {/* Foto profil */}
            <img
              src={`/api/anggota-dewan/image/${d.imageUrl}`}
              alt={d.nama}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Overlay */}
            <div
              className="absolute bottom-0 left-0 w-full p-3 flex justify-between items-end 
                          bg-black/40 backdrop-blur-md"
            >
              <div className="text-white">
                <p className="text-sm font-semibold leading-tight">{d.nama}</p>
                <p className="text-xs text-gray-300">{d.peranDewan}</p>
              </div>

              <div className="flex gap-2">
                <button className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition">
                  <Link href={`/dashboard/anggota-dewan/edit/${d.id}`}>
                    <Pencil size={16} className="text-white" />
                  </Link>
                </button>
                <button className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition">
                  <DialogDeleteAnggotaDewan
                    namaPartai={d.nama}
                    idAnggotaDewan={d.id}
                  />
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
