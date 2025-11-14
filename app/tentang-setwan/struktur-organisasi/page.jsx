import HeaderPages from '@/components/custom/header-pages'


export const generateMetadata = () => {
    return {
        title: 'Struktur Organisasi | DPRK WAROPEN',
    };
};

const StrukturOragnisasiPage = () => {
  return (
    <>
        <HeaderPages title={"Struktur Organisasi"} />
        <div className='w-full justify-center flex'>
            <span className='text-white text-center '>Susunan Organisasi Sekretariat DPRK sebagai berikut :</span>
        </div>
    </>
  )
}

export default StrukturOragnisasiPage