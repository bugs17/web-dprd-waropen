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
import { deleteAnggotaDewan } from "@/action/delete-anggota-dewan"
import toast from "react-hot-toast"

const DialogDeleteAnggotaDewan = ({ namaPartai, idAnggotaDewan }) => {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [nama, setNama] = useState(namaPartai)

  useEffect(() => {
    if (open) setNama(namaPartai)
  }, [namaPartai, open])

  const handleSubmit = () => {
    startTransition(async () => {
        // tampilkan toast loading

        try {
            const result = await deleteAnggotaDewan(idAnggotaDewan);
            if (result === true) {
                toast.success("Anggota Dewan berhasil dihapus!");
                setOpen(false);
            } else {
                toast.error("Gagal menghapus Anggota Dewan");
            }
            } catch (err) {
                toast.error(err.message || "Terjadi kesalahan saat menghapus");
            }
        });
    };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <Button  className={"cursor-pointer hover:!bg-red-800"} variant="icon">
      </Button> */}
        <Trash onClick={() => setOpen(true)} size={15} className='cursor-pointer hover:text-red-500 text-red-700' />
      <DialogContent className="!max-w-2xl !w-full">
        <DialogHeader>
          <DialogTitle>Warning!</DialogTitle>

          <div className="flex justify-center w-full mt-3">
            <p>Apakah anda yakin akan menghapus Anggota dewan {nama}?</p>
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

export default DialogDeleteAnggotaDewan
