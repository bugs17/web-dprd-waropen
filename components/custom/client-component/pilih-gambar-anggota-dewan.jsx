"use client"

import { useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function ImagePickerAnggotaDewan({onChange, urlImagePreview, preview, setPreview, isPending}) {

  
  const inputRef = useRef(null)


  
  
  const handleClick = () => {
    inputRef.current?.click()
  }
  

  const handleChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreview(url)
      onChange(file)
    }
  }

  return (
    <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center gap-4 w-full max-w-sm">
      {preview ? (
        <Image
          src={preview}
          alt="Preview"
          width={200}
          height={200}
          className="rounded-md object-cover"
        />
      ) : (
        <div className="text-gray-500 text-sm">Pilih logo partai</div>
      )}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleChange}
        className="hidden"
        disabled={isPending}
        
      />
      <Button variant="secondary" onClick={handleClick} disabled={isPending}
        className={cn(
          "hover:cursor-pointer",
          isPending && "opacity-60 !cursor-not-allowed hover:!cursor-not-allowed"
        )}>
        Pilih Gambar
      </Button>
    </div>
  )
}
