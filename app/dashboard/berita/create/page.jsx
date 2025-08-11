
import TextEditor from '@/components/custom/client-component/text-editor'
import { Input } from '@/components/ui/input'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CreateBeritaPage = () => {
  return (
    <div className="bg-muted/50 min-h-[100vh] flex flex-col flex-1 rounded-xl md:min-h-min p-6">
      <Link href={"/dashboard/berita"} className='flex flex-row gap-3 items-center hover:text-gray-300 group'>
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
      </div>

      <div className="flex-1 flex flex-col">
        <TextEditor />
      </div>

    </div>
  )
}

export default CreateBeritaPage