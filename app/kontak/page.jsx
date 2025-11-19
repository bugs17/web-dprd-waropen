import HeaderPages from '@/components/custom/header-pages'

const KontakPage = () => {
  return (
    <>
        <HeaderPages title={"Kontak"} />
        <div className='flex flex-col gap-2 items-center justify-center w-full lg:p-20 mb-10 lg:mb-0'>
            <p className='lg:font-semibold lg:text-lg text-base text-white'>Alamat Sekretariat DPRK Waropen :</p>
            <p className='font-mono lg:text-lg text-base text-white'>Jl. Samratulangi depan masjid agung</p>
            <p className='font-mono lg:text-lg text-base text-white'>Telp. (0123) 33219</p>
            <p className='font-mono lg:text-lg text-sm text-white'>Email : <a className='text-blue-400' href='mailto:setwan@kabupatenwaropen.go.id'>setwan@kabupatenwaropen.go.id</a></p>
            <p className='font-mono lg:text-lg text-sm text-white'>Website : <a className='text-blue-400' target='_blank' href='dprk.kabupatenwaropen.go.id'>dprk.kabupatenwaropen.go.id</a></p>
        </div>
    </>
  )
}

export default KontakPage