import { Facebook, icons, Instagram, Twitter, Youtube } from "lucide-react"
import Agenda from "./client-component/agenda"
import Link from "next/link"


const sosialMedia = [
    {
        nama: "Facebook",
        link: "#",
        icon: <Facebook className="text-amber-500" />
    },
    {
        nama: "Instagram",
        link: "#",
        icon: <Instagram className="text-amber-500" />
    },
    {
        nama: "Twitter",
        link: "#",
        icon: <Twitter className="text-amber-500" />
    },
    {
        nama: "Youtube",
        link: "#",
        icon: <Youtube className="text-amber-500" />
    }
    
]

const AgendaAndSosialMedia = () => {
  return (
    <div className='flex flex-row w-full px-10 gap-8'>

    <div className='w-[70%] pl-5 pt-12 gap-8 flex flex-col'>
        <div className='flex flex-col gap-2'>
            <span className='text-3xl font-semibold text-white'>AGENDA HARI INI</span>
            <div className="h-1 w-full bg-gradient-to-r from-orange-300 to-amber-500" />
        </div>

        <Agenda />
        
    </div>

    <div className='w-[30%] pt-12 flex flex-col '>
        <div className='flex flex-col gap-2 mb-[32px]'>
            <span className='text-3xl font-semibold text-white'>SOSIAL MEDIA</span>
            <div className="h-1 w-full bg-gradient-to-r from-amber-500 to-orange-300" />
        </div>


        {
            sosialMedia.map((item, index) => (
            <div key={index} className="w-full h-24 mb-[32px] bg-[#231c26] flex flex-row items-center pl-6 gap-4">
                {item.icon}
                <Link href={item.link} className="text-white font-mono text-lg underline hover:text-violet-500">{item.nama}</Link>
            </div>
            ))
        }
    </div>

    </div>
  )
}

export default AgendaAndSosialMedia