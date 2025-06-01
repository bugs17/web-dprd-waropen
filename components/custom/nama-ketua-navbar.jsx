"use client"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

import { motion } from "framer-motion"

const NamaKetuaWithTooltip = () => {
  return (
    <Tooltip>
        <TooltipTrigger asChild>
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
            className='font-lora text-white hover:text-[#f0c400] cursor-pointer text-lg'>Ketua Ivan Imbiri</motion.span>
        </TooltipTrigger>
        <TooltipContent className={'bg-transparent'}>
        <img
            src="/ketua.jpeg"
            alt="Ketua DPRD Kabupaten Waropen"
            className="w-64 h-auto"
          />
        </TooltipContent>
    </Tooltip>
  )
}

export default NamaKetuaWithTooltip