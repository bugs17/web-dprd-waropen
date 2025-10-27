"use client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState, useTransition } from "react"
import ImagePickerPartai from "./pilih-gambar-partai"
import { Button } from "@/components/ui/button"
import { Loader, Pencil } from "lucide-react"
import { editPartai } from "@/action/edit-partai"

const DialogEditPartai = ({namaPartaiState, idPartaiState, urlPreviewState}) => {


  const [open, setOpen] = useState(false)
  const [imgFile, setImgFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [namaPartai, setNamaPartai] = useState("")

  const [isPending, startTransition] = useTransition()


  useEffect(() => {
      if (open) {
        
        setNamaPartai(namaPartaiState)
        setPreview(urlPreviewState)
      } 
    }, [namaPartaiState, urlPreviewState,open])

  const handleSubmit = () => {

    // validasi input
    if (!namaPartai.trim()) {
      alert("Nama partai diisi!")
      return
    }

    // kalau lolos validasi, lanjut ke proses async
    startTransition(async () => {
      await editPartai(namaPartai, imgFile, idPartaiState)

      // reset state setelah data berhasil di record di backend
      setNamaPartai("")
      setImgFile(null)
      setPreview(null)
      setOpen(false)
    })
  }

  const handleOpenChange = (isOpen) => {
    // Kalau user mau menutup dan input tidak kosong
    if (!isOpen && namaPartai.trim() === "") {
      const userWantsToClose = confirm("Nama Partai tidak boleh kosong!")
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
        <Button onClick={() => setOpen(true)} className={"cursor-pointer hover:!bg-amber-500"} variant="outline" size="sm">
          <span>Edit</span>
          <Pencil size={10} />
        </Button>
        <DialogContent className="!max-w-2xl !w-full">
            <DialogHeader>
              <DialogTitle>Edit Partai</DialogTitle>
              
              <div className="flex gap-5 mt-10">
                  <div className="flex flex-row gap-3 w-full">
                      <Label htmlFor="nama-partai">Partai</Label>
                      <Input value={namaPartai} disabled={isPending} onChange={(e) => setNamaPartai(e.target.value)} id="nama-partai" type="text" placeholder="nama partai" />
                  </div>
                  
              </div>

              <div className='flex justify-center w-full mt-3'>
                <ImagePickerPartai onChange={setImgFile} preview={preview} setPreview={setPreview} isPending={isPending} />
              </div>
              
              <div className='flex justify-center w-full mt-3'>
                <Button disabled={isPending || !namaPartai.trim()} onClick={handleSubmit} className={"bg-amber-300 hover:bg-amber-400 hover:cursor-pointer"}>
                  {isPending ? (
                    <div className="w-full flex flex-row gap-3 justify-center items-center">
                      <Loader  className="w-5 h-5 animate-spin text-black" />
                      <span>Proses...</span>
                    </div>
                  ): (
                    <span>Simpan perubahan</span>
                  )}
                </Button>
              </div>


            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default DialogEditPartai