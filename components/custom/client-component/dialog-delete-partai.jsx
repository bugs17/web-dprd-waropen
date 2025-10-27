"use client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useEffect, useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Loader, Trash } from "lucide-react"
import { deletePartai } from "@/action/delete-partai"

const DialogDeletePartai = ({ namaPartai, idPartai }) => {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [nama, setNama] = useState(namaPartai)

  useEffect(() => {
    if (open) setNama(namaPartai)
  }, [namaPartai, open])

  const handleSubmit = () => {
    startTransition(async () => {
      await deletePartai(idPartai) // bukan createPartai
      setOpen(false)
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)} className={"cursor-pointer hover:!bg-red-800"} variant="destructive" size="sm">
        <span>Hapus</span>
        <Trash size={10} />
      </Button>
      <DialogContent className="!max-w-2xl !w-full">
        <DialogHeader>
          <DialogTitle>Warning!</DialogTitle>

          <div className="flex justify-center w-full mt-3">
            <p>Apakah anda yakin akan menghapus partai {nama}?</p>
          </div>

          <div className="flex justify-center w-full mt-3">
            <Button
              disabled={isPending}
              onClick={handleSubmit}
              className="bg-red-400 hover:bg-red-500 text-white hover:cursor-pointer"
            >
              {isPending ? (
                <div className="w-full flex flex-row gap-3 justify-center items-center">
                  <Loader className="w-5 h-5 animate-spin text-black" />
                  <span>Proses...</span>
                </div>
              ) : (
                <span>Hapus</span>
              )}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default DialogDeletePartai
