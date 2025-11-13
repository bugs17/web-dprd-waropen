"use client"
import { getKetua } from "@/action/get-ketua"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"

const NamaKetuaWithTooltip = () => {
  const [ketua, setKetua] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      const dataKetua = await getKetua()
      if (dataKetua) {
        setKetua(dataKetua)
      }
    }
    fetchData()
  }, [])

  return (
    <Tooltip>
        <TooltipTrigger asChild>
            {ketua?.nama ? (

            <motion.span
            initial={{opacity:0, x:-100}}
            animate={{opacity:1, x:0}}
            transition={{
                type:'spring',
                stiffness:100,
                damping:25,
                delay:0.3,
                duration:1.2
            }}
            className='font-lora text-white hover:text-[#f0c400] cursor-pointer text-lg'>Ketua {ketua.nama}</motion.span>
            ) : (
            <motion.span
            initial={{opacity:0, x:-100}}
            animate={{opacity:1, x:0}}
            transition={{
                type:'spring',
                stiffness:100,
                damping:25,
                delay:0.3,
                duration:1.2
            }}
            className='font-lora text-white hover:text-[#f0c400] cursor-pointer text-lg'>Memuat data</motion.span>
            )}
        </TooltipTrigger>
        <TooltipContent className={'bg-transparent'}>
        {ketua?.imageUrl ? (
              <Image
                src={`/api/anggota-dewan/image/${ketua.imageUrl}`}
                alt="Ketua DPRK"
                fill
                className="w-400 h-auto"
                placeholder="blur"
                blurDataURL="/placeholder.png"
                priority
              />
            ) : (
              <Image
                src="/placeholder.png"
                alt="Ketua DPRK"
                fill
                className="w-64 h-auto"
                placeholder="blur"
                blurDataURL="/placeholder.png"
              />
            )}
        </TooltipContent>
    </Tooltip>
  )
}

export default NamaKetuaWithTooltip