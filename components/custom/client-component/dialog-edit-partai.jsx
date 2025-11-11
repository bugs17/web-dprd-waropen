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
import BadanDropdown from "./dropdown-badan"
import FraksiDropdown from "./dropdown-fraksi"

const DialogEditPartai = ({namaPartaiState, idPartaiState, urlPreviewState, fraksisState, fraksiSelectedState}) => {


  const [open, setOpen] = useState(false)
  const [imgFile, setImgFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [namaPartai, setNamaPartai] = useState("")
  const [selectedFraksi, setSelectedFraksi] = useState(null) // ID fraksi yang dipilih

  const [isPending, startTransition] = useTransition()


  // set data ketika dialog dibuka
  useEffect(() => {
    if (open) {
      setNamaPartai(namaPartaiState)
      setPreview(urlPreviewState)
      setSelectedFraksi(fraksiSelectedState || null) // nilai awal dropdown
    } 
  }, [namaPartaiState, urlPreviewState, fraksiSelectedState, open])

  const handleSubmit = () => {

    // validasi input
    if (!namaPartai.trim()) {
      alert("Nama partai diisi!")
      return
    }

    if (!selectedFraksi) {
      alert("Fraksi harus dipilih!")
      return
    }

     // proses async
    startTransition(async () => {
      await editPartai(namaPartai, imgFile, idPartaiState, selectedFraksi)

      // reset state
      setNamaPartai("")
      setImgFile(null)
      setPreview(null)
      setSelectedFraksi(null)
      setOpen(false)
    })
  }

  const handleOpenChange = (isOpen) => {
    if (!isOpen && namaPartai.trim() === "") {
      const userWantsToClose = confirm("Nama Partai tidak boleh kosong!")
      if (userWantsToClose) {
        setNamaPartai("")
        setPreview(null)
        setImgFile(null)
        setSelectedFraksi(null)
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
              
              <div className="flex flex-col gap-5 mt-10">
                  <div className="flex flex-col gap-3 w-full">
                      <Label htmlFor="nama-partai">Partai</Label>
                      <Input value={namaPartai} disabled={isPending} onChange={(e) => setNamaPartai(e.target.value)} id="nama-partai" type="text" placeholder="nama partai" />
                  </div>
                  {/* Dropdown Fraksi */}
                  <div className="flex flex-col gap-3 w-full">
                    <Label htmlFor="fraksi-dropdown">Fraksi</Label>
                    <FraksiDropdown
                      options={fraksisState}          // array semua fraksi {id, nama}
                      value={selectedFraksi}          // ID fraksi yang dipilih
                      onSelect={(item) => setSelectedFraksi(item.id)}
                      placeholder="Pilih Fraksi"
                      disabled={isPending}
                    />
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