"use client";

import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import DialogDeleteAnggotaDewan from "./dialog-delete-anggota-dewan";

const ProfileCard = ({ name, role, imageUrl, onEdit = ()=>{}, onDelete = ()=>{}, urlEdit, dewanId }) => {
  return (
    <div className="relative w-[210px] h-[280px] rounded-xl overflow-hidden shadow-lg group">
      {/* Foto profil penuh */}
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />

      {/* Overlay bawah */}
      <div className="absolute bottom-0 left-0 w-full p-3 flex justify-between items-end 
                      bg-black/40 backdrop-blur-md">
        {/* Nama & role */}
        <div className="text-white">
          <p className="text-sm font-semibold leading-tight">{name}</p>
          <p className="text-xs text-gray-300">{role}</p>
        </div>

        {/* Aksi */}
        <div className="flex gap-2">
          <button
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <Link href={urlEdit}>
              <Pencil size={16} className="text-white" />
            </Link>
          </button>
          <button
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <DialogDeleteAnggotaDewan namaPartai={name} idAnggotaDewan={dewanId} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

