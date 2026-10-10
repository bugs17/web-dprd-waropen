"use client"

import { AlertCircle, FileText, Upload, Film } from "lucide-react";
import { useEffect, useState } from "react";

export default function ImageDrop({ onFileSelect, value, ref }) {
  const [fileName, setFileName] = useState(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

    const validateFile = (file) => {
        if (!file) return false;

        const allowedTypes = [
            "image/jpeg", 
            "image/jpg", 
            "image/png", 
            "video/mp4", 
            "video/webm", 
            "video/ogg", 
            "video/quicktime" // untuk .mov
        ];
        const allowedExtensions = [".jpeg", ".jpg", ".png", ".mp4", ".webm", ".ogg", ".mov"];

        const isValidType = allowedTypes.includes(file.type);
        const isValidExtension = allowedExtensions.some(ext =>
            file.name.toLowerCase().endsWith(ext)
        );

        if (!isValidType && !isValidExtension) {
            setError("Hanya file Gambar (JPG, JPEG, PNG) atau Video (MP4, WEBM, MOV) yang diizinkan.");
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
            if (ref.current) {
                ref.current.value = "";
            }
        }
    }, [value]);

    // Cek apakah file yang dipilih adalah video untuk icon yang sesuai
    const isVideo = fileName && /\.(mp4|webm|ogg|mov)$/i.test(fileName);

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
            onClick={() => ref.current.click()}
        >
            <input
                type="file"
                accept=".jpg, .jpeg, .png, .mp4, .webm, .ogg, .mov"
                ref={ref}
                onChange={handleFileChange}
                className="hidden"
            />

            {fileName ? (
                <div className="flex items-center gap-2 text-gray-200">
                    {isVideo ? (
                        <Film size={20} className="text-amber-400" />
                    ) : (
                        <FileText size={20} className="text-amber-400" />
                    )}
                    <span className="text-sm truncate max-w-[220px]">{fileName}</span>
                </div>
            ) : (
                <div className="flex flex-col items-center text-gray-400 select-none">
                    <Upload size={28} className="text-amber-400 mb-2" />
                    <p className="text-sm">
                        Tarik file ke sini atau{" "}
                        <span className="text-amber-400">klik untuk memilih</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">(Mendukung file Gambar: JPG, PNG & Video: MP4, MOV)</p>
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