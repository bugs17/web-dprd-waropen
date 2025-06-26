"use client";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle
  } from "@/components/ui/navigation-menu"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation";


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
                desc:'Informasi tentang komisi DPRK',
                path:'#'
            },
            {
                title:'Badan',
                desc:'Informasi tentang badan DPRK',
                path:'#'
            },
            {
                title:'Fraksi',
                desc:'Informasi tentang fraksi DPRK',
                path:'#'
            },
        ]
    },
    {
        title:'Tentang SETWAN',
        subMenu: [
            {
                title:'Profil Sekretariat DPRK',
                path:'#',
                desc:'Informasi tentang profil sekretariat'
            },
            {
                title:'Visi & Misi',
                desc:'Informasi tentang visi-misi sekretariat dprk',
                path:'#'
            },
            {
                title:'Struktur Organisasi',
                desc:'Informasi tentang struktur organisasi sekretariat dprk',
                path:'#'
            }
        ]
    },
    {
        title:'Dokumen',
        subMenu: [
            {
                title:'Laporan Keuangan DPRK',
                path:'#',
                desc:'Informasi tentang dokumen laporan keuangan DPRK'
            },
            {
                title:'Rencana Strategis DPRK',
                desc:'Informasi tentang rencana strategis dprk',
                path:'#'
            },
            {
                title:'Dokumen Publikasi',
                desc:'Informasi tentang dokumen publikasi dprk',
                path:'#'
            },
            {
                title:'Produk Hukum',
                desc:'Informasi tentang produk hukum dprk',
                path:'#'
            },
        ]
    },
    {
        title:'Berita',
        path:'/'
    },
    {
        title:'Lainnya',
        subMenu: [
            {
                title:'Galery',
                path:'#',
                desc:'Kumpulan file media tentang DPRK'
            },
            {
                title:'Kontak',
                desc:'Informasi kontak',
                path:'#'
            },
            {
                title:'Pengaduan ke DPRK',
                desc:'Aduan atau Aspirasi terkait dengan fungsi atau tugas DPRK',
                path:'#'
            },
            {
                title:'Pengaduan ke Pemerintah Daerah',
                desc:'Aduan ataupun Aspirasi kepada pemerintah daerah.',
                path:'#'
            },
        ]
    },
]

const NavMenu = () => {
    const pathName = usePathname()
  return (
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
    >
        <NavigationMenu viewport={false}>
            <NavigationMenuList>
                
                {menuItems.map((item, index) => (
                    item.subMenu ? (
                        <NavigationMenuItem className={`group/linktitle`} key={index}>
                            <NavigationMenuTrigger className={`bg-transparent  rounded-none text-white hover:bg-none text-md`}>{item.title}</NavigationMenuTrigger>
                                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-[#f0c400] group-hover/linktitle:w-full transition-all duration-300`}></span>
                                
                                <NavigationMenuContent >
                                    <ul className="grid overflow-hidden gap-2 md:w-[400px] lg:w-screen py-5 px-5 fixed  bg-[#231c26] left-0 right-0 lg:grid-cols-[.75fr_1fr]">
                                        
                                        
                                        <li className="row-span-3">
                                            <NavigationMenuLink className={'rounded-none hover:bg-[#f0c400] border-b-[1px] border-dashed border-[#f0c400]'} asChild>
                                            <Link
                                                className=" flex relative  h-full group/link w-full flex-col justify-end rounded-none  p-6 no-underline outline-hidden select-none focus:shadow-md"
                                                href={item.subMenu[0].path}
                                            >
                                                <div className="mt-4 mb-2 group-hover/link:text-black text-white text-lg font-medium">
                                                {item.subMenu[0].title}
                                                </div>
                                                <p className="text-slate-100 group-hover/link:text-black text-sm leading-tight">
                                                {item.subMenu[0].desc}
                                                </p>
                                                <ArrowUpRight size={50} className="text-[#f0c400] absolute right-4 top-3 transition-all duration-300 group-hover/link:text-black" />
                                            </Link>
                                            </NavigationMenuLink>
                                        </li>

                                        {item.subMenu.slice(1).map((subMenuItem, indexSubMenu) => (
                                            <ListItem key={indexSubMenu} href={subMenuItem.path} title={subMenuItem.title}>
                                                {subMenuItem.desc}
                                            </ListItem>
                                        ))}
                                        

                                            <img src="/patern.png" className="absolute pointer-events-none  opacity-5 left-[-50] bottom-[-20] h-[350px] w-[800px]" />
                                    </ul>
                                </NavigationMenuContent>
                        </NavigationMenuItem>
                    ) : (

                        <NavigationMenuItem className={`group/linktitle`} key={index}>
                            <NavigationMenuLink asChild className={`bg-transparent ${pathName === item.match ? 'text-[#f0c400]' : 'text-white'}  rounded-none   hover:bg-[#231c26] hover:text-white text-md`}>
                                <Link href={item.path} >
                                    {item.title}
                                </Link>
                            </NavigationMenuLink>
                                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-[#f0c400] group-hover/linktitle:w-full transition-all duration-300`}></span>
                        </NavigationMenuItem>
                    )
                ))}

                
            </NavigationMenuList>
        </NavigationMenu>
    </motion.div>
  )
}

export default NavMenu



function ListItem({title,children,href,...props}) {
    
    return (
      <li {...props}>
        <NavigationMenuLink className={'rounded-none hover:bg-[#f0c400] border-b-[1px] border-dashed border-[#f0c400]'} asChild>
          <Link href={href} className="flex flex-row justify-between items-center group/link">
          <div>
            <div className="text-lg leading-none group-hover/link:text-black font-semibold text-white transition-all duration-300 mb-0.5">{title}</div>
            <p className="text-slate-100 group-hover/link:text-black transition-all duration-300 line-clamp-2 text-sm leading-snug">
              {children}
            </p>
          </div>
            <ArrowUpRight size={50} className="text-[#f0c400] transition-all duration-300 group-hover/link:text-black" />
          </Link>
        </NavigationMenuLink>
      </li>
    )
  }





