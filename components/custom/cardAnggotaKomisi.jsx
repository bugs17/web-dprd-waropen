import Image from 'next/image'

const CardAnggotaKomisi = ({nama, komisi, status, urlImage}) => {
  return (
    <div className="flex-1 bg-[#231c26] hover:cursor-pointer group hover:shadow-violet-200  shadow rounded lg:pt-0 pt-5 h-96  overflow-hidden">
            <div className="flex lg:flex-row md:flex-row flex-col w-full h-full overflow-hidden">
                <div className="lg:w-[40%] w-full group-hover:w-[50%] transition-all duration-300 ease-in-out h-full overflow-hidden">
                    <Image 
                        alt={nama} 
                        className="lg:object-cover object-contain h-full w-full" 
                        height={300} 
                        width={300} 
                        src={`/api/anggota-dewan/image/${urlImage}`}  
                        />
                </div>
                <div className="lg:w-[60%] w-full group-hover:w-[50%] transition-all duration-300 ease-in-out h-full py-5 px-2 flex flex-col">

                    <div className="w-full h-[50%] flex lg:justify-normal justify-center items-center lg:items-start flex-col lg:gap-2">
                        <span className="text-white font-semibold text-lg">{nama}</span>
                        <div className="flex flex-row items-center gap-1">
                            <span className="text-sm text-amber-200">{komisi}</span>
                        </div>
                    </div>

                    <div className="w-full lg:h-[50%] h-[40%] flex items-end">
                        <div className="w-full py-5 border-t-2 border-t-zinc-500 text-white text-sm text-center">
                            {status}
                        </div>
                    </div>

                </div>
            </div>
        </div>
  )
}

export default CardAnggotaKomisi