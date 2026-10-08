'use client'

import { useEffect, useState, useTransition } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import toast from 'react-hot-toast'
import { Ban, Loader, Pencil, Plus, Trash2 } from 'lucide-react'
import {  getHero } from '@/action/get-hero' // Asumsikan diubah dari getHero ke getAllHero (findMany)
import { createHero } from '@/action/create-hero'
import { updateHero } from '@/action/edit-hero'
import { deleteHero } from './delete-hero'

export default function HeroAdminPage() {
  const [heroList, setHeroList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isPending, startTransition] = useTransition()

  // State untuk Dialog Modal (Tambah / Edit)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    tagline: '',
    description: '',
    file: null,
  })
  const [preview, setPreview] = useState(null)

  // State untuk Dialog Hapus
  const [deleteId, setDeleteId] = useState(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Ambil data saat pertama load
  const fetchHeroes = async () => {
    try {
      const res = await getHero()
      setHeroList(res || [])
    } catch {
      toast('Gagal memuat data hero.', { icon: <Ban className="text-red-500" /> })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchHeroes()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
      setFormData((prev) => ({ ...prev, file }))
    }
  }

  // Buka modal untuk tambah data baru
  const handleOpenAdd = () => {
    setEditingId(null)
    setFormData({ tagline: '', description: '', file: null })
    setPreview(null)
    setIsDialogOpen(true)
  }

  // Buka modal untuk edit data
  const handleOpenEdit = (item) => {
    setEditingId(item.id)
    setFormData({
      // tagline: item.tagline,
      // description: item.description,
      file: null,
    })
    setPreview(`/api/hero/image/${item.urlImage}`)
    setIsDialogOpen(true)
  }

  // Submit Simpan / Update
  const handleSubmit = () => {
    if ((!editingId && !formData.file)) {
      toast('Lengkapi semua field wajib!', { icon: <Ban className="text-red-500" /> })
      return
    }

    startTransition(async () => {
      try {
        let res = null
        if (editingId) {
          // Kirim data beserta ID untuk update
          res = await updateHero({ ...formData, id: editingId })
        } else {
          res = await createHero(formData)
        }

        if (res) {
          toast(editingId ? 'Hero berhasil diperbarui!' : 'Hero berhasil ditambahkan!', { icon: '✅' })
          setIsDialogOpen(false)
          fetchHeroes() // Refresh list data
        } else {
          throw new Error()
        }
      } catch {
        toast('Gagal menyimpan data hero.', { icon: <Ban className="text-red-500" /> })
      }
    })
  }

  // Eksekusi Hapus
  const handleDelete = () => {
    startTransition(async () => {
      const success = await deleteHero(deleteId)
      if (success) {
        toast('Hero berhasil dihapus!', { icon: '✅' })
        setIsDeleteDialogOpen(false)
        setDeleteId(null)
        fetchHeroes()
      } else {
        toast('Gagal menghapus hero.', { icon: <Ban className="text-red-500" /> })
      }
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-amber-400">
        <Loader className="w-5 h-5 mr-2 animate-spin" />
        Memuat data hero...
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Manajemen Hero Section</h1>
        <Button onClick={handleOpenAdd} className="bg-amber-600 hover:bg-amber-700 cursor-pointer text-white">
          <Plus className="w-4 h-4 mr-2" /> Tambah Hero
        </Button>
      </div>

      <Card className="shadow-lg border border-zinc-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Daftar Hero</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-32">Gambar</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {heroList.length > 0 ? (
                heroList.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <img
                        src={`/api/hero/image/${item.urlImage}`}
                        alt={item.tagline}
                        className="w-28 h-16 object-cover rounded-md border border-zinc-700 bg-zinc-900"
                      />
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenEdit(item)}
                        className="cursor-pointer"
                      >
                        <Pencil size={14} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setDeleteId(item.id)
                          setIsDeleteDialogOpen(true)
                        }}
                        className="cursor-pointer hover:!bg-red-500 hover:!text-white"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                    Belum ada data hero. Silakan tambahkan baru.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal Dialog Form Tambah / Edit */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Hero Section' : 'Tambah Hero Section'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            

            <div className="space-y-2">
              <label className="text-sm font-medium">Gambar Hero</label>
              <Input type="file" accept="image/*" onChange={handleImageChange} />
              {preview && (
                <div className="rounded-xl overflow-hidden border border-zinc-700 mt-2">
                  <img src={preview} alt="Preview" className="w-full h-40 object-cover" />
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" disabled={isPending} onClick={() => setIsDialogOpen(false)}>
              Batal
            </Button>
            <Button
              disabled={isPending}
              onClick={handleSubmit}
              className="bg-amber-600 hover:bg-amber-700 text-white cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" /> Menyimpan...
                </>
              ) : (
                'Simpan'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Dialog Konfirmasi Hapus */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Hapus Hero</DialogTitle>
            <DialogDescription className="pt-2">
              Apakah kamu yakin ingin menghapus data hero ini? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" disabled={isPending} onClick={() => setIsDeleteDialogOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive" disabled={isPending} onClick={handleDelete}>
              {isPending ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" /> Menghapus...
                </>
              ) : (
                'Hapus'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}