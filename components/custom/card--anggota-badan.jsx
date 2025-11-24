import Image from 'next/image'

const CardAnggotaBadan = ({nama, badan, status, index, urlImage}) => {
  return (
    <div className="flex-1 bg-[#231c26] hover:cursor-pointer group hover:shadow-violet-200  shadow rounded h-96 overflow-hidden">
            <div className="flex lg:flex-row flex-col w-full h-full overflow-hidden">
                <div className="lg:w-[40%] w-full group-hover:w-[50%] transition-all duration-300 ease-in-out h-full overflow-hidden">
                    <Image alt={nama} className="lg:object-cover object-contain lg:pt-0 pt-5 h-full w-full" height={300} width={300} src={urlImage}  />
                </div>
                <div className="lg:w-[60%] w-full group-hover:w-[50%] transition-all duration-300 ease-in-out h-full py-5 px-2 flex flex-col">

                    <div className="w-full h-[50%] items-center lg:items-start flex flex-col gap-2">
                        <span className="text-white font-semibold lg:text-lg text-lg uppercase">{nama}</span>
                        <div className="flex flex-row items-center gap-1">
                            <span className="lg:text-sm text-xs uppercase text-gray-200">{badan}</span>
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

export default CardAnggotaBadan