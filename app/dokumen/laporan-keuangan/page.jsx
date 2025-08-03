import HeaderPages from '@/components/custom/header-pages'
import { FileDown, FileText, Search } from 'lucide-react'
import Link from 'next/link'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const leftMenu = [
    {
        title: "Laporan Keuangan DPRK",
        path: "/dokumen/laporan-keuangan",
        isActive: true
    },
    {
        title: "Rencana Strategis DPRK",
        path: "/dokumen/rencana-strategis",
        isActive: false
    },
    {
        title: "Dokumen Publikasi",
        path: "/dokumen/dokumen-publikasi",
        isActive: false
    },
    {
        title: "Produk Hukum",
        path: "/dokumen/produk-hukum",
        isActive: false
    },
]


import { Input } from '@/components/ui/input'

const TabelListLaporanKeuangan = () => {
    return (
        <Table className="border border-white">

            <TableHeader>
                <TableRow className={"bg-gray-600 hover:bg-gray-600"}>
                    <TableHead className="w-[100px] text-left text-white">No</TableHead>
                    <TableHead className="w-[100px] text-center text-white">Nama</TableHead>
                    <TableHead className="w-[100px] text-right text-white">Dokumen</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                <TableRow className={"hover:bg-[#110e12]"}>
                    <TableCell className="font-medium w-[100px] text-left text-white">1</TableCell>
                    <TableCell className="font-medium w-[100px] text-center text-white">RKA Satker Dewan 2024</TableCell>
                    <TableCell className="flex justify-end text-white">
                        <a href='#' className='border border-amber-700 rounded-sm cursor-pointer group hover:bg-amber-700 p-2 flex flex-row gap-2 items-center'>
                            <FileDown className="text-amber-700 group-hover:text-white" />
                            <span>PDF</span>
                        </a>
                    </TableCell>
                </TableRow>
                <TableRow className={"hover:bg-[#110e12]"}>
                    <TableCell className="font-medium w-[100px] text-left text-white">1</TableCell>
                    <TableCell className="font-medium w-[100px] text-center text-white">RKA Satker Dewan 2024</TableCell>
                    <TableCell className="flex justify-end text-white">
                        <a href='#' className='border border-amber-700 rounded-sm cursor-pointer group hover:bg-amber-700 p-2 flex flex-row gap-2 items-center'>
                            <FileDown className="text-amber-700 group-hover:text-white" />
                            <span>PDF</span>
                        </a>
                    </TableCell>
                </TableRow>
                <TableRow className={"hover:bg-[#110e12]"}>
                    <TableCell className="font-medium w-[100px] text-left text-white">1</TableCell>
                    <TableCell className="font-medium w-[100px] text-center text-white">RKA Satker Dewan 2024</TableCell>
                    <TableCell className="flex justify-end text-white">
                        <a href='#' className='border border-amber-700 rounded-sm cursor-pointer group hover:bg-amber-700 p-2 flex flex-row gap-2 items-center'>
                            <FileDown className="text-amber-700 group-hover:text-white" />
                            <span>PDF</span>
                        </a>
                    </TableCell>
                </TableRow>
                <TableRow className={"hover:bg-[#110e12]"}>
                    <TableCell className="font-medium w-[100px] text-left text-white">1</TableCell>
                    <TableCell className="font-medium w-[100px] text-center text-white">RKA Satker Dewan 2024</TableCell>
                    <TableCell className="flex justify-end text-white">
                        <a href='#' className='border border-amber-700 rounded-sm cursor-pointer group hover:bg-amber-700 p-2 flex flex-row gap-2 items-center'>
                            <FileDown className="text-amber-700 group-hover:text-white" />
                            <span>PDF</span>
                        </a>
                    </TableCell>
                </TableRow>
                <TableRow className={"hover:bg-[#110e12]"}>
                    <TableCell className="font-medium w-[100px] text-left text-white">1</TableCell>
                    <TableCell className="font-medium w-[100px] text-center text-white">RKA Satker Dewan 2024</TableCell>
                    <TableCell className="flex justify-end text-white">
                        <a href='#' className='border border-amber-700 rounded-sm cursor-pointer group hover:bg-amber-700 p-2 flex flex-row gap-2 items-center'>
                            <FileDown className="text-amber-700 group-hover:text-white" />
                            <span>PDF</span>
                        </a>
                    </TableCell>
                </TableRow>
                
            </TableBody>
        </Table>
    )
}

const LaporanKeuanganPage = () => {
  return (
    <>
        <HeaderPages title={"Laporan Keuangan DPRK"} />
        
        <div className='flex w-full p-20 gap-6'>
            <div className='w-[25%] h-full bg-[#231c26] flex flex-col py-4'>
                {leftMenu.map((item, index) => (
                    <Link href={item.path} key={index} className={`flex flex-row gap-3 ${item.isActive && "bg-amber-100"} py-4 pl-4 items-center hover:bg-amber-100 group`}>
                        <FileText className={`text-black ${item.isActive ? "text-black" : "text-white"} group-hover:text-black`} />
                        <span className={` ${item.isActive ? "text-black" : "text-white"} group-hover:text-black`}>{item.title}</span>
                    </Link>
                ))}
            </div>
            <div className='w-[75%]'>
                <div className="relative w-full max-w-sm mb-5">
                    <Input
                        type="text"
                        placeholder="Cari laporan..."
                        className="pr-10 text-white"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-white h-5 w-5 pointer-events-none" />
                </div>
                <TabelListLaporanKeuangan />
            </div>
        </div>
    </>
  )
}

export default LaporanKeuanganPage