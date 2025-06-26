import { BookText, FolderOpenDot, HandCoins, Headset, Landmark, MoveUpRight, Newspaper, Users } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'



const ItemComponen = ({title, desc, icon, link, imgUrl}) => {
    return (
        <div className="h-60 border-[1px] border-transparent relative overflow-hidden group" style={{borderImage: 'linear-gradient(to right, #fff, #f0c400) 1'}} >
            <div
                className={`
                absolute inset-0 z-0
                bg-cover bg-center
                opacity-0 group-hover:opacity-60
                translate-x-[-100%] group-hover:translate-x-0
                transition-all duration-300
                `}
                style={{
                backgroundImage: `url(${imgUrl})`,
            }}
            />

            {/* Overlay hitam ke merah dari kiri bawah ke kanan atas */}
            <div
                className="
                absolute inset-0 z-0
                opacity-0 group-hover:opacity-100
                bg-black/70
                transition-opacity duration-300
                pointer-events-none
                "
            />

            <img draggable={false} src='/patern.png' className='absolute select-none z-0 opacity-40 left-[-200px] bottom-[-150px]' />

            <div className='relative w-full px-10 pt-14 z-10'>
                <div className='flex flex-row justify-between'>
                    <div>
                        <span className='text-white text-2xl font-semibold group-hover:text-amber-500'>{title}</span>
                        <p className='text-white'>{desc}</p>
                    </div>
                    {icon}
                </div>

                <Button className="mt-3 rounded-none cursor-pointer hover:bg-amber-500 group/btn1 flex flex-row items-center gap-4">
                    <span className='text-amber-500 group-hover/btn1:text-white'>Selengkapnya</span>
                    <MoveUpRight size={18} className='text-amber-500 group-hover/btn1:text-white' />
                </Button>
            </div>
        </div>
    )
}

const data = [
    {
        "titile": "Berita",
        "desc": "Informasi Berita Kegiatan DPR Terkini",
        "icon" : <Newspaper size={24}  className='group-hover:text-amber-500 text-white'/>,
        "imgUrl":"/news.jpeg",
        "link": "link",
    },
    {
        "titile": "Anggota DPRK",
        "desc": "Informasi Anggota DPRK Waropen",
        "icon" : <Users size={24}  className='group-hover:text-amber-500 text-white'/>,
        "imgUrl":"/2.jpeg",
        "link": "link",
    },
    {
        "titile": "Produk Hukum",
        "desc": "Informasi Tentang Produk Hukum",
        "icon" : <FolderOpenDot size={24}  className='group-hover:text-amber-500 text-white'/>,
        "imgUrl":"/3.jpeg",
        "link": "link",
    },
    {
        "titile": "Pengaduan ke Wakil Anda",
        "desc": "Layanan Pengaduan Langsung ke DPRK",
        "icon" : <Headset size={24}  className='group-hover:text-amber-500 text-white'/>,
        "imgUrl":"/5.jpeg",
        "link": "link",
    },
    {
        "titile": "Sekretariat DPRK",
        "desc": "Profil Sekretariat DPRK",
        "icon" : <Landmark size={24}  className='group-hover:text-amber-500 text-white'/>,
        "imgUrl":"/4.jpeg",
        "link": "link",
    },
    {
        "titile": "Laporan Keuangan",
        "desc": "Akses Dokumen Laporan Keuangan DPRK",
        "icon" : <HandCoins size={24}  className='group-hover:text-amber-500 text-white'/>,
        "imgUrl":"/6.jpeg",
        "link": "link",
    },
    
]

const LayananCepat = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
        {data.map((item, index) => (
            <ItemComponen key={index} title={item.titile} desc={item.desc} icon={item.icon} imgUrl={item.imgUrl} />
        ))}
    </div>
  )
}

export default LayananCepat