"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function ImagePicker({onChange}) {
  const inputRef = useRef(null)
  const [preview, setPreview] = useState(null)

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
        <div className="text-gray-500 text-sm">Belum ada gambar dipilih</div>
      )}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleChange}
        className="hidden"
      />
      <Button variant="secondary" onClick={handleClick} className={"hover:cursor-pointer"}>
        Pilih Gambar
      </Button>
    </div>
  )
}
