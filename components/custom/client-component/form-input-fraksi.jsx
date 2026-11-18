"use client";

import { addFraksi } from "@/action/add-fraksi";
import { deleteFraksi } from "@/action/delete-fraksi";
import { getAllFraksi } from "@/action/get-list-fraksi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Award, Ban, ClipboardCheck, FileText, Layers, Loader, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import toast from "react-hot-toast";



function DocItem({ name, jumlahAnggota, handleDeleteList }) {


  return (
    <div className="w-full flex items-center justify-between bg-app-surface text-app-ink border border-app-line px-4 py-2 rounded-2xl shadow-sm hover:border-app-gold hover:bg-muted transition-colors">
        {/* Kiri: Icon file + info */}
        <div className="flex items-center gap-3">
            <Award className="text-amber-400" size={24} />
            <div>
            <p className="text-sm font-medium text-app-ink">{name}</p>
            <p className="text-xs text-app-muted capitalize">Total Partai: {jumlahAnggota}</p>
            </div>
        </div>

        {/* Kanan: Aksi */}
        <div className="flex items-center gap-3">
            <button
                onClick={handleDeleteList}
                className="p-2 rounded-lg hover:bg-muted transition"
                title="Delete"
                >
                <Trash2 size={18} className="text-red-400 cursor-pointer" />
            </button>
        </div>
    </div>
  );
}

const FormInputFraksi = () => {
    const [isPending, startTransition] = useTransition()
    const [nama, setNama] = useState()
    const [fraksis, setFraksis] = useState([])
    const refInput = useRef(null)


    useEffect(() => {
        startTransition(async () => {
            const data = await getAllFraksi();
            if (data) {
                const sorted = data.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setFraksis(sorted);
            }
            });
    }, [])
    

    const handleSubmit = () => {
        if (!nama) {
            toast('Isi nama fraksi dulu!',
                    {
                        icon: <Ban className="text-red-500" />,
                        style: {
                            borderRadius: "12px",
                            background: "var(--app-surface)",
                            color: "var(--app-ink)",
                            border: "1px solid var(--app-line)",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                            padding: "14px 18px",
                            fontSize: "14px",
                            fontWeight: 500,
                            },
                        duration: 2500,
                    }
                );
            return;
        }

        startTransition(async() => {
            const created = await addFraksi(nama)
                    setFraksis((prev) =>
                        [...prev, created].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    );
                    setNama("")
                    refInput.current.value = ""
        })
        
    }

    const handleDeleteList = async (id, namaDokumen) => {
        toast((t) => (
            <div className="flex flex-col gap-2">
            <span>Hapus Fraksi ini? {namaDokumen}</span>
            <span>Aksi ini akan membuat partai yang terkait menjadi tidak memiliki FRAKSI.</span>
            <div className="flex justify-end gap-2">
                <button
                onClick={() => toast.dismiss(t.id)}
                className="px-3 py-1 rounded-md bg-zinc-200 text-zinc-900 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-600"
                >
                Batal
                </button>
                    <button
                    onClick={async () => {
                        const deleted = await deleteFraksi(id);
                        if (deleted) {
                        setFraksis((prev) => prev.filter((j) => j.id !== id));
                        toast('Fraksi Berhasil Dihapus',
                                {
                                    icon: <Trash2 className="text-red-500" />,
                                    style: {
                                        borderRadius: "12px",
                                        background: "var(--app-surface)",
                                        color: "var(--app-ink)",
                                        border: "1px solid var(--app-line)",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                                        padding: "14px 18px",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        },
                                    duration: 2000,
                                }
                            );
                        }
                        toast.dismiss(t.id);
                    }}
                    className="px-3 py-1 rounded-md bg-red-500 text-app-ink hover:bg-red-600 flex items-center gap-1"
                    >
                    <Trash2 className="w-4 h-4" /> Hapus
                </button>
            </div>
            </div>
        ), {
            icon: null,
            style: {
            borderRadius: "12px",
            background: "var(--app-surface)",
            color: "var(--app-ink)",
            border: "1px solid var(--app-line)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            padding: "14px 18px",
            fontSize: "14px",
            fontWeight: 500,
            },
            duration: 5000, // biar ada waktu baca sebelum auto dismiss
        });
    };


    return (
            <div className="flex flex-row justify-center gap-4">
                <div className="flex w-[60%] flex-col gap-6 mt-8">
                {/* Input Nama File */}
                    <div className="flex flex-col gap-3 w-full">
                        <Label htmlFor="NamaFraksi">Nama Fraksi<span className="text-red-500"> *</span></Label>
                        <Input ref={refInput} onChange={(e) => setNama(e.target.value)} id="NamaFraksi" type="text" placeholder="Nama Fraksi" />
                    </div>
                    
                    {/* Tombol Submit */}
                    <button
                        disabled={isPending}
                        onClick={handleSubmit}
                        className={`w-full py-2 rounded-md text-app-ink flex items-center justify-center gap-2 font-medium transition-colors ${
                            isPending
                            ? "bg-neutral-500 cursor-not-allowed"
                            : "bg-amber-600 hover:bg-amber-700 cursor-pointer"
                        }`}
                    >
                        {isPending ? (
                            <>
                                <Loader className="w-5 h-5 text-app-ink animate-spin mr-2" />
                            </>
                        )
                        :
                        (<>
                            Simpan
                        </>)
                        }
                    </button>
                </div>

                <div className="flex w-[40%]  flex-col gap-3 mt-13 rounded-2xl max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
                                
                    {isPending ? 
                    (<div className="flex items-center justify-center text-gray-500 py-6">
                        <Loader className="w-5 h-5 text-amber-500 animate-spin mr-2" />
                        Memuat data...
                    </div>)
                    :
                    (fraksis.length > 0 ? 
                        fraksis.map((p, i) => (
                            <DocItem key={i} name={p.nama}  jumlahAnggota={p.partai.length} handleDeleteList={() => handleDeleteList(p.id, p.nama)} />
                        ))
                    :
                        <p className="text-sm text-gray-500 text-center">Belum ada fraksi yang di tambahkan.</p>
                    )
                    }
                </div>
            </div>
    )
}

export default FormInputFraksi