
"use client"
import { getDetailBerita } from '@/action/get-detail-berita'
import ShareBeritaComponent from '@/components/custom/client-component/share-berita'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { formatTanggalIndo } from '@/lib/formatDate'
import { truncateText } from '@/lib/trunc-kalimat'
import { Clock, Loader } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'




const DetailBerita = () => {
  const params = useParams()
  const id =  params.id

  const [beritaState, setBeritaState] = useState(null)
  const [beritasState, setBeritasState] = useState([])


  const fecthData = async () => {
    const {berita, beritas} = await getDetailBerita(id)
    if (berita) {
      setBeritaState(berita)
    }
    if (beritas.length > 0) {
      setBeritasState(beritas)
    }
  }

  useEffect(() => {
    document.title = "Berita | DPRK WAROPEN"
    fecthData()
  },[])

  if (beritaState === null) {
    return (
      <div className='w-full justify-center items-center'>
          <Loader className='text-amber-500 animate-spin' />
      </div>
    )
  }

  
  
  return (
    <>
      {/* <HeaderPages title={"Tom Lembong Ditetapkan Sebagai Tersangka Korupsi"} /> */}

      <div className='flex w-full gap-5'>

      <div className='w-full lg:px-16 lg:py-10'>

        {/* berita */}
        <div className='w-full bg-[#231c26] pb-10 pt-8 lg:px-10 px-3 mb-10'>
          <div className='w-full border-b  border-amber-300 flex flex-row justify-between py-2 mb-8'>
            <div className='flex flex-row gap-2 items-center'>
              <Clock className='text-white' size={16} />
              <span className='text-white lg:text-sm text-xs'>{formatTanggalIndo(beritaState.createdAt)}</span>
            </div>

            <ShareBeritaComponent />
          </div>

          <h1 className='text-white font-bold text-center mb-8 text-2xl lg:text-5xl'>{beritaState.judul}</h1>

          <div className="w-full relative overflow-hidden mb-8 aspect-[3/2] md:aspect-[16/9] lg:aspect-[16/9]" >
            <Image
              src={`/api/berita/image/${beritaState.imageUrl}`}
              alt={beritaState.judul}
              fill
              style={{ objectFit: 'contain' }} // atau 'cover'
            />
          </div>

          
          <div
              dangerouslySetInnerHTML={{ __html: beritaState.isi }}
              className="[&>p]:mb-4 [&>p]:leading-relaxed"
            ></div>
        </div>


        
        {beritasState.length > 0  && (
          <>
            <div className='w-full border-b-2 border-amber-300'>
              <span className='font-bold text-lg text-amber-300'>BERITA LAINNYA</span>
            </div>

            <div className="flex flex-wrap w-full">
              {beritasState.map((b, i) => (
                <Link
                  key={i}
                  href={`/berita/${b.id}`}
                  className="w-full lg:w-1/3 h-60 p-4 overflow-hidden group"
                >
                  <div className="relative w-full h-full overflow-hidden rounded-lg">
                    <Image
                      src={`/api/berita/image/${b.imageUrl}`}
                      alt={b.judul}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                      <div>
                        <Tooltip>
                          <TooltipTrigger>
                            <h3 className="text-white text-lg font-semibold">
                              {truncateText(b.judul,35)}
                            </h3>
                          </TooltipTrigger>
                          <TooltipContent>
                            {b.judul}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <span className="text-white text-xs font-mono">
                        {formatTanggalIndo(b.createdAt)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}



      </div>
      

      </div>
    </>
  )
}

export default DetailBerita