"use client"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ArrowUpRight, ChevronRight, Facebook, Instagram, Menu, Twitter } from "lucide-react"
import { motion } from "framer-motion"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import Link from "next/link"

const menuItems = [
  {
      title:'Beranda',
      match:'/',
      path:'/'
  },
  {
      title:'Tentang DPRK',
      subMenu: [
          {
              title:'Informasi Anggota DPRK',
              path:'/tentang-dprd/informasi-anggota-dprd',
              desc:'Informasi tentang jajaran anggota DPRK'
          },
          {
              title:'Komisi',
              path:'/tentang-dprd/komisi',
              desc:'Informasi tentang komisi DPRK'
          },
          {
              title:'Badan',
              desc:'Informasi tentang badan DPRK',
              path:'/tentang-dprd/badan'
          },
          {
              title:'Fraksi',
              desc:'Informasi tentang fraksi DPRK',
              path:'/tentang-dprd/fraksi'
          },
      ]
  },
  {
      title:'Tentang SETWAN',
      subMenu: [
          {
              title:'Profil Sekretariat DPRK',
              path:'/tentang-setwan/profil-sekretariat-dprk',
              desc:'Informasi tentang profil sekretariat'
          },
          {
              title:'Visi & Misi',
              desc:'Informasi tentang visi-misi sekretariat dprk',
              path:'/tentang-setwan/visi-misi'
          },
          {
              title:'Struktur Organisasi',
              desc:'Informasi tentang struktur organisasi sekretariat dprk',
              path:'/tentang-setwan/struktur-organisasi'
          }
      ]
  },
  {
      title:'Dokumen',
      subMenu: [
          {
              title:'Laporan Keuangan DPRK',
              path:'/dokumen/laporan-keuangan',
              desc:'Informasi tentang dokumen laporan keuangan DPRK'
          },
          {
              title:'Rencana Strategis DPRK',
              desc:'Informasi tentang rencana strategis dprk',
              path:'/dokumen/rencana-strategis'
          },
          {
              title:'Dokumen Publikasi',
              desc:'Informasi tentang dokumen publikasi dprk',
              path:'/dokumen/dokumen-publikasi'
          },
          {
              title:'Produk Hukum',
              desc:'Informasi tentang produk hukum dprk',
              path:'/dokumen/produk-hukum'
          },
      ]
  },
  {
      title:'Berita',
      path:'/berita'
  },
  {
      title:'Lainnya',
      subMenu: [
          {
              title:'Galery',
              path:'/galery',
              desc:'Kumpulan file media tentang DPRK'
          },
          {
              title:'Kontak',
              desc:'Informasi kontak',
              path:'/kontak'
          },
          {
              title:'Pengaduan ke DPRK',
              desc:'Aduan atau Aspirasi terkait dengan fungsi atau tugas DPRK',
              path:'/pengaduan-dprk'
          },
          {
              title:'Pengaduan ke Pemerintah Daerah',
              desc:'Aduan ataupun Aspirasi kepada pemerintah daerah.',
              path:'/pengaduan-pemda'
          },
      ]
  },
]


const SideBarMobile = () => {

  const currentYear = new Date().getFullYear()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <motion.div
        initial={{opacity:0, x:100}}
        animate={{opacity:1, x:0}}
        transition={{
            type:'spring',
            stiffness:100,
            damping:25,
            delay:0.3,
            duration:1.2
        }}
        className='lg:hidden px-3 items-center justify-end flex h-full'>
          <Menu size={32} className='text-[#f0c400]' />
        </motion.div>
      </SheetTrigger>
      <SheetContent className="bg-[#231c26] border-none" side="left">
        <SheetHeader>
          <SheetTitle className="text-white">Menu</SheetTitle>
        </SheetHeader>

        <div className="w-full h-full">
          
          {menuItems.map((item, index) => (
            item.subMenu ? (
            <Collapsible key={index} asChild defaultOpen={false} className="group/collapsible" >
                <div className="">
                    <CollapsibleTrigger asChild>
                        <div className="flex flex-row w-full justify-between items-center px-2 mb-3">
                            <span className="text-white">{item.title}</span>
                            <ChevronRight className="ml-auto text-[#f0c400] transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </div>
                    </CollapsibleTrigger>
                    {item.subMenu.map((subitem, subindex) => (
                      <CollapsibleContent key={subindex}>
                        <div className="w-full pl-6 mb-2 ">
                            <SheetClose asChild >
                                <Link className=" text-white flex flex-row items-center gap-2" href={subitem.path}>
                                    <ArrowUpRight className="text-[#f0c400]" size={14} />
                                    <span>{subitem.title}</span>
                                </Link>
                            </SheetClose>
                        </div>
                      </CollapsibleContent>
                    ))}
                </div>
            </Collapsible>
            ) : (
              <SheetClose asChild key={index} >
                  <Link className=" text-white flex flex-row items-center px-2 mb-3" href={item.path}>
                      <span>{item.title}</span>
                  </Link>
              </SheetClose>
            )
          ))}
          
            
        </div>
        
        <SheetFooter className="w-full px-0 pb-0">
          <div className="w-full flex flex-row justify-center gap-8 items-center h-12">
            <Facebook size={20} className="text-[#f0c400] cursor-pointer" />
            <Instagram size={20} className="text-[#f0c400] cursor-pointer" />
            <Twitter size={20} className="text-[#f0c400] cursor-pointer" />
          </div>
          <div className="text-slate-400 text-center text-xs pb-4">
            <span>© {currentYear} DPRK Kabupaten Waropen. All rights reserved.</span>
          </div>
        </SheetFooter>
      <img src="/patern.png" className="absolute pointer-events-none  opacity-5 left-0 bottom-0 h-[350px] w-[800px]" />
      </SheetContent>
    </Sheet>
  )
}

export default SideBarMobile