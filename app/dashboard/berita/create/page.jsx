
"use client"
import { createBerita } from '@/action/create-berita'
import { Calendar22 } from '@/components/custom/client-component/date-picker'
import ImagePicker from '@/components/custom/client-component/pilih-gambar'
import TextEditor from '@/components/custom/client-component/text-editor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toastMessageAtom } from '@/lib/globalState'
import { useSetAtom } from 'jotai'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const CreateBeritaPage = () => {

  const route = useRouter()

  const [post, setPost] = useState("")
  const [imgFile, setImgFile] = useState(null)
  const [date, setDate] = useState(undefined)
  const [judul, setJudul] = useState("")
  const [loading, setLoading] = useState(false)



  const onChange = (content) => {
    setPost(content)
  }

  const handlePublish = async () => {
    setLoading(true);
    if (!post || !imgFile || !judul || !date ) {
      toast.error("Mohon mengisi semua kolom sebelum publish")
      setLoading(false);
      return;
    }

    try {
      await createBerita(judul, imgFile, post, date)
      toast.success("Sukses")
      setLoading(false)
      route.push("/dashboard/berita")
    } catch (error) {
      console.log("Error saat publish berita")
      toast.error("Terjadi error. COba lagi!")
    }
    
  }

  

  return (
    <div className="bg-muted/50 min-h-[100vh] flex flex-col flex-1 rounded-xl md:min-h-min p-6">
      <div className='flex flex-row justify-between items-center'>
        <Link href={"/dashboard/berita"} className='flex max-w-sm flex-row gap-3 items-center hover:text-gray-300 group'>
          <ArrowLeft className='text-white group-hover:text-gray-300' />
          <span>Kembali</span>
        </Link>
        <div className='flex flex-row items-center justify-end gap-2'>
          <Button disabled={loading} onClick={handlePublish} className={"bg-amber-300 hover:bg-amber-400 hover:cursor-pointer"}>Publish</Button>
        </div>
      </div>

      <div className='w-full flex flex-row items-center gap-7 py-5'>
          <span className='text-lg text-white'>Judul</span>
          <div className="relative w-full">
              <Input
                  type="text"
                  placeholder="Judul Berita"
                  className="pr-10 text-white"
                  onChange={(e) => setJudul(e.target.value)}
              />
          </div>
          <span className='text-lg text-white'>Tanggal</span>
          <Calendar22 date={date} setDate={setDate} />
      </div>

      <div className="flex-1 flex flex-col">
        <TextEditor content={post} onChange={onChange} />

        <div className='flex justify-center w-full mt-3'>
          <ImagePicker onChange={setImgFile} />
        </div>
      </div>

    </div>
  )
}

export default CreateBeritaPage