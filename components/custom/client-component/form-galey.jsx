"use client"

import { Label } from "@radix-ui/react-dropdown-menu"
import ImageDrop from "./upload-galery"
import { Input } from "@/components/ui/input"
import { useEffect, useRef, useState, useTransition } from "react"
import { Ban, Loader, ThumbsUp, Trash2 } from "lucide-react"
import Image from "next/image"
import toast from "react-hot-toast"
import { addGalery } from "@/action/add-galery"
import { getListGalery } from "@/action/get-list-galery"
import { deleteGalery } from "@/action/delete-galery"

const FormGalery = () => {
    const [fileName, setFileName] = useState("")
    const [file, setFile] = useState(null)
    const [isPending, startTrasnsition] = useTransition()
    const [triger, setTriger] = useState(1)
    const fileInputRef = useRef(null);

    const [images, setImages] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            const data = await getListGalery()
            if (data) {
                setImages(data)
            }
        }
        fetchData()
    }, [])

    const handleDelete = (id) => {
        setImages((prev) => prev.filter((img) => img.id !== id))
    }

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
                        duration: 3500,
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
                    fileInputRef.current.value = null
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
                            duration: 3500,
                        }
                    );
                return;
            }else{
                toast('gagal Upload. Coba lagi!',
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
        })
    }


    const handleDeleteImage = async (id) => {
        toast((t) => (
            <div className="flex flex-col gap-2">
            <span>Hapus Image ini?</span>
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
                        toast('Image Berhasil Dihapus',
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
        <div className="gap-5 flex flex-col">
        <h2 className="text-center text-lg font-semibold">Galery</h2>

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

            <div className=" flex flex-wrap gap-4 justify-center mt-5 w-full p-5 overflow-y-auto rounded-xl border border-zinc-600">
                {images.length === 0 ? (
                <p className="text-gray-400 italic">Belum ada foto</p>
                ) : (
                images.map((img) => (
                    <div
                    key={img.id}
                    className="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 w-40 h-40"
                    >
                    <Image
                        src={`/api/galery/image/${img.imageUrl}`}
                        alt="Foto galeri"
                        fill
                        className="object-cover rounded-xl"
                        sizes="160px"
                    />

                    {/* Floating delete button */}
                    <button
                        onClick={() => handleDeleteImage(img.id)}
                        className="absolute hover:cursor-pointer top-2 right-2 bg-white/20 backdrop-blur-md hover:bg-red-600 text-red-600 hover:text-white p-2 rounded-full shadow-md transition-all duration-200"
                        >
                        <Trash2 size={16} />
                        </button>

                    </div>
                ))
                )}
            </div>
        </div>
    )
}

export default FormGalery
