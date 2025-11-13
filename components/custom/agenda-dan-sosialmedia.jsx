import { Facebook, icons, Instagram, Twitter, Youtube } from "lucide-react"
import Agenda from "./client-component/agenda"
import Link from "next/link"
import { prisma } from "@/lib/db"




const AgendaAndSosialMedia = async () => {

    const data = await prisma.kontak.findFirst()
    const sosialMedia = [
    {
        nama: "Facebook",
        link: data?.facebook || "#",
        icon: <Facebook className="text-amber-500" />
    },
    {
        nama: "Instagram",
        link: data?.instagram || "#",
        icon: <Instagram className="text-amber-500" />
    },
    {
        nama: "Twitter",
        link: data?.twitter || "#",
        icon: <Twitter className="text-amber-500" />
    },
    {
        nama: "Youtube",
        link: data?.youtube || "#",
        icon: <Youtube className="text-amber-500" />
    }
    
]

  return (
    <div className='flex flex-col w-full lg:px-10 px-3 mt-10 gap-3'>


        <div className='flex flex-col gap-2 mb-[32px]'>
            <span className='lg:text-3xl text-md font-semibold text-white'>SOSIAL MEDIA</span>
            <div className="h-1 w-full bg-gradient-to-r from-amber-500 to-orange-300" />
        </div>

        <div className=' w-full flex flex-row gap-5'>
            {
                sosialMedia.map((item, index) => (
                <div key={index} className="w-full h-24 mb-[32px] bg-[#231c26] flex flex-row items-center pl-6 gap-4">
                    {item.icon}
                    <Link href={item.link} target="_blank" className="text-white font-mono text-lg underline hover:text-violet-500">{item.nama}</Link>
                </div>
                ))
            }
        </div>

    </div>
  )
}

export default AgendaAndSosialMedia