"use client";

import { AlertCircle, Ban, Image, Loader, ThumbsUp, Upload } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import ImageDrop from "./upload-galery";
import toast from "react-hot-toast";
import { addStruktur } from "@/action/add-struktur-organisasi";




const FormStrukturOrganisasiSetwan = ({data}) => {

    const [isUploadMode, setIsUploadMode] = useState(false)
    const [file, setFile] = useState(null)
    const fileInputRef = useRef(null);
    


    const [isPending, startTrasnsition] = useTransition()

    

    const handleFile = (file) => {
            setFile(file)
    };

    const handleSubmit = () => {
        if (!file) {
            toast('{ilih file dulu}',
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
            const created = await addStruktur(file)
                if (created) {
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
                    setIsUploadMode(false)
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


    useEffect(() => {
        if (!data) {
            setIsUploadMode(false)
        }
    },[])

    
    return(
            <div className="bg-muted/50 h-full w-full  flex justify-center items-center rounded-xl md:min-h-min p-6">
                {isUploadMode && (
                        <div className="flex w-[60%] flex-col gap-6 mt-8">
                            <span className="text-zinc-500 text-center">Belum Ada Data. Upload dibawah ini!</span>
                            {/* Input File */}
                            <ImageDrop onFileSelect={handleFile} ref={fileInputRef} value={file} />
        
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
                            {/* Tombol Submit */}
                            <button
                                onClick={() => setIsUploadMode(false)}
                                className={`w-full py-2 rounded-md text-white cursor-pointer flex items-center justify-center gap-2 font-medium transition-colors  bg-neutral-500`}
                            >
                                Batal
                            </button>
                        </div>
                )}
                {!isUploadMode && (
                    <div className="w-full h-full flex flex-col gap-4">
                    <img
                    src={`/api/struktur/image/${data?.urlImageStrukturOrganisasi}`}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    />
                    <button
                        onClick={() => setIsUploadMode(true)}
                        className={`w-full py-2 rounded-md self-end text-white cursor-pointer flex items-center justify-center gap-2 font-medium transition-colors  bg-amber-600`}
                    >
                        Edit
                    </button>
                    </div>
                )}
            </div>

        
    )

}

export default FormStrukturOrganisasiSetwan