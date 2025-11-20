import HeaderPages from '@/components/custom/header-pages'
import { prisma } from '@/lib/db';

export const revalidate = 0;


export const generateMetadata = () => {
    return {
        title: 'Struktur Organisasi | DPRK WAROPEN',
    };
};

const StrukturOragnisasiPage = async () => {

  const data = await prisma.setwan.findFirst()

  return (
    <>
        <HeaderPages title={"Struktur Organisasi"} />
        <div className='w-full justify-center flex'>
            {/* <span className='text-white text-center '>Susunan Organisasi Sekretariat DPRK sebagai berikut :</span> */}
            {data && (<img
              src={`/api/struktur/image/${data?.urlImageStrukturOrganisasi}`}
              alt="Preview"
              className="w-100 h-auto object-cover"
            />)}
        </div>
    </>
  )
}

export default StrukturOragnisasiPage