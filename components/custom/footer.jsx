
"use client"
import { getContactInfo } from '@/action/get-info-kontak'
import { Facebook, Instagram, Mail, Phone, Pin, Twitter, Youtube } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'




const Footer = () => {


    const [data, setData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const newData = await getContactInfo()
            if (newData) {
                setData(newData)
            }
        }
        fetchData()
    },[])

    const sosialMedia = [
    {
        nama: "Facebook",
        link: data?.facebook || "#",
        icon: <Facebook className="text-white w-3 h-3 lg:w-4 lg:h-4" />
    },
    {
        nama: "Instagram",
        link: data?.instagram || "#",
        icon: <Instagram className="text-white w-3 h-3 lg:w-4 lg:h-4" />
    },
    {
        nama: "Twitter",
        link: data?.twitter || "#",
        icon: <Twitter className="text-white w-3 h-3 lg:w-4 lg:h-4" />
    },
    {
        nama: "Youtube",
        link: data?.youtube || "#",
        icon: <Youtube className="text-white w-3 h-3 lg:w-4 lg:h-4" />
    }
    
]
  return (
    <div className='relative w-full min-h-96 overflow-hidden pb-10'>
        <div className="absolute left-[-60px] bottom-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#c92aa9] opacity-20 blur-[100px]"></div>
        <div className="absolute right-[-60px] top-0 bottom-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#c92aa9] opacity-20 blur-[100px]"></div>
        
        <div className='flex flex-col w-full h-full'>
            <div className='h-full w-full justify-between flex lg:flex-row flex-col px-14 pt-14'>
                <div className='flex flex-col gap-10 w-full lg:w-[70%]'>
                    <div className='flex  flex-row lg:gap-5 items-center'>
                        <Image className='object-contain' src={'/logo.png'} height={80} width={80} draggable={false} alt="logo"  />
                        
                        <div className='flex flex-col items-center lg:justify-center justify-start'>
                            <span className='text-white lg:text-xl text-base lg:text-center text-left font-semibold'>
                                Dewan Perwakilan Rakyat Kabupaten <span className='block lg:hidden font-semibold text-white text-lg'>Kabupaten Waropen</span>
                            </span>
                            <span className='text-white lg:block hidden lg:text-center text-left  lg:text-xl text-lg font-semibold'>
                                Waropen
                            </span>
                        </div>
                    </div>

                    <div className='flex flex-row gap-5 items-center justify-center lg:justify-start'>
                        <span className='text-white font-semibold hidden lg:block'>Media Sosial :</span>
                        <div className='flex flex-row gap-4'>

                        {
                            sosialMedia.map((item, index) => (
                                <Link key={index} className='lg:h-10 lg:w-10 h-8 w-8 rounded-full flex justify-center items-center overflow-hidden border-white border' href={item.link} target='_blank'>
                                    {item.icon}
                                </Link>
                            ))
                        }
                        </div>
                    </div>
                </div>

                <div className='lg:w-[30%] w-full lg:pl-10 pt-10 flex flex-col gap-6'>
                    <span className='font-bold lg:text-xl text-base text-white text-left '>Kontak</span>
                    <div className='flex flex-col gap-3'>
                        <div className='flex flex-row gap-2 items-center'>
                            <Mail className='text-gray-200 lg:h-6 lg:w-6 h-5 w-5' />
                            <span className='text-gray-200 text-sm lg:text-base'>{data.email}</span>
                        </div>
                        <div className='flex flex-row gap-2 items-center'>
                            <Phone className='text-gray-200 lg:h-6 lg:w-6 h-5 w-5' />
                            <span className='text-gray-200 text-sm lg:text-base'>{data.telp}</span>
                        </div>
                        <div className='flex flex-row gap-2 items-center'>
                            <Pin className='text-gray-200 lg:h-8 lg:w-8 h-10 w-10' />
                            <span className='text-gray-200 text-sm lg:text-base'>{data.alamat}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className='w-full py-4 flex justify-center'>
                <p className="text-center text-sm text-gray-200">
                    &copy; 2025 DPRD Kabupaten Waropen. All rights reserved.
                </p>
            </div> */}
        </div>

    </div>
  )
}

export default Footer