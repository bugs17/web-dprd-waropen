"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const DialogAddAnggotaDewan = ({children}) => {
  return (
    <Dialog>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        
        <DialogContent className="!w-3xl !max-w-none">
            <DialogHeader>
            <DialogTitle>Tambah anggota dewan</DialogTitle>
            <DialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers. This action cannot be undone. This will permanently delete your account
                and remove your data from our servers. This action cannot be undone. This will permanently delete your account
                and remove your data from our servers. This action cannot be undone. This will permanently delete your account
                and remove your data from our servers. This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
                and remove your data from our servers. This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
                and remove your data from our servers. This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
                and remove your data from our servers. This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
            </DialogDescription>
            </DialogHeader>
        
            <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                <Button type="button" variant="secondary">
                    Close
                </Button>
                </DialogClose>
            </DialogFooter>
        
        </DialogContent>

    </Dialog>
  )
}

export default DialogAddAnggotaDewan