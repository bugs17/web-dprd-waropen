
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
        icon: <Facebook size={14} className="text-white" />
    },
    {
        nama: "Instagram",
        link: data?.instagram || "#",
        icon: <Instagram size={14} className="text-white" />
    },
    {
        nama: "Twitter",
        link: data?.twitter || "#",
        icon: <Twitter size={14} className="text-white" />
    },
    {
        nama: "Youtube",
        link: data?.youtube || "#",
        icon: <Youtube size={14} className="text-white" />
    }
    
]
  return (
    <div className='relative w-full min-h-96 overflow-hidden'>
        <div className="absolute left-[-60px] bottom-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#c92aa9] opacity-20 blur-[100px]"></div>
        <div className="absolute right-[-60px] top-0 bottom-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#c92aa9] opacity-20 blur-[100px]"></div>
        
        <div className='flex flex-col w-full h-full'>
            <div className='h-full w-full justify-between flex lg:flex-row flex-col px-14 pt-14'>
                <div className='flex flex-col gap-10 w-full lg:w-[70%]'>
                    <div className='flex  flex-row gap-5 items-center'>
                        <Image style={{ objectFit: 'contain' }} className='' src={'/logo.png'} height={80} width={80} draggable={false} alt="logo"  />
                        
                        <div className='flex flex-col items-center lg:justify-center justify-start'>
                            <span className='text-white lg:text-xl text-lg lg:text-center text-left font-semibold'>
                                Dewan Perwakilan Rakyat Kabupaten <span className='block lg:hidden font-semibold text-white text-lg'>Kabupaten Waropen</span>
                            </span>
                            <span className='text-white lg:block hidden lg:text-center text-left  lg:text-xl text-lg font-semibold'>
                                Waropen
                            </span>
                        </div>
                    </div>

                    <div className='flex flex-row gap-5 items-center  '>
                        <span className='text-white font-semibold'>Media Sosial :</span>
                        <div className='flex flex-row gap-4'>

                        {
                            sosialMedia.map((item, index) => (
                                <Link key={index} className='h-10 w-10 rounded-full flex justify-center items-center overflow-hidden border-white border' href={item.link} target='_blank'>
                                    {item.icon}
                                </Link>
                            ))
                        }
                        </div>
                    </div>
                </div>

                <div className='lg:w-[30%] w-full lg:pl-10 pt-10 flex flex-col gap-6'>
                    <span className='font-bold text-xl text-white text-left '>Kontak</span>
                    <div className='flex flex-col gap-3'>
                        <div className='flex flex-row gap-2 items-center'>
                            <Mail size={18} className='text-gray-200' />
                            <span className='text-gray-200'>{data.email}</span>
                        </div>
                        <div className='flex flex-row gap-2 items-center'>
                            <Phone size={18} className='text-gray-200' />
                            <span className='text-gray-200'>{data.telp}</span>
                        </div>
                        <div className='flex flex-row gap-2 items-center'>
                            <Pin size={18} className='text-gray-200' />
                            <span className='text-gray-200'>{data.alamat}</span>
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