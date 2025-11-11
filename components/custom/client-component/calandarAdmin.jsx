"use client";

import { useEffect, useState, useTransition } from "react";
import { Loader, Trash2, FileWarning, Ban } from "lucide-react";
import { getJadwalSidangs } from "@/action/get-list-jadwal-sidang";
import { addJadwalSidang } from "@/action/add-jadwal-sidang";
import { deleteJadwalSidang } from "@/action/delete-jadwal-sidang";
import { CalendarInput } from "./calandarInput";
import { TimeInput } from "./timeInput";
import toast from "react-hot-toast";

export default function JadwalSidangInputs() {
  const [judul, setJudul] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [jadwals, setJadwals] = useState([]);
  const [isPending, startTransition] = useTransition();

  // 🔹 ambil data dari database
  useEffect(() => {
    startTransition(async () => {
      const data = await getJadwalSidangs();
      if (data) {
        const sorted = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setJadwals(sorted);
      }
    });
  }, []);

  // 🔹 simpan jadwal baru
  const handleSave = async () => {
  if (!judul || !date || !time) {
    toast("Lengkapi semua field wajib (judul, tanggal, waktu)!", {
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
      duration: 3500,
    });
    return;
  }

  startTransition(async () => {
    const tanggal = new Date(
      `${date.toISOString().split("T")[0]}T${time}`
    ).toISOString();

    const payload = { judul, tanggal, lokasi, deskripsi };

    const created = await addJadwalSidang(payload);
    if (created) {
      setJadwals((prev) =>
        [...prev, created].sort((a, b) => new Date(b.date) - new Date(a.date))
      );
      setJudul("");
      setDate(null);
      setTime("");
      setLokasi("");
      setDeskripsi("");
    }
  });
};

  // 🔹 hapus jadwal
  const handleDelete = async (id) => {
    toast((t) => (
        <div className="flex flex-col gap-2">
        <span>Hapus jadwal ini?</span>
        <div className="flex justify-end gap-2">
            <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 rounded-md bg-gray-700 text-white hover:bg-gray-600"
            >
            Batal
            </button>
            <button
            onClick={async () => {
                const deleted = await deleteJadwalSidang(id);
                if (deleted) {
                setJadwals((prev) => prev.filter((j) => j.id !== id));
                }
                toast.dismiss(t.id);
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
        duration: 5000, // biar ada waktu baca sebelum auto dismiss
    });
  };

  return (
    <div className="space-y-5 p-4 rounded-lg">
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Judul Kegiatan/Agenda"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          className="border rounded-md w-full p-2"
        />

        <CalendarInput date={date} setDate={setDate} />
        <TimeInput time={time} setTime={setTime} />

        <input
          type="text"
          placeholder="Lokasi"
          value={lokasi}
          onChange={(e) => setLokasi(e.target.value)}
          className="border rounded-md w-full p-2"
        />

        <textarea
          placeholder="Deskripsi (opsional)"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          className="border rounded-md w-full p-2 h-20 resize-none"
        />

        <button
        onClick={handleSave}
        disabled={isPending}
        className={`w-full cursor-pointer py-2 rounded-md text-white flex items-center justify-center gap-2 font-medium transition-colors ${
            isPending
            ? "bg-amber-400 cursor-not-allowed"
            : "bg-amber-600 hover:bg-amber-700"
        }`}
        >
        {isPending ? (
            <>
            <Loader className="w-5 h-5 animate-spin text-white" />
            </>
        ) : (
            "Simpan Jadwal"
        )}
        </button>
      </div>

      {/* 🔹 daftar jadwal sidang */}
      <div className="border-t pt-4">
        <h3 className="font-semibold mb-2">Daftar Jadwal Kegiatan</h3>
        {isPending ? (
          <div className="flex items-center justify-center text-gray-500 py-6">
            <Loader className="w-5 h-5 text-amber-500 animate-spin mr-2" />
            Memuat data...
          </div>
        ) : jadwals.length === 0 ? (
          <p className="text-sm text-gray-500">Belum ada jadwal.</p>
        ) : (
          <ul className="space-y-2">
            {jadwals.map((j) => (
              <li
                key={j.id}
                className="flex justify-between items-center border rounded-md p-2 hover:bg-gray-800 transition-colors"
              >
                <div>
                  <p className="font-medium text-white">{j.tentang}</p>
                  <p className="text-sm text-gray-300">
                    {new Date(j.date).toLocaleString("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                    {j.lokasi && ` • ${j.lokasi}`}
                  </p>
                  {j.deskripsi && (
                    <p className="text-xs text-gray-400 mt-1">{j.deskripsi}</p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(j.id)}
                  className="text-red-400 hover:text-red-300 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
