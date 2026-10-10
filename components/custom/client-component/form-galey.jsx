"use client"

import { Label } from "@radix-ui/react-dropdown-menu"
import ImageDrop from "./upload-galery"
import { Input } from "@/components/ui/input"
import { useEffect, useRef, useState, useTransition } from "react"
import { Ban, Loader, ThumbsUp, Trash2, Film, Eye } from "lucide-react"
import Image from "next/image"
import toast from "react-hot-toast"
import { addGalery } from "@/action/add-galery"
import { getListGalery } from "@/action/get-list-galery"
import { deleteGalery } from "@/action/delete-galery"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

const FormGalery = () => {
    const [fileName, setFileName] = useState("")
    const [file, setFile] = useState(null)
    const [isPending, startTrasnsition] = useTransition()
    const fileInputRef = useRef(null);

    const [images, setImages] = useState([])

    // State untuk Modal Preview
    const [previewItem, setPreviewItem] = useState(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getListGalery()
            if (data) {
                setImages(data)
            }
        }
        fetchData()
    }, [])

    const handleFile = (file) => {
        setFile(file)
    };

    const handleSubmit = () => {
        if (!fileName || !file) {
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
                }
            );
            return;
        }

        startTrasnsition(async() => {
            const created = await addGalery(fileName, file)
                if (created) {
                    setImages((prev) => [...prev, created])
                    setFileName("")
                    setFile(null)
                    if (fileInputRef.current) fileInputRef.current.value = null
                    toast('Sukses!',
                        {
                            icon: <ThumbsUp className="text-green-500" />,
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
                        }
                    );
                return;
            } else {
                toast('Gagal Upload. Coba lagi!',
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
                    }
                );
                return;
            }
        })
    }

    const handleDeleteImage = async (id, e) => {
        e.stopPropagation(); // Mencegah modal preview ikut terpanggil saat tombol hapus diklik
        toast((t) => (
            <div className="flex flex-col gap-2">
            <span>Hapus media ini?</span>
            <div className="flex justify-end gap-2">
                <button
                onClick={() => toast.dismiss(t.id)}
                className="px-3 py-1 rounded-md bg-gray-700 text-white hover:bg-gray-600"
                >
                Batal
                </button>
                    <button
                    onClick={async () => {
                        const deleted = await deleteGalery(id);
                        if (deleted) {
                        setImages((prev) => prev.filter((j) => j.id !== id));
                        toast('Media Berhasil Dihapus',
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
            duration: 5000,
        });
    };

    // Helper untuk mendeteksi apakah file adalah video
    const isVideoFile = (url) => {
        if (!url) return false;
        const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.m4v'];
        return videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
    };

    const handleOpenPreview = (item) => {
        setPreviewItem(item);
        setIsPreviewOpen(true);
    };

    return (
        <div className="gap-5 flex flex-col">
        <h2 className="text-center text-lg font-semibold">Galery (Foto & Video)</h2>

        <div className="flex flex-col gap-3 w-full">
            <Label htmlFor="Namafile">
            Judul <span className="text-red-500">*</span>
            </Label>
            <Input
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            id="Namafile"
            type="text"
            placeholder="Judul"
            />
        </div>

        <ImageDrop ref={fileInputRef} onFileSelect={handleFile} value={file} />

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
                    <Loader className="w-5 h-5 text-white animate-spin" />
                ) : (
                    "Simpan"
                )}
            </button>

            <div className="flex flex-wrap gap-4 justify-center mt-5 w-full p-5 overflow-y-auto rounded-xl border border-zinc-600">
                {images.length === 0 ? (
                <p className="text-gray-400 italic">Belum ada media</p>
                ) : (
                images.map((img) => {
                    const isVideo = isVideoFile(img.imageUrl);
                    return (
                        <div
                            key={img.id}
                            onClick={() => handleOpenPreview(img)}
                            className="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 w-40 h-40 bg-zinc-900 flex items-center justify-center cursor-pointer group"
                        >
                            {isVideo ? (
                                <div className="relative w-full h-full flex items-center justify-center bg-black">
                                    <video
                                        src={`/api/galery/image/${img.imageUrl}`}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                    />
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
                                        <Film className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                            ) : (
                                <Image
                                    src={`/api/galery/image/${img.imageUrl}`}
                                    alt={img.judul || "Galeri"}
                                    fill
                                    className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                                    sizes="160px"
                                />
                            )}

                            {/* Overlay icon hover untuk petunjuk klik */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                <Eye className="w-6 h-6 text-white" />
                            </div>

                            {/* Floating delete button */}
                            <button
                                onClick={(e) => handleDeleteImage(img.id, e)}
                                className="absolute hover:cursor-pointer top-2 right-2 bg-black/50 backdrop-blur-md hover:bg-red-600 text-white p-2 rounded-full shadow-md transition-all duration-200 z-10"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    );
                })
                )}
            </div>

            {/* Modal Dialog untuk Preview / Play Media */}
            <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                <DialogContent className="max-w-3xl bg-zinc-900 border-zinc-700 text-white">
                    <DialogHeader>
                        <DialogTitle>{previewItem?.judul || "Preview Media"}</DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center justify-center w-full min-h-[300px] max-h-[75vh] overflow-hidden rounded-lg bg-black">
                        {previewItem && isVideoFile(previewItem.imageUrl) ? (
                            <video
                                src={`/api/galery/image/${previewItem.imageUrl}`}
                                controls
                                autoPlay
                                className="w-full max-h-[70vh] object-contain rounded-lg"
                            />
                        ) : previewItem ? (
                            <div className="relative w-full h-[60vh]">
                                <Image
                                    src={`/api/galery/image/${previewItem.imageUrl}`}
                                    alt={previewItem.judul || "Preview"}
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            </div>
                        ) : null}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default FormGalery