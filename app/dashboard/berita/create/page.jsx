import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CreateBeritaPage = () => {
  return (
    <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-6">
    <Link href={"/dashboard/berita"} className='flex flex-row gap-3 items-center'>
      <ArrowLeft className='text-white' />
      <span>Kembali</span>
    </Link>
    </div>
  )
}

export default CreateBeritaPage