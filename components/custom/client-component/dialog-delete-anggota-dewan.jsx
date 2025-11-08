"use client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useEffect, useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Loader, Trash, Trash2 } from "lucide-react"
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
      <Trash 
        onClick={() => setOpen(true)} 
        size={15} 
        className='cursor-pointer hover:text-red-500 text-red-700' 
      />
      <DialogContent
        className="!max-w-2xl !w-full"
        style={{
          borderRadius: "12px",
          background: "linear-gradient(135deg, #1a1a1a, #2a2a2a)",
          color: "#f5f5f5",
          border: "1px solid #3a3a3a",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          padding: "24px",
        }}
      >
        <DialogHeader>
          <DialogTitle>Warning!</DialogTitle>

          <div className="flex justify-center w-full mt-3">
            <p>
              Apakah anda yakin akan menghapus Anggota dewan{" "}
              <span className="font-bold text-amber-200">{nama}</span>?
            </p>
          </div>

          <div className="flex justify-center w-full mt-6">
            <Button
              disabled={isPending}
              onClick={handleSubmit}
              className="bg-red-400 hover:bg-red-500 text-white hover:cursor-pointer"
              style={{
                borderRadius: "8px",
                padding: "10px 16px",
                fontWeight: 500,
              }}
            >
              {isPending ? (
                <div className="flex gap-2 justify-center items-center">
                  <Loader className="w-5 h-5 animate-spin text-black" />
                  <span>Proses...</span>
                </div>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  <span>Hapus</span>
                </>
              )}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>

  )
}

export default DialogDeleteAnggotaDewan
