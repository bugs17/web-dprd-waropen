"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Loader } from "lucide-react";
import { useState, useTransition } from "react";
import { deleteKartuUcapan } from "@/action/delete-kartu-ucapan";

const DialogDeleteKartuUcapan = ({ idKartuUcapan, description }) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteKartuUcapan(idKartuUcapan);
        setOpen(false); // Tutup dialog jika sukses
      } catch (error) {
        console.error("Gagal hapus:", error);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="cursor-pointer hover:!bg-red-500 hover:!text-white"
      >
        <Trash2 size="14" />
      </Button>
      <DialogContent className="!max-w-md">
        <DialogHeader>
          <DialogTitle>Hapus Kartu Ucapan</DialogTitle>
          <DialogDescription className="pt-3">
            Apakah kamu yakin ingin menghapus kartu ucapan{" "}
            <span className="font-semibold">{description}</span>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            disabled={isPending}
            onClick={() => setOpen(false)}
          >
            Batal
          </Button>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={handleDelete}
          >
            {isPending ? (
              <>
                <Loader className="w-4 h-4 animate-spin mr-2" />
                Menghapus...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Hapus
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDeleteKartuUcapan;