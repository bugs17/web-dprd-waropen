"use client"

import { getBerita } from "@/action/get-berita"
import { Construction } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"


function Card({imgUrl, judul, update, urlBerita}){
    return (
            <Link href={urlBerita} className="relative group h-60 w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(25%-0.75rem)] overflow-hidden hover:shadow-amber-100 hover:shadow-sm" style={{backgroundImage: `url(${imgUrl})`, backgroundSize:'cover', backgroundPosition: 'center',}}>
                <div
                className="
                    absolute inset-0 z-0
                    bg-gradient-to-t from-black/100 to-transparent
                    transition-opacity duration-300
                    pointer-events-none
                "
                />

                <div className='relative flex flex-col z-30 h-full w-full gap-2 justify-end px-6 pb-6'>
                    <span className='text-xl group-hover:text-amber-300 font-semibold text-white'>{judul}</span>
                    <p className='text-sm text-slate-400'>{update}</p>
                </div>

            </Link>
    )
}


const BeritaHomeComponent = () => {

    const [data, setData] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            const newData = await getBerita()
            if (newData) {
                setData(newData)
            }
        }
        fetchData()
    }, [])

  return (
    <div className="flex flex-wrap justify-center gap-3 px-6 pb-11 bg-[#231c26]">

        {data.length > 0 ? 
            
            data.map((item, index) => (
                <Card key={index} imgUrl={`/api/berita/image/${item.imageUrl}`} judul={item.judul} update={new Date(item.updatedAt).toLocaleString('id-ID', {day: 'numeric',month: 'long',year: 'numeric'})} urlBerita={`/berita/${item.id}`} />
            ))
        :
        (
            <>
                <Construction className=" text-zinc-400" />
                <span className="text-center text-zinc-400">Belum ada berita</span>
            </>
        )
        }
    </div>
  )
}

export default BeritaHomeComponent