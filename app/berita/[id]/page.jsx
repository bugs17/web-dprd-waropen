
import ShareBeritaComponent from '@/components/custom/client-component/share-berita'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { prisma } from '@/lib/db'
import { formatTanggalIndo } from '@/lib/formatDate'
import { truncateText } from '@/lib/trunc-kalimat'
import { Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 0;


export const generateMetadata = async () => {

    const title = "Berita | DPRK WAROPEN"
        return {
            title: title,
        };
    };

    

const DetailBerita = async ({params}) => {
  // const params = useParams()
  const {id} = await params

  let berita;
  try {
    berita = await prisma.berita.findFirst({
      where:{
        id:parseInt(id)
      }
    })
  } catch (error) {
    console.log(error.message)
  }

  let beritas;
  try {
    beritas = await prisma.berita.findMany({
      where:{
        NOT:{
          id: berita.id
        }
      },
      orderBy:{
        createdAt:'desc'
      },
      take: 3
    })
  } catch (error) {
    
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
              <span className='text-white lg:text-sm text-xs'>{formatTanggalIndo(berita.createdAt)}</span>
            </div>

            <ShareBeritaComponent />
          </div>

          <h1 className='text-white font-bold text-center mb-8 text-2xl lg:text-5xl'>{berita.judul}</h1>

          <div className="w-full relative overflow-hidden mb-8 aspect-[3/2] md:aspect-[16/9] lg:aspect-[16/9]" >
            <Image
              src={`/api/berita/image/${berita.imageUrl}`}
              alt={berita.judul}
              fill
              style={{ objectFit: 'contain' }} // atau 'cover'
            />
          </div>

          
          <div
              dangerouslySetInnerHTML={{ __html: berita.isi }}
              className="[&>p]:mb-4 [&>p]:leading-relaxed"
            ></div>
        </div>


        
        {beritas.length > 0  && (
          <>
            <div className='w-full border-b-2 border-amber-300'>
              <span className='font-bold text-lg text-amber-300'>BERITA LAINNYA</span>
            </div>

            <div className="flex flex-wrap w-full">
              {beritas.map((b, i) => (
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