"use client"
import HeaderPages from '@/components/custom/header-pages'
import { Clock, Facebook, Link2, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const DetailBerita = () => {
  const params = useParams()
  const slug = params.slug
  return (
    <>
      {/* <HeaderPages title={"Tom Lembong Ditetapkan Sebagai Tersangka Korupsi"} /> */}

      <div className='flex w-full gap-5'>

      <div className='w-full px-16 py-10'>
        <div className='w-full bg-[#231c26] px-10 mb-10'>
          <div className='w-full border-b hidden  border-amber-300 lg:flex lg:flex-row justify-between py-2 mb-8'>
            <div className='flex flex-row gap-2 items-center'>
              <Clock className='text-white' size={16} />
              <span className='text-white text-sm'>04 Agustus 2025</span>
            </div>
            <div className='flex flex-row gap-2 items-center'>
              <span className='text-white text-sm'>Bagikan melalui</span>
              <div className='border border-white rounded-full p-1'>
                <Link2 className='text-white' size={18} />
              </div>
              <div className='border border-white rounded-full p-1'>
                <Facebook className='text-white' size={18} />
              </div>
              <div className='border border-white rounded-full p-1'>
                <Twitter className='text-white' size={18} />
              </div>
              
            </div>
          </div>

          <h1 className='text-white font-bold text-center mb-8 text-3xl'>Tom Lembong Ditetapkan Sebagai Tersangka Korupsi</h1>

          <div className="w-full relative overflow-hidden mb-8" style={{ aspectRatio: '16/9' }}>
            <Image
              src="/tomlembong.jpeg"
              alt="tom lembong"
              fill
              style={{ objectFit: 'contain' }} // atau 'cover'
            />
          </div>

          <div className='flex flex-col gap-5 w-full'>
            <p className='text-white text-left text-xl'>
              <span className='font-bold'>Lorem ipsum dolor sit amet,</span> consectetur adipiscing elit. Sed vitae sapien finibus, tristique enim in, auctor est. Suspendisse consequat ullamcorper odio. Donec vulputate metus vel nunc malesuada, ac lacinia ligula rutrum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla dui urna, dapibus eu nulla eu, molestie laoreet eros. Suspendisse potenti. Vestibulum urna lorem, feugiat ut porttitor mollis, scelerisque sed nibh.
            </p>
            <p className='text-white text-left text-xl'>
              Nullam vulputate ante vitae augue auctor, vitae tempor enim cursus. Donec at justo id diam malesuada maximus id molestie ipsum. Aenean ut orci eget est pretium ullamcorper a et ligula. Pellentesque semper est in posuere fringilla. Aenean viverra est congue sodales mollis. In hac habitasse platea dictumst. Nulla vitae augue quis lacus molestie fringilla. In a tristique nibh, sed faucibus libero. Nam nulla magna, porttitor ut lorem non, tincidunt consequat lorem. Duis eget varius libero. Sed id massa molestie, condimentum tellus vel, tincidunt eros.
            </p>
            <p className='text-white text-left text-xl'>
              Sed et viverra erat. Nam ut imperdiet elit. Nullam ac sodales mi. Curabitur laoreet nunc vitae orci imperdiet feugiat. Fusce ut ante commodo, sagittis erat sit amet, aliquet nunc. Vivamus maximus mattis quam, eu tempor massa euismod in. Vestibulum aliquam enim eros, nec convallis dolor pulvinar in. Sed lobortis condimentum est, et feugiat arcu fringilla in. Donec efficitur faucibus risus, et fringilla lorem commodo eu. Maecenas congue, sapien bibendum venenatis laoreet, leo eros finibus dolor, id venenatis risus lectus at risus. Vivamus pellentesque nibh nisi, non mattis nunc cursus nec. Pellentesque et dui volutpat, ultrices purus eu, congue purus. Maecenas ultricies est et dapibus hendrerit. Maecenas sit amet eros sit amet nibh facilisis feugiat.
            </p>

          </div>
        </div>

        <div className='w-full border-b-2 border-amber-300'>
          <span className='font-bold text-lg text-amber-300'>BERITA LAINNYA</span>
        </div>

        <div className="flex flex-wrap w-full">
          {Array(3).fill(0).map((_, i) => (
            <Link
              key={i}
              href="#"
              className="w-full lg:w-1/3 h-60 p-4 overflow-hidden group"
            >
              <div className="relative w-full h-full overflow-hidden rounded-lg">
                <Image
                  src="/tomlembong.jpeg"
                  alt="Tom Lembong"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white text-lg font-semibold">
                    Judul Artikel di Sini
                  </h3>
                  <span className="text-white text-xs font-mono">
                    Senin, 12-Juni-2025
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      

      </div>
    </>
  )
}

export default DetailBerita