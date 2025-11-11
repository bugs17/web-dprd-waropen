"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useTransition, useRef, useEffect } from "react";
import BadanDropdown from "./dropdown-badan";
import { FileText, Download, Trash2, Upload, AlertCircle, Ban, Loader, Check } from "lucide-react";
import toast from "react-hot-toast";
import { getAllDocuments } from "@/action/get-list-all-dokumen";
import { addDocument } from "@/action/add-dokumen";
import Link from "next/link";
import { deleteDocument } from "@/action/delete-dokumen";



function FileDrop({ onFileSelect, value }) {
  const [fileName, setFileName] = useState(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    if (!file) return false;
    const isPDF = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPDF) {
      setError("Hanya file PDF yang diizinkan.");
      setFileName(null);
      return false;
    }
    setError("");
    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (validateFile(file)) {
      setFileName(file.name);
      onFileSelect?.(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (validateFile(file)) {
      setFileName(file.name);
      onFileSelect?.(file);
    }
  };

  // 🔹 reset input ketika value (file dari parent) diubah ke null
  useEffect(() => {
    if (!value) {
      setFileName(null);
      setError("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [value]);

  return (
    <div
      className={`flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-2xl transition-colors cursor-pointer 
      ${isDragging ? "border-amber-500 bg-neutral-800/50" : "border-neutral-700 bg-neutral-900/50 hover:border-amber-400"}`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current.click()}
    >
      <input
        type="file"
        accept=".pdf"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {fileName ? (
        <div className="flex items-center gap-2 text-gray-200">
          <FileText size={20} className="text-amber-400" />
          <span className="text-sm truncate max-w-[220px]">{fileName}</span>
        </div>
      ) : (
        <div className="flex flex-col items-center text-gray-400 select-none">
          <Upload size={28} className="text-amber-400 mb-2" />
          <p className="text-sm">
            Tarik file PDF ke sini atau{" "}
            <span className="text-amber-400">klik untuk memilih</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">(Hanya mendukung file PDF)</p>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-red-400 text-sm mt-3">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}


function DocItem({ name, category, urlFile, onDelete }) {


  return (
    <div className="w-full flex items-center justify-between bg-neutral-800 text-gray-100 px-4 py-3 rounded-2xl shadow-md hover:bg-neutral-700 transition-colors">
      {/* Kiri: Icon file + info */}
      <div className="flex items-center gap-3">
        <FileText className="text-amber-400" size={24} />
        <div>
          <p className="text-sm font-medium text-white">{name}</p>
          <p className="text-xs text-gray-400 capitalize">{category}</p>
        </div>
      </div>

      {/* Kanan: Aksi */}
      <div className="flex items-center gap-3">
        <Link href={urlFile}
          className="p-2 rounded-lg hover:bg-neutral-700 transition"
          title="Download"
          download
        >
          <Download size={18} className="text-green-400 cursor-pointer" />
        </Link>

        <button
            onClick={onDelete}
            className="p-2 rounded-lg hover:bg-neutral-700 transition"
            title="Delete"
            >
            <Trash2 size={18} className="text-red-400 cursor-pointer" />
        </button>
      </div>
    </div>
  );
}


export default function FileUploader() {
    const [fileName, setFileName] = useState("");
    const [files, setFiles] = useState([]);
    const [category, setCategory] = useState("");
    const [file, setFile] = useState(undefined);
    const [isPending, startTransition] = useTransition()

    const kategoriList = [
        { id: 1, nama: "Laporan Keuangan DPRK" },
        { id: 2, nama: "Rencana Strategis DPRK" },
        { id: 3, nama: "Dokumen Publikasi" },
        { id: 4, nama: "Produk Hukum" },
    ]

    useEffect(() => {
        startTransition(async () => {
            const data = await getAllDocuments();
            if (data) {
                const sorted = data.sort(
                (a, b) => new Date(b.date) - new Date(a.date)
                );
                setFiles(sorted);
            }
            });
    }, [])

    const handleSubmit = () => {
        if (!fileName || !category || !file) {
            toast('Lengkapi semua field wajib!',
                    {
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
                    }
                );
            return;
        }


        startTransition( async () => {
            const created = await addDocument(fileName,category, file)
            setFiles((prev) =>
                [...prev, created].sort((a, b) => new Date(b.date) - new Date(a.date))
            );
            setFile(null)
            setFileName("")
            setCategory("")
        })

        toast('File Berhasil Diupload',
            {
                icon: <Check className="text-green-500" />,
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
                duration: 3000,
            }
        );

    };


    const handleSelectKetegori = (ketegori) => {
        setCategory(ketegori.nama)
    };

    const handleFile = (file) => {
        setFile(file)
    };

    const handleDeleteList = async (id, namaDokumen) => {
        toast((t) => (
            <div className="flex flex-col gap-2">
            <span>Hapus Dokumen ini?</span>
            <span>{namaDokumen}</span>
            <div className="flex justify-end gap-2">
                <button
                onClick={() => toast.dismiss(t.id)}
                className="px-3 py-1 rounded-md bg-gray-700 text-white hover:bg-gray-600"
                >
                Batal
                </button>
                    <button
                    onClick={async () => {
                        const deleted = await deleteDocument(id);
                        if (deleted) {
                        setFiles((prev) => prev.filter((j) => j.id !== id));
                        toast('File Berhasil Dihapus',
                                {
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
                                }
                            );
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
        <div className="flex flex-row justify-between gap-4">
            <div className="flex w-[60%] flex-col gap-6 mt-8">
            {/* Input Nama File */}
                <div className="flex flex-col gap-3 w-full">
                    <Label htmlFor="Namafile">Nama <span className="text-red-500"> *</span></Label>
                    <Input value={fileName} onChange={(e) => setFileName(e.target.value)} id="Namafile" type="text" placeholder="Nama File" />
                </div>
                
                <div className="flex flex-col gap-3 w-full">
                    <Label htmlFor="Namafile">Kategori <span className="text-red-500"> *</span></Label>
                    <BadanDropdown placeholder={"Pilih Kategori"} onSelect={handleSelectKetegori} options={kategoriList} disabled={isPending} />
                </div>


            {/* Input File */}
            <FileDrop onFileSelect={handleFile} value={file} />

            {/* Tombol Submit */}
            <button
                disabled={isPending}
                onClick={handleSubmit}
                className={`w-full py-2 rounded-md text-white flex items-center justify-center gap-2 font-medium transition-colors ${
                    isPending
                    ? "bg-neutral-500 cursor-not-allowed"
                    : "bg-amber-600 hover:bg-amber-700 cursor-pointer"
                }`}
            >
                {isPending ? (
                    <>
                        <Loader className="w-5 h-5 text-white animate-spin mr-2" />
                    </>
                )
                :
                (<>
                    Simpan
                </>)
                }
            </button>
            </div>

            <div className="flex w-[40%] flex-col gap-3 mt-8 rounded-2xl max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
                
                {isPending ? 
                (<div className="flex items-center justify-center text-gray-500 py-6">
                    <Loader className="w-5 h-5 text-amber-500 animate-spin mr-2" />
                    Memuat data...
                </div>)
                :
                (files.length > 0 ? 
                    files.map((p, i) => (
                        <DocItem key={i} name={p.namaDokumen} category={p.jenisDokumen} urlFile={`/api/download/${p.urlDokumen}`} onDelete={() => handleDeleteList(p.id,p.namaDokumen)}  />
                    ))
                :

                <p className="text-sm text-gray-500 text-center">Belum ada dokumen yang diupload.</p>
                )
                }
            </div>

        </div>
    );
}
