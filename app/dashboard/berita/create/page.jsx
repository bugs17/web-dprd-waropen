
"use client"
import { Calendar22 } from '@/components/custom/client-component/date-picker'
import ImagePicker from '@/components/custom/client-component/pilih-gambar'
import TextEditor from '@/components/custom/client-component/text-editor'
import { Input } from '@/components/ui/input'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

const CreateBeritaPage = () => {

  const [post, setPost] = useState("")
  const [imgFile, setImgFile] = useState(null)
  const [date, setDate] = useState(undefined)

  const onChange = (content) => {
    setPost(content)
    console.log(content)
  }

  return (
    <div className="bg-muted/50 min-h-[100vh] flex flex-col flex-1 rounded-xl md:min-h-min p-6">
      <Link href={"/dashboard/berita"} className='flex max-w-sm flex-row gap-3 items-center hover:text-gray-300 group'>
        <ArrowLeft className='text-white group-hover:text-gray-300' />
        <span>Kembali</span>
      </Link>
      <div className='w-full flex flex-row items-center gap-10 py-5'>
          <span className='text-lg text-white'>Judul</span>
          <div className="relative w-full">
              <Input
                  type="text"
                  placeholder="Judul Berita"
                  className="pr-10 text-white"
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