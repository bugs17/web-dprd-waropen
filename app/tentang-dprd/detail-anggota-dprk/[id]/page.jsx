import { Calendar1, ChevronsUpDown, Facebook, Flag, Instagram, Landmark, Mail, Twitter, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';


import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { prisma } from '@/lib/db';

export const revalidate = 0;


export const generateMetadata = () => {
    return {
        title: 'Anggota Dewan | DPRK WAROPEN',
    };
};

const page = async ({ params }) => {
    const { id } = await params;

    const dewan = await prisma.anggotaDewan.findFirst({
        where:{
            id:parseInt(id),
        },
        
        include:{
            badan:true,
            komisi:true,
            partai:{
                include:{
                    fraksi:true
                }
            },
            riwayatPekerjaan:true,
            riwayatPendidikan:true
        }
    })

    if (!dewan) {
        return (
            <span>Data tidak di temukan!</span>
        )
    }

  return (
    
    <div className='bg-[#110e12] w-full lg:px-8 px-4 pt-4 lg:pb-0 pb-12'>
        <div className='bg-[#231c26] w-full lg:mb-10 mb-5 rounded-md flex lg:flex-row flex-col lg:gap-0 gap-4 overflow-hidden lg:pb-0 pb-4'>
            <div className='lg:w-[50%]  w-full lg:h-96  lg:px-12 pt-8 flex lg:flex-row flex-col items-center'>
                <div className='lg:h-64 h-60 rounded-md lg:w-56 w-50 overflow-hidden'>
                    <Image 
                        alt={dewan.nama}
                        className="object-cover h-full w-full" 
                        height={300} width={300} 
                        src={`/api/anggota-dewan/image/${dewan?.imageUrl}`}  
                        placeholder="blur"
                        blurDataURL="/placeholder.png"
                        priority
                    />
                </div>

                <div className='h-full w-full flex flex-col lg:py-16 pb-8 pt-3 lg:gap-0 gap-6 '>
                    <div className='w-full lg:h-[50%] px-2 lg:px-0 flex flex-col lg:items-start items-center pt-1 lg:pl-8 lg:justify-normal'>
                        <span className='text-white lg:text-2xl text-base font-semibold'>{dewan?.nama}</span>
                        <span className='text-amber-400 text-base font-semibold'>{dewan?.peranDewan}</span>
                    </div>
                    

                    <div className='w-full lg:h-[50%] lg:pl-8 lg:justify-normal justify-center flex'>
                        <div className='flex flex-col gap-3'>
                            <div className='flex flex-row gap-3 items-center'>
                                <Calendar1 className='text-zinc-400 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10'  />
                                <span className='text-white text-sm lg:text-base'>{dewan?.tempatLahir},{new Date(dewan?.tanggalLahir).toLocaleString('id-ID', {day: 'numeric',month: 'long',year: 'numeric'})}</span>
                            </div>
                            <div className='flex flex-row gap-3 items-center'>
                                <Landmark className='text-zinc-400 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10'  />
                                <span className='text-white text-sm lg:text-base'>{dewan?.komisi?.nama || ""} - {dewan?.komisi?.deskripsi || ""}</span>
                            </div>
                            <div className='flex flex-row gap-3 items-center'>
                                <Flag className='text-zinc-400 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10'  />
                                <span className='text-white text-sm lg:text-base'>{dewan?.partai?.fraksi?.nama || ""}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='w-[4px] hidden lg:flex h-96 py-20  justify-center items-center'>
                <div className='w-[1px] rounded-xl bg-[linear-gradient(to_bottom,_#f3f4f6_0%,_#8fd3f4_25%,_#d9a7c7_50%,_#a18cd1_75%,_#fbc2eb_100%)] h-full'></div>
            </div>

            <div className='lg:w-[50%] flex flex-col gap-5 justify-center lg:items-start items-center w-full lg:h-96 lg:px-12 lg:pt-16'>
                <span className='text-white hidden lg:flex md:flex font-semibold lg:text-2xl text-base'>Kontak</span>
                <div className='w-[90%] h-[1px] rounded-sm  lg:hidden bg-zinc-400' />
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-row gap-3 items-center'>
                        <Mail className='text-zinc-400 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10'  />
                        <span className='text-white text-sm lg:text-base'>{dewan?.email || "-"}</span>
                    </div>
                </div>

                <span className='text-white font-semibold lg:text-2xl text-base'>Sosial Media</span>
                <div className='flex flex-row gap-6 '>
                    <Link href={dewan?.facebookUrl || "#"} target='_blank' className='flex flex-row gap-3 items-center'>
                        <Facebook className='text-zinc-400 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10'  />
                    </Link>
                    <Link  href={dewan?.instagramUrl || "#"} target='_blank'className='flex flex-row gap-3 items-center'>
                        <Instagram className='text-zinc-400 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10'  />
                    </Link>
                    <Link href={dewan?.youtubeUrl || "#"} target='_blank' className='flex flex-row gap-3 items-center'>
                        <Youtube className='text-zinc-400 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10'  />
                    </Link>
                </div>
            </div>
        </div>

        <div className='w-full grid lg:grid-cols-2 grid-cols-1 lg:gap-10 gap-5 items-start'>
            <div className='w-full bg-[#231c26] rounded-md px-10 py-10'>
                <Collapsible>
                    <div className='flex flex-row justify-between w-full mb-12'>
                        <span className='lg:text-2xl text-xl text-gray-400 font-bold'>Riwayat Pendidikan</span>
                        <CollapsibleTrigger asChild>
                            <ChevronsUpDown 
                                className="text-white w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
                            />
                        </CollapsibleTrigger>
                    </div>

                    <CollapsibleContent>

                        {dewan?.riwayatPendidikan.length > 0 ? (
                            dewan?.riwayatPendidikan?.map((p, idx) => (
                                <div key={idx} className='w-full flex flex-row'>
                                    <div className='w-[10%] flex flex-col justify-center items-center'>
                                        <div className='lg:h-5 lg:w-5 h-3 w-3 rounded-full bg-amber-400'></div>
                                        <div className='lg:h-16 lg:w-[2px] h-8 w-[1.5%] bg-amber-200'></div>
                                    </div>
                                    <div className='w-[90%] flex flex-col gap-3'>
                                        <span className='text-gray-100 text-sm'>- {p.tahunLulus}</span>
                                        <span className='text-white lg:text-xl text-base font-semibold'>{p.namaSekolah}</span>
                                    </div>
                                </div>
                            ))
                        )
                        :
                        (
                            <div className='w-full flex flex-row'>
                                <div className='w-[10%] flex flex-col justify-center items-center'>
                                    <div className='h-5 w-5 rounded-full bg-amber-400'></div>
                                    <div className='h-16 w-[2px] bg-amber-200'></div>
                                </div>
                                <div className='w-[90%] flex flex-col gap-3'>
                                    <span className='text-gray-100 text-sm'>-</span>
                                    <span className='text-white text-xl font-semibold'>---</span>
                                </div>
                            </div>
                        )}
                        
                    </CollapsibleContent>
                </Collapsible>
            </div>
            
            <div className='w-full bg-[#231c26] rounded-md px-10 py-10'>
                <Collapsible>
                    <div className='flex flex-row justify-between w-full mb-12'>
                        <span className='lg:text-2xl text-xl text-gray-400 font-bold'>Riwayat Pekerjaan</span>
                        <CollapsibleTrigger asChild>
                            <ChevronsUpDown className="text-white w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
                        </CollapsibleTrigger>
                    </div>

                    <CollapsibleContent>
                        {dewan?.riwayatPekerjaan.length > 0 ? (
                            dewan?.riwayatPekerjaan?.map((p, idx) => (
                                <div key={idx} className='w-full flex flex-row'>
                                    <div className='w-[10%] flex flex-col justify-center items-center'>
                                        <div className='lg:h-5 lg:w-5 h-3 w-3 rounded-full bg-amber-400'></div>
                                        <div className='lg:h-16 lg:w-[2px] h-8 w-[1.5%] bg-amber-200'></div>
                                    </div>
                                    <div className='w-[90%] flex flex-col gap-3'>
                                        <span className='text-gray-100 text-sm'>- {p.tahunMenjabat}</span>
                                        <span className='text-white lg:text-xl text-base font-semibold'>{p.jabatanPekerjaan}</span>
                                    </div>
                                </div>
                            ))
                        )
                        :
                        (
                            <div className='w-full flex flex-row'>
                                <div className='w-[10%] flex flex-col justify-center items-center'>
                                    <div className='h-5 w-5 rounded-full bg-amber-400'></div>
                                    <div className='h-16 w-[2px] bg-amber-200'></div>
                                </div>
                                <div className='w-[90%] flex flex-col gap-3'>
                                    <span className='text-gray-100 text-sm'>-</span>
                                    <span className='text-white text-xl font-semibold'>---</span>
                                </div>
                            </div>
                        )}
                    </CollapsibleContent>
                </Collapsible>
            </div>
            
        </div>
    </div>
  )
}

export default page

{/*  */}