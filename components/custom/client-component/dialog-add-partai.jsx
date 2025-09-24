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

const DialogAddPartai = ({children}) => {
  return (
    <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="!max-w-2xl !w-full">
            <DialogHeader>
            <DialogTitle>Tambah Partai</DialogTitle>
            <div className="flex gap-5 mt-10">
                <div className="flex flex-row gap-3 w-full">
                    <Label htmlFor="nama-partai">Partai</Label>
                    <Input id="nama-partai" type="text" placeholder="nama partai" />
                </div>
                
            </div>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default DialogAddPartai