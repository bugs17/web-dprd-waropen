import Link from 'next/link'
import React from 'react'


const Card = ({imgUrl, judul, update, urlBerita}) => {
    return (
            <Link href={'/'} className="relative h-60 w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(25%-0.75rem)] overflow-hidden hover:shadow-amber-100 hover:shadow-sm" style={{backgroundImage: `url(${imgUrl})`, backgroundSize:'cover', backgroundPosition: 'center',}}>
                <div
                className="
                    absolute inset-0 z-0
                    bg-gradient-to-t from-black/100 to-transparent
                    transition-opacity duration-300
                    pointer-events-none
                "
                />

            <div className='relative flex flex-col z-30 h-full w-full gap-2 justify-end px-6 pb-6'>
                <span className='text-xl font-semibold text-white'>{judul}</span>
                <p className='text-sm text-slate-400'>{update}</p>
            </div>

            </Link>
    )
}

const data = [
    {
        "imgUrl": '/6.jpeg',
        "judul":"Anggota DPRD Menyelenggarakan pertemuan.",
        "update":'12-12-2025'
    },
    {
        "imgUrl": '/7.jpeg',
        "judul":"Anggota DPRD Menyelenggarakan pertemuan.",
        "update":'12-12-2025'
    },
    {
        "imgUrl": '/4.jpeg',
        "judul":"Anggota DPRD Menyelenggarakan pertemuan.",
        "update":'12-12-2025'
    },
    {
        "imgUrl": '/5.jpeg',
        "judul":"Anggota DPRD Menyelenggarakan pertemuan.",
        "update":'12-12-2025'
    },
    {
        "imgUrl": '/6.jpeg',
        "judul":"Anggota DPRD Menyelenggarakan pertemuan.",
        "update":'12-12-2025'
    },
    {
        "imgUrl": '/6.jpeg',
        "judul":"Anggota DPRD Menyelenggarakan pertemuan.",
        "update":'12-12-2025'
    },
    {
        "imgUrl": '/6.jpeg',
        "judul":"Anggota DPRD Menyelenggarakan pertemuan.",
        "update":'12-12-2025'
    },
    
]

const BeritaHome = () => {
  return (
    <div className="flex flex-wrap justify-center gap-3 px-6 pb-11 bg-[#231c26]">
        {data.map((item, index) => (
            <Card key={index} imgUrl={item.imgUrl} judul={item.judul} update={item.update} />
        ))}
    </div>
  )
}

export default BeritaHome