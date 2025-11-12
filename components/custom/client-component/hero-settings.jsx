'use client'

import { useEffect, useState, useTransition } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import toast from 'react-hot-toast'
import { Ban, Loader, Pencil } from 'lucide-react'
import { getHero } from '@/action/get-hero'
import { updateHero } from '@/action/edit-hero'
import { createHero } from '@/action/create-hero'

export default function HeroAdminPage() {
  const [heroData, setHeroData] = useState(null)
  const [formData, setFormData] = useState({
    tagline: '',
    description: '',
    urlImage: '',
    file: null,
  })
  const [preview, setPreview] = useState(null)
  const [isPending, startTransition] = useTransition()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await getHero()
        if (res) {
          const imageUrl = `/api/hero/image/${res.urlImage}`
          setHeroData(res)
          setFormData({
            tagline: res.tagline,
            description: res.description,
            urlImage: imageUrl,
            file: null,
          })
        }
      } catch {
        toast('Gagal memuat data hero.', {
          icon: <Ban className="text-red-500" />,
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchHero()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const previewURL = URL.createObjectURL(file)
      setPreview(previewURL)
      setFormData((prev) => ({ ...prev, file }))
    }
  }

  const handleSubmit = () => {
    if (!formData.tagline || !formData.description || (!heroData && !formData.file)) {
      toast('Lengkapi semua field wajib!', {
        icon: <Ban className="text-red-500" />,
        style: {
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #1a1a1a, #2a2a2a)',
          color: '#f5f5f5',
          border: '1px solid #3a3a3a',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          padding: '14px 18px',
          fontSize: '14px',
          fontWeight: 500,
        },
        duration: 3500,
      })
      return
    }

    startTransition(async () => {
      try {
        let res = null
        if (heroData) {
          res = await updateHero(formData)
        } else {
          res = await createHero(formData)
        }

        if (res) {
          toast('Hero berhasil disimpan!', { icon: '✅' })
          const imageUrl = `/api/hero/image/${res.urlImage}`

          // perbarui semua state dengan data terbaru
          setHeroData(res)
          setFormData({
            tagline: res.tagline,
            description: res.description,
            urlImage: imageUrl,
            file: null,
          })
          setPreview(null)
          setIsEditing(false)
        } else {
          throw new Error()
        }
      } catch {
        toast('Gagal menyimpan data hero.', {
          icon: <Ban className="text-red-500" />,
          style: {
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #1a1a1a, #2a2a2a)',
            color: '#f5f5f5',
            border: '1px solid #3a3a3a',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            padding: '14px 18px',
            fontSize: '14px',
            fontWeight: 500,
          },
          duration: 3500,
        })
      }
    })
  }

  const handleEdit = () => setIsEditing(true)

  const handleCancel = () => {
    // reset form ke data terakhir dari heroData
    if (heroData) {
      const imageUrl = `/api/hero/image/${heroData.urlImage}`
      setFormData({
        tagline: heroData.tagline,
        description: heroData.description,
        urlImage: imageUrl,
        file: null,
      })
    }
    setPreview(null)
    setIsEditing(false)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-amber-400">
        <Loader className="w-5 h-5 mr-2 animate-spin" />
        Memuat data hero...
      </div>
    )
  }

  const isViewMode = heroData && !isEditing

  return (
    <div className="max-w-3xl mx-auto p-8">
      <Card className="shadow-lg border border-zinc-800">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {isViewMode ? (
            <div className="space-y-6">
              <div className="rounded-xl overflow-hidden border border-zinc-700">
                <img
                  src={`/api/hero/image/${heroData.urlImage}`}
                  alt="Hero"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div>
                <h2 className="text-lg font-bold">{heroData.tagline}</h2>
                <p className="text-sm text-zinc-400 mt-2">{heroData.description}</p>
              </div>
              <Button onClick={handleEdit} className={"bg-amber-600 hover:bg-amber-700 cursor-pointer text-white"}>
                <Pencil className="w-4 h-4 mr-2" /> Edit
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium">Tagline</label>
                <Input
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleChange}
                  placeholder="Masukkan tagline"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Deskripsi</label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Masukkan deskripsi singkat"
                  rows={4}
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Gambar Hero</label>
                <Input type="file" accept="image/*" onChange={handleImageChange} />
                {(preview || formData.urlImage) && (
                  <div className="rounded-xl overflow-hidden border border-zinc-700">
                    <img
                      src={preview || formData.urlImage}
                      alt="Preview"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                )}
              </div>

              <Button
                onClick={handleSubmit}
                disabled={isPending}
                className={`w-full py-2 rounded-md text-white flex items-center justify-center gap-2 font-medium transition-colors ${
                  isPending
                    ? 'bg-neutral-500 cursor-not-allowed'
                    : 'bg-amber-600 hover:bg-amber-700 cursor-pointer'
                }`}
              >
                {isPending ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Menyimpan...
                  </>
                ) : heroData ? (
                  'Update Hero'
                ) : (
                  'Simpan Hero'
                )}
              </Button>

              <Button
                onClick={handleCancel}
                disabled={isPending}
                className="w-full py-2 rounded-md text-white flex items-center justify-center gap-2 font-medium bg-zinc-700 hover:bg-zinc-600"
              >
                Batal
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
