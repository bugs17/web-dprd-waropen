"use client"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Loader2, Trash } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState, useTransition } from "react"
import toast from "react-hot-toast"
import { deleteBerita } from "@/action/delet-berita"

const DeleteBerita = ({judulBerita, idBerita}) => {

    const [open, setOpen] = useState(false)
    const [isPending, startTransition] = useTransition()

    const handleDelete = () => {
        startTransition(async () => {
        try {
            const deleted = await deleteBerita(idBerita)
            if (deleted) {
                toast.success("Berita berhasil dihapus!")
                setOpen(false); // tutup dialog setelah sukses
            }
        } catch (err) {
            toast.error("Terjadi error. coba lagi!")
            setOpen(false); // tutup dialog setelah sukses
        }
        });
    };

  return (
        <Tooltip>
            <TooltipTrigger>
                <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogTrigger asChild>
                        <Trash className="text-red-500 text-xs" size={16} />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Anda akan menghapus berita dengan judul {judulBerita}. Tindakan ini tidak bisa di undo.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel disabled={isPending}>Batal</AlertDialogCancel>
                            <AlertDialogAction
                                className={"bg-red-500 hover:bg-red-400 text-white cursor-pointer"}
                                onClick={handleDelete}
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <>
                                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                                    </>
                                ) 
                                : 
                                (
                                    "Hapus"
                                )}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </TooltipTrigger>
            <TooltipContent>
                <p>Hapus</p>
            </TooltipContent>
        </Tooltip>
  )
}

export default DeleteBerita