import { Calendar1, ChevronsUpDown, Facebook, Flag, Landmark, Mail, Twitter, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"

const page = async ({ params }) => {
    const { slug } = await params;

  return (
    
    <div className='bg-[#110e12] w-full lg:px-8 px-4 pt-4 lg:pb-0 pb-12'>
        <div className='bg-[#231c26] w-full lg:mb-10 mb-10 rounded-md flex lg:flex-row flex-col lg:gap-0 gap-4 overflow-hidden lg:pb-0 pb-4'>
            <div className='lg:w-[50%]  w-full lg:h-96  lg:px-12 pt-8 flex lg:flex-row flex-col items-center'>
                <div className='lg:h-64 h-48 lg:w-56 w-36 overflow-hidden'>
                    <Image alt="foto anggota dprk waropen" className="object-cover h-full w-full" height={300} width={300} src={"/person.jpg"}  />
                </div>

                <div className='h-full w-full flex flex-col lg:py-16 pb-8 pt-3 lg:gap-0 gap-6 '>
                    <div className='w-full lg:h-[50%]  flex items-center pt-1 lg:pl-8 justify-center lg:justify-normal'>
                        <span className='text-white text-2xl font-semibold'>Rony Fernando, M.Pd</span>
                    </div>

                    <div className='w-full lg:h-[50%] lg:pl-8 lg:justify-normal justify-center flex'>
                        <div className='flex flex-col gap-3'>
                            <div className='flex flex-row gap-3 items-center'>
                                <Calendar1 className='text-amber-200'  />
                                <span className='text-white text-base'>Kamanap, 21 Desember 1967</span>
                            </div>
                            <div className='flex flex-row gap-3 items-center'>
                                <Landmark className='text-amber-200'  />
                                <span className='text-white text-base'>Komisi A - Pemerintahan dan Hukum</span>
                            </div>
                            <div className='flex flex-row gap-3 items-center'>
                                <Flag className='text-amber-200'  />
                                <span className='text-white text-base'>Fraksi Partai Kebangkitan Bangsa</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='w-[4px] hidden lg:flex h-96 py-20  justify-center items-center'>
                <div className='w-[1px] rounded-xl bg-[linear-gradient(to_bottom,_#f3f4f6_0%,_#8fd3f4_25%,_#d9a7c7_50%,_#a18cd1_75%,_#fbc2eb_100%)] h-full'></div>
            </div>

            <div className='lg:w-[50%] flex flex-col gap-5 justify-center lg:items-start items-center w-full lg:h-96 lg:px-12 lg:pt-16'>
                <span className='text-white font-semibold text-2xl'>Kontak</span>

                <div className='flex flex-col gap-3'>
                    <div className='flex flex-row gap-3 items-center'>
                        <Mail className='text-amber-200'  />
                        <span className='text-white text-base'>contoh@mail.go.id</span>
                    </div>
                </div>

                <span className='text-white font-semibold text-2xl'>Sosial Media</span>
                <div className='flex flex-row gap-6 '>
                    <Link href={"#"} target='_blank' className='flex flex-row gap-3 items-center'>
                        <Facebook className='text-violet-400'  />
                    </Link>
                    <Link  href={"#"} target='_blank'className='flex flex-row gap-3 items-center'>
                        <Twitter className='text-violet-400'  />
                    </Link>
                    <Link href={"#"} target='_blank' className='flex flex-row gap-3 items-center'>
                        <Youtube className='text-violet-400'  />
                    </Link>
                </div>
            </div>
        </div>

        <div className='w-full grid lg:grid-cols-2 grid-cols-1 gap-10 items-start'>
            <div className='w-full bg-[#231c26] rounded-md px-10 py-10'>
                <Collapsible>
                    <div className='flex flex-row justify-between w-full mb-12'>
                        <span className='text-2xl text-gray-400 font-bold'>Riwayat Pendidikan</span>
                        <CollapsibleTrigger asChild>
                            <ChevronsUpDown size={32} className='text-amber-500' />
                        </CollapsibleTrigger>
                    </div>

                    <CollapsibleContent>
                        <div className='w-full flex flex-row'>
                            <div className='w-[10%] flex flex-col justify-center items-center'>
                                <div className='h-5 w-5 rounded-full bg-amber-400'></div>
                                <div className='h-16 w-[2px] bg-amber-200'></div>
                            </div>
                            <div className='w-[90%] flex flex-col gap-3'>
                                <span className='text-gray-100 text-sm'>- 2006</span>
                                <span className='text-white text-xl font-semibold'>SD Negeri 1 Menawi</span>
                            </div>
                        </div>
                        <div className='w-full flex flex-row'>
                            <div className='w-[10%] flex flex-col justify-center items-center'>
                                <div className='h-5 w-5 rounded-full bg-amber-400'></div>
                                <div className='h-16 w-[2px] bg-amber-200'></div>
                            </div>
                            <div className='w-[90%] flex flex-col gap-3'>
                                <span className='text-gray-100 text-sm'>- 2006</span>
                                <span className='text-white text-xl font-semibold'>SD Negeri 1 Menawi</span>
                            </div>
                        </div>
                        <div className='w-full flex flex-row'>
                            <div className='w-[10%] flex flex-col justify-center items-center'>
                                <div className='h-5 w-5 rounded-full bg-amber-400'></div>
                                <div className='h-16 w-[2px] bg-amber-200'></div>
                            </div>
                            <div className='w-[90%] flex flex-col gap-3'>
                                <span className='text-gray-100 text-sm'>- 2006</span>
                                <span className='text-white text-xl font-semibold'>SD Negeri 1 Menawi</span>
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>
            
            <div className='w-full bg-[#231c26] rounded-md px-10 py-10'>
                <Collapsible>
                    <div className='flex flex-row justify-between w-full mb-12'>
                        <span className='text-2xl text-gray-400 font-bold'>Riwayat Pekerjaan</span>
                        <CollapsibleTrigger asChild>
                            <ChevronsUpDown size={32} className='text-amber-500' />
                        </CollapsibleTrigger>
                    </div>

                    <CollapsibleContent>
                        <div className='w-full flex flex-row'>
                            <div className='w-[10%] flex flex-col justify-center items-center'>
                                <div className='h-5 w-5 rounded-full bg-amber-400'></div>
                                <div className='h-16 w-[2px] bg-amber-200'></div>
                            </div>
                            <div className='w-[90%] flex flex-col gap-3'>
                                <span className='text-gray-100 text-sm'>- 2006</span>
                                <span className='text-white text-xl font-semibold'>SD Negeri 1 Menawi</span>
                            </div>
                        </div>
                        <div className='w-full flex flex-row'>
                            <div className='w-[10%] flex flex-col justify-center items-center'>
                                <div className='h-5 w-5 rounded-full bg-amber-400'></div>
                                <div className='h-16 w-[2px] bg-amber-200'></div>
                            </div>
                            <div className='w-[90%] flex flex-col gap-3'>
                                <span className='text-gray-100 text-sm'>- 2006</span>
                                <span className='text-white text-xl font-semibold'>SD Negeri 1 Menawi</span>
                            </div>
                        </div>
                        <div className='w-full flex flex-row'>
                            <div className='w-[10%] flex flex-col justify-center items-center'>
                                <div className='h-5 w-5 rounded-full bg-amber-400'></div>
                                <div className='h-16 w-[2px] bg-amber-200'></div>
                            </div>
                            <div className='w-[90%] flex flex-col gap-3'>
                                <span className='text-gray-100 text-sm'>- 2006</span>
                                <span className='text-white text-xl font-semibold'>SD Negeri 1 Menawi</span>
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>
            
        </div>
    </div>
  )
}

export default page

{/*  */}