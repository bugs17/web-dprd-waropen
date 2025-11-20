import HeaderPages from '@/components/custom/header-pages'
import { prisma } from '@/lib/db'
import { headers } from 'next/headers'

export const revalidate = 0;


const KontakPage = async () => {
  const host = headers().get('host')
  const kontak = await prisma.kontak.findFirst()

  return (

    <>
        <HeaderPages title={"Kontak"} />
        <div className='flex flex-col gap-2 items-center justify-center w-full lg:p-20 mb-10 lg:mb-0'>
            <p className='lg:font-semibold lg:text-lg text-base text-white'>Alamat Sekretariat DPRK Waropen :</p>
            <p className='font-mono lg:text-lg text-base text-white'>{kontak?.alamat || "-"}</p>
            <p className='font-mono lg:text-lg text-base text-white'>Telp. {kontak?.telp || "-"}</p>
            <p className='font-mono lg:text-lg text-sm text-white'>Email : <a className='text-blue-400' href={`mailto:${kontak?.email || "#"}`}>{kontak?.email || "-"}</a></p>
            <p className='font-mono lg:text-lg text-sm text-white'>Website : <a className='text-blue-400' target='_blank' href={host}>{host}</a></p>
        </div>
    </>
  )
}

export default KontakPage