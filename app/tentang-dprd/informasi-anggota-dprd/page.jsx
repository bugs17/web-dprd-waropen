import CardPerson from "@/components/custom/cardPerson";
import HeaderPages from "@/components/custom/header-pages";

const page = () => {


  return (
    <>
    <HeaderPages title={"Anggota Dewan Perwakilan Rakyat Kabupaten Waropen"} />

    <div className='w-full bg-[#110e12] pt-5 pb-5 lg:px-16 px-10'>
        <div className="w-full flex lg:flex-row flex-col-reverse mb-8">
            <div className="flex flex-col lg:w-[70%] w-full ">
                <span className="text-white lg:text-xl text-base font-semibold">Semua Anggota DPRK Waropen</span>
                {/* <span className="text-gray-300 text-base font-mono">Menampilkan <span className="text-white font-semibold">{anggotaDewan.length} Anggota</span></span> */}
            </div>

        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            <CardPerson />
        </div>
    </div>
    </>
  )
}

export default page