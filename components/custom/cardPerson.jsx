import { toSlug } from '@/lib/toSlug'
import Image from 'next/image'
import Link from 'next/link'

const CardPerson = ({nama, komisi, fraksi, index}) => {
  return (
        <Link href={`/tentang-dprd/detail-anggota-dprk/${toSlug(nama)}`} className="flex-1 bg-[#231c26] hover:cursor-pointer group hover:shadow-violet-200  shadow rounded h-96 overflow-hidden">
            <div className="flex flex-row w-full h-full overflow-hidden">
                <div className="w-[40%] group-hover:w-[50%] transition-all duration-300 ease-in-out h-full overflow-hidden">
                    <Image alt="foto anggota dprk waropen" className="object-cover h-full w-full" height={300} width={300} src={"/person.jpg"}  />
                </div>
                <div className="w-[60%] group-hover:w-[50%] transition-all duration-300 ease-in-out h-full py-5 px-2 flex flex-col">

                    <div className="w-full h-[50%] flex flex-col gap-2">
                        <span className="text-white font-semibold text-lg">{nama}</span>
                        <div className="flex flex-row items-center gap-1">
                            <span className="text-sm text-gray-200">{komisi}</span>
                        </div>
                    </div>

                    <div className="w-full h-[50%] flex items-end">
                        <div className="w-full py-5 border-t-2 border-t-amber-500 text-white text-sm">
                            {fraksi}
                        </div>
                    </div>

                </div>
            </div>
        </Link>
    )
}

export default CardPerson