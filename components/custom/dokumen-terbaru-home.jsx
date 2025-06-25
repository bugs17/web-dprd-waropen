import { Car, ChevronDown, Clock4, FileText } from 'lucide-react'
import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import Link from 'next/link'

const Card = () => {
    return (
        <div className='w-full px-5 py-5 flex flex-col gap-4 h-48 bg-[#231c26]'>
            <div className='flex items-center flex-row gap-2'>
                <Clock4 size={18} className='text-white' />
                <p className='text-white'>Sabtu, 2 Oktober 2025</p>
            </div>
            <span className='text-white text-lg font-semibold'>
            Rapat Dengar Pendapat (RDP) Komisi X DPR RI dengan Kepala Badan Keahlian DPR RI
            </span>

            <Link href={'#'} className='inline-flex w-40 items-center flex-row gap-2 group/btn'>
                <FileText size={18} className='text-amber-500 group-hover/btn:text-amber-300' />
                <p className='text-amber-500 font-semibold group-hover/btn:text-amber-300'>Lihat Dokumen</p>
            </Link>
        </div>
    )
}

const CustomSelect = () => {
    return (
        <Select>
            <SelectTrigger className="w-[300px] text-black rounded-none bg-white ">
                <SelectValue  placeholder="Jenis Dokumen" />
            </SelectTrigger>
            <SelectContent className={"rounded-none"}>
                <SelectItem className={"focus:bg-amber-500 focus:text-white rounded-none"} value="keuangan">Laporan Keuangan DPRD</SelectItem>
                <SelectItem className={"focus:bg-amber-500 focus:text-white rounded-none"} value="renstra">Rencana Strategis DPRD</SelectItem>
                <SelectItem className={"focus:bg-amber-500 focus:text-white rounded-none"} value="publik">Dokumen Publikasi</SelectItem>
                <SelectItem className={"focus:bg-amber-500 focus:text-white rounded-none"} value="hukum">Produk Hukum</SelectItem>
            </SelectContent>
        </Select>
    )
}

const DokumenTerbaru = () => {
  return (
    <div className='relative px-7 lg:px-14 h-auto w-auto overflow-hidden flex flex-row gap-4 items-start pb-12 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]'>
        
        <div className="absolute left-[-60px] bottom-[-60px] -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#c93d2a] opacity-20 blur-[100px]"></div>
        <div className="absolute right-[-60px] top-[-60px] -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#c93d2a] opacity-20 blur-[100px]"></div>
        
        <div className='w-full hidden lg:block px-8 min-h-[700px] bg-[#231c26] pt-10 overflow-hidden'>
            <div className='h-32 w-full flex flex-col gap-8 border-b-[2px] border-b-white'>
                <span className='font-semibold text-2xl text-white'>Jenis Dokumen</span>
                <CustomSelect />
            </div>
        </div>

        <div className='w-full min-h-[700px] flex flex-col gap-5 items-center'>
            {Array(4).fill(0).map((_,index) => (
                <Card key={index} />
            ))}
            <div className='flex flex-row justify-center items-center gap-2'>
                <span className='text-amber-300 cursor-pointer text-lg'>Lainnya</span>
                <ChevronDown size={18} className='text-amber-300' />    
            </div>
        </div>
    </div>
  )
}

export default DokumenTerbaru
