"use client"
import { Car, ChevronDown, Clock4, FileText, Loader } from 'lucide-react'
import React, { useEffect, useState, useTransition } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import Link from 'next/link'
import { getAllDocumentsHome, getAllDocumentsHomeByKategory } from '@/action/get-all-docs-home'

const Card = ({judul, urlFile, date}) => {
    return (
        <div className='w-full px-5 py-5 flex flex-col gap-4 h-48 bg-[#231c26]'>
            <div className='flex items-center flex-row gap-2'>
                <Clock4 size={18} className='text-white' />
                <p className='text-white'>{new Date(date).toLocaleString('id-ID', {day: 'numeric',month: 'long',year: 'numeric'})}</p>
            </div>
            <span className='text-white text-lg font-semibold'>
            {judul}
            </span>

            <Link href={urlFile || "#"} className='inline-flex w-40 items-center flex-row gap-2 group/btn' target='_blank'>
                <FileText size={18} className='text-amber-500 group-hover/btn:text-amber-300' />
                <p className='text-amber-500 font-semibold group-hover/btn:text-amber-300'>Lihat Dokumen</p>
            </Link>
        </div>
    )
}

const CustomSelect = ({onSelect, isPending}) => {
    return (
        <Select disabled={isPending} onValueChange={onSelect}>
            <SelectTrigger className="w-[300px] text-black rounded-none bg-white ">
                <SelectValue  placeholder="Jenis Dokumen" />
            </SelectTrigger>
            <SelectContent className={"rounded-none"}>
                <SelectItem className={"focus:bg-amber-500 focus:text-white rounded-none"} value="Laporan Keuangan DPRK">Laporan Keuangan DPRD</SelectItem>
                <SelectItem className={"focus:bg-amber-500 focus:text-white rounded-none"} value="Rencana Strategis DPRK">Rencana Strategis DPRD</SelectItem>
                <SelectItem className={"focus:bg-amber-500 focus:text-white rounded-none"} value="Dokumen Publikasi">Dokumen Publikasi</SelectItem>
                <SelectItem className={"focus:bg-amber-500 focus:text-white rounded-none"} value="Produk Hukum">Produk Hukum</SelectItem>
            </SelectContent>
        </Select>
    )
}

const DokumenTerbaru = () => {
    const [pilihan, setPilihan] = useState("")
    const [docs, setDocs] = useState([])

    const [isPending, startTransition] = useTransition()
    const [linkLainnya, setLinkLainnya] = useState("/dokumen/laporan-keuangan")

    useEffect(() => {
        const fetchData = () => {
            let newDocs;
            startTransition(async () => {
                if (pilihan === "") {
                    newDocs = await getAllDocumentsHome()
                    setDocs(newDocs)
                    setLinkLainnya("/dokumen/laporan-keuangan")
                }else{
                    newDocs = await getAllDocumentsHomeByKategory(pilihan)
                    setDocs(newDocs)
                    if (pilihan === "Laporan Keuangan DPRK") {
                        setLinkLainnya("/dokumen/laporan-keuangan")
                    }else if (pilihan === "Rencana Strategis DPRK") {
                        setLinkLainnya("/dokumen/rencana-strategis")
                    }else if (pilihan === "Dokumen Publikasi") {
                        setLinkLainnya("/dokumen/dokumen-publikasi")
                    }else if (pilihan === "Produk Hukum") {
                        setLinkLainnya("/dokumen/produk-hukum")
                    }
                }
            })
        }
        fetchData()
    },[pilihan])




    const handleSelectChange = (value) => {
        setPilihan(value)
    }


    return (
        <div className='relative px-7 lg:px-14 h-auto w-auto overflow-hidden flex flex-row gap-4 items-start pb-12 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]'>
            
            <div className="absolute left-[-60px] bottom-[-60px] -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#c93d2a] opacity-20 blur-[100px]"></div>
            <div className="absolute right-[-60px] top-[-60px] -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#c93d2a] opacity-20 blur-[100px]"></div>
            
            <div className='w-full hidden lg:block px-8 min-h-[700px] bg-[#231c26] pt-10 overflow-hidden'>
                <div className='h-32 w-full flex flex-col gap-8 border-b-[2px] border-b-white'>
                    <span className='font-semibold text-2xl text-white'>Jenis Dokumen</span>
                    <CustomSelect isPending={isPending} onSelect={handleSelectChange} />
                </div>
            </div>

            <div className='w-full min-h-[700px] flex flex-col gap-5 items-center'>
                {!isPending ?
                    docs.map((d,index) => (
                        <Card judul={d.namaDokumen} date={d.updatedAt} urlFile={`/api/download/${d.urlDokumen}`} key={index} />
                    ))
                    :
                    (
                        <Loader className='text-amber-500' />
                    )
                }

                {docs.length > 0 && (
                    <Link href={linkLainnya}>
                        <div className='flex flex-row justify-center items-center gap-2'>
                            <span className='text-amber-300 cursor-pointer text-lg'>Lainnya</span>
                            <ChevronDown size={18} className='text-amber-300' />    
                        </div>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default DokumenTerbaru
