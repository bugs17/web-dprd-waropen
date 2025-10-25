"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import ImagePickerPartai from "./pilih-gambar-partai"
import { Button } from "@/components/ui/button"
import { useAtom } from "jotai"
import { openDialogPartaiAtom } from "@/lib/globalState"

const DialogAddPartai = ({children}) => {


  const [open, setOpen] = useAtom(openDialogPartaiAtom)
  const [imgFile, setImgFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [namaPartai, setNamaPartai] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {

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
                      <Input onChange={(e) => setNamaPartai(e.target.value)} id="nama-partai" type="text" placeholder="nama partai" />
                  </div>
                  
              </div>

              <div className='flex justify-center w-full mt-3'>
                <ImagePickerPartai onChange={setImgFile} preview={preview} setPreview={setPreview} />
              </div>
              
              <div className='flex justify-center w-full mt-3'>
                <Button disabled={loading} onClick={handleSubmit} className={"bg-amber-300 hover:bg-amber-400 hover:cursor-pointer"}>Simpan</Button>
              </div>


            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default DialogAddPartai