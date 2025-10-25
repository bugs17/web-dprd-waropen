"use client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useTransition } from "react"
import ImagePickerPartai from "./pilih-gambar-partai"
import { Button } from "@/components/ui/button"
import { useAtom } from "jotai"
import { openDialogPartaiAtom } from "@/lib/globalState"
import { createPartai } from "@/action/create-partai"
import { Loader } from "lucide-react"

const DialogAddPartai = ({children}) => {


  const [open, setOpen] = useAtom(openDialogPartaiAtom)
  const [imgFile, setImgFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [namaPartai, setNamaPartai] = useState("")

  const [isPending, startTransition] = useTransition()

  const handleSubmit = () => {

    // validasi input
    if (!namaPartai.trim() || !imgFile) {
      alert("Nama partai dan logo wajib diisi!")
      return
    }

    // kalau lolos validasi, lanjut ke proses async
    startTransition(async () => {
      await createPartai(namaPartai, imgFile)

      // reset state setelah data berhasil di record di backend
      setNamaPartai("")
      setImgFile(null)
      setPreview(null)
      setOpen(false)

    })
  }

  const handleOpenChange = (isOpen) => {
    // Kalau user mau menutup dan input tidak kosong
    if (!isOpen && namaPartai.trim() !== "" || imgFile !== null) {
      const userWantsToClose = confirm("Input masih ada isinya! Yakin ingin menutup?")
      if (userWantsToClose) {
        setNamaPartai("")
        setPreview(null)
        setImgFile(null)
        setOpen(false)
      } else {
        setOpen(true)
      }
    } else {
      setOpen(isOpen)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
        {children}
        <DialogContent className="!max-w-2xl !w-full">
            <DialogHeader>
              <DialogTitle>Tambah Partai</DialogTitle>
              
              <div className="flex gap-5 mt-10">
                  <div className="flex flex-row gap-3 w-full">
                      <Label htmlFor="nama-partai">Partai</Label>
                      <Input disabled={isPending} onChange={(e) => setNamaPartai(e.target.value)} id="nama-partai" type="text" placeholder="nama partai" />
                  </div>
                  
              </div>

              <div className='flex justify-center w-full mt-3'>
                <ImagePickerPartai onChange={setImgFile} preview={preview} setPreview={setPreview} isPending={isPending} />
              </div>
              
              <div className='flex justify-center w-full mt-3'>
                <Button disabled={isPending || !namaPartai.trim() || !imgFile} onClick={handleSubmit} className={"bg-amber-300 hover:bg-amber-400 hover:cursor-pointer"}>
                  {isPending ? (
                    <div className="w-full flex flex-row gap-3 justify-center items-center">
                      <Loader  className="w-5 h-5 animate-spin text-black" />
                      <span>Proses...</span>
                    </div>
                  ): (
                    <span>Simpan</span>
                  )}
                </Button>
              </div>


            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default DialogAddPartai