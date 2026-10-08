"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader } from "lucide-react";
import { addKartuUcapan } from "@/action/add-kartu-ucapan";

const DialogAddKartuUcapan = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImgFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!description.trim() || !imgFile) {
      alert("Deskripsi dan gambar wajib diisi!");
      return;
    }

    setIsPending(true);
    try {
      // Kirim langsung parameter sesuai dengan format server action kamu: (description, image)
      await addKartuUcapan(description, imgFile);

      // Reset form dan tutup dialog jika sukses
      setDescription("");
      setImgFile(null);
      setPreview(null);
      setOpen(false);
    } catch (error) {
      console.error("Gagal menyimpan kartu ucapan:", error);
    } finally {
      setIsPending(false);
    }
  };

  const handleOpenChange = (isOpen) => {
    if (!isOpen && (description.trim() !== "" || imgFile !== null)) {
      const userWantsToClose = confirm(
        "Input masih ada isinya! Yakin ingin menutup?",
      );
      if (userWantsToClose) {
        setDescription("");
        setImgFile(null);
        setPreview(null);
        setOpen(false);
      } else {
        setOpen(true);
      }
    } else {
      setOpen(isOpen);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <div onClick={() => setOpen(true)}>{children}</div>
      <DialogContent className="!max-w-2xl !w-full">
        <DialogHeader>
          <DialogTitle>Tambah Kartu Ucapan</DialogTitle>
          <div className="flex flex-col gap-5 mt-10">
            <div className="flex flex-col gap-3 w-full">
              <Label htmlFor="description-kartu">Deskripsi</Label>
              <Input
                id="description-kartu"
                disabled={isPending}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="contoh: Selamat Hari Raya Idul Fitri"
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <Label htmlFor="image-kartu">Gambar</Label>
              <Input
                id="image-kartu"
                disabled={isPending}
                onChange={handleImageChange}
                type="file"
                accept="image/*"
              />
            </div>
            {preview && (
              <div className="flex justify-center w-full">
                <div className="w-full max-w-xl aspect-[16/6] overflow-hidden rounded-md border bg-[#231c26]">
                  <img
                    src={preview}
                    alt="Preview kartu ucapan"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}
            <div className="flex justify-center w-full mt-3">
              <Button
                disabled={isPending || !description.trim() || !imgFile}
                onClick={handleSubmit}
                className="bg-amber-300 hover:bg-amber-400 hover:cursor-pointer"
              >
                {isPending ? (
                  <div className="w-full flex flex-row gap-3 justify-center items-center">
                    <Loader className="w-5 h-5 animate-spin text-black" />
                    <span>Proses...</span>
                  </div>
                ) : (
                  <span>Simpan</span>
                )}
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddKartuUcapan;