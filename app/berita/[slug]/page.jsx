"use client"
import HeaderPages from '@/components/custom/header-pages'
import Image from 'next/image'
import { useParams } from 'next/navigation'

const DetailBerita = () => {
  const params = useParams()
  const slug = params.slug
  return (
    <>
      <HeaderPages title={"Tom Lembong Ditetapkan Sebagai Tersangka Korupsi"} />

      <div className='flex flex-row w-full gap-5'>

      <div className='w-[70%] bg-purple-400'>haloo</div>
      <div className='w-[30%] bg-amber-200'></div>

      </div>
    </>
  )
}

export default DetailBerita