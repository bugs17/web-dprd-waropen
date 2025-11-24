"use client"
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Loader,  Trash2,  UserPlus } from "lucide-react"; // <- spinner icon
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { addAnggotaBadan } from "@/action/add-badan-anggota";
import { deleteAnggotaBadan } from "@/action/delete-anggota-badan";


// rank jabatan
const getRank = (jabatan) => {
  const lower = jabatan.toLowerCase();

  if (lower.startsWith("ketua")) return 1;
  if (lower.startsWith("wakil")) return 2;
  if (lower.startsWith("anggota")) return 3;

  return 999;
};

// sorting tanpa mutasi array asli
const sortAnggotaBadan = (list) => {
  return [...list].sort(
    (a, b) => getRank(a.jabatan) - getRank(b.jabatan)
  );
};

export default function BadanTables({
  badanId,
  namaBadan,
  badanAnggota,
  anggotaAll,
  onDialogOpen,
  onSubmitedCompleted
}) {
    const [open, setOpen] = useState(false);
    const [selectedAnggota, setSelectedAnggota] = useState(null);
    const [selectedJabatan, setSelectedJabatan] = useState(null);
    const [loading, setLoading] = useState(false);

    const [isPending, startTransition] = useTransition()

    const handleOpenChange = async (val) => {
        setOpen(val);

        if (!val) {
        // Reset saat dialog ditutup tanpa submit
        setSelectedAnggota(null);
        setSelectedJabatan(null);
        setLoading(false);
        return;
        }

        if (val && onDialogOpen) {
        setLoading(true);
        try {
            await onDialogOpen(); // panggil parent untuk fetch data terbaru
        } finally {
            setLoading(false);
        }
        }
    };

    const handleSubmit = async () => {
        if (!selectedAnggota || !selectedJabatan){
            toast.error("lengkapi pilihan sebelum submit!")
            return
        };

        setLoading(true)
        const obj = JSON.parse(selectedAnggota)

        const created = await addAnggotaBadan(badanId, selectedJabatan, obj.id, obj.source, obj.nama )
        if (created) {
            await onSubmitedCompleted()
            setSelectedAnggota(null);
            setSelectedJabatan(null);
            setOpen(false);
            setLoading(false)
            
        }
        toast.success("Anggota berhasil di tambahkan")
        // // Reset state setelah submit
        
    };

    const handleDelete = (id, nama) => {
    toast((t) => (
            <div className="flex flex-col gap-2">
            <span>Anda yakin ingin menghapus?</span>
            <span>{nama}</span>
            <div className="flex justify-end gap-2">
                <button onClick={() => toast.dismiss(t.id)} className="px-3 py-1 rounded-md bg-gray-700 text-white hover:bg-gray-600">
                    Batal
                </button>
                <button className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 flex items-center gap-1"
                    onClick={() => {
                        startTransition(async () => {
                            try {
                                const deleted = await deleteAnggotaBadan(id);
                                if (deleted) {
                                    toast.success("Anggota Badan berhasil dihapus!");
                                    await onSubmitedCompleted()
                                }
                            } catch (err) {
                                toast.error(err.message || "Terjadi kesalahan saat menghapus");
                            } finally {
                                toast.dismiss(t.id);
                            }
                            });
                        }} >
                    <Trash2 className="w-4 h-4" /> Hapus
                </button>

            </div>
            </div>
        ), {
            icon: null,
            style: {
            borderRadius: "12px",
            background: "linear-gradient(135deg, #1a1a1a, #2a2a2a)",
            color: "#f5f5f5",
            border: "1px solid #3a3a3a",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            padding: "14px 18px",
            fontSize: "14px",
            fontWeight: 500,
            },
            duration: 5000, // biar ada waktu baca sebelum auto dismiss
        });
    };

    return (
        <div className="border border-gray-700 rounded-xl p-4 shadow-md bg-[#111]">
        {/* Judul + Button */}
        <div className="flex w-full flex-row justify-between mb-4">
            <span className="block text-xl font-semibold text-white">
            {namaBadan}
            </span>

            <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button className={"cursor-pointer bg-amber-500 hover:bg-amber-600"}><UserPlus className={"text-black"} /></Button>
            </DialogTrigger>

            <DialogContent className="text-white">
                <DialogHeader>
                <DialogTitle>Tambah Anggota</DialogTitle>
                <DialogDescription>
                    Pilih anggota dan jabatannya.
                </DialogDescription>
                </DialogHeader>

                {loading ? (
                <div className="flex justify-center items-center py-8">
                    <Loader className="animate-spin w-8 h-8 text-amber-500" />
                </div>
                ) : (
                <div className="space-y-4 mt-4">
                    {/* Pilih Anggota */}
                    <div className="flex flex-col gap-2">
                    <label>Pilih Anggota</label>
                    <Select value={selectedAnggota} onValueChange={setSelectedAnggota}>
                        <SelectTrigger>
                        <SelectValue placeholder="Pilih anggota" />
                        </SelectTrigger>
                        <SelectContent>
                        {anggotaAll.map((a, i) => (
                            <SelectItem key={i} value={JSON.stringify(a)}>
                            {a.nama}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    </div>

                    {/* Pilih Jabatan */}
                    <div className="flex flex-col gap-2">
                    <label>Jabatan di Badan</label>
                    <Select value={selectedJabatan} onValueChange={setSelectedJabatan}>
                        <SelectTrigger>
                        <SelectValue placeholder="Pilih jabatan" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="KETUA">Ketua</SelectItem>
                        <SelectItem value="WAKIL">Wakil Ketua</SelectItem>
                        <SelectItem value="ANGGOTA">Anggota</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>
                </div>
                )}

                <DialogFooter className="mt-6">
                <Button className={"cursor-pointer bg-amber-500 hover:bg-amber-600"} onClick={handleSubmit} disabled={loading}>
                    Simpan
                </Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>
        </div>

            {/* Tabel Anggota */}
            <Table className="table-fixed w-full">
                <TableHeader>
                    <TableRow>
                    <TableHead className="text-white text-left w-2/3">Nama</TableHead>
                    <TableHead className="text-white text-center w-1/6">Jabatan</TableHead>
                    <TableHead className="text-white text-right w-1/6">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {badanAnggota.length > 0 ? (
                    sortAnggotaBadan(badanAnggota).map((item, idx) => (
                        <TableRow key={idx}>
                        <TableCell className="text-gray-200 text-left">{item.nama}</TableCell>
                        <TableCell className="text-gray-200 text-center">{item.jabatan}</TableCell>
                        <TableCell className="text-right">
                            <Trash2 onClick={() => handleDelete(item.id, item.nama)} size={14} className="text-red-500 inline-block hover:cursor-pointer" />
                        </TableCell>
                        </TableRow>
                    ))
                    ) : (
                    <TableRow>
                        <TableCell className="text-gray-400 text-left">--</TableCell>
                        <TableCell className="text-gray-400 text-center">--</TableCell>
                        <TableCell className="text-right">
                        --
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
            </Table>



        </div>
    );
}
