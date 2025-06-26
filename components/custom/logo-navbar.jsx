"use client";
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion';

const LogoNavbar = () => {
  return (
    <motion.div 
    initial={{opacity:0, x:-100}}
    animate={{opacity:1, x:0}}
    transition={{
        type:'spring',
        stiffness:100,
        damping:25,
        delay:0.3,
        duration:1.2
    }}
    className='h-full lg:w-[25%] w-[75%] flex flex-row justify-between'>

        <Link href={'/'} className="h-full w-full flex flex-row items-center gap-2 lg:pl-10 pl-5">
          <Image style={{ objectFit: 'contain' }} className='lg:block hidden' src={'/logo.png'} height={80} width={80} draggable={false} alt="logo"  />
          <Image style={{ objectFit: 'contain' }} className='lg:hidden block' src={'/logo.png'} height={40} width={40} draggable={false} alt="logo"  />
          <div className="text-center text-white lg:border-b-[1px] lg:pb-4 lg:border-[#f0c400] text-xs leading-tight">
            <p>Dewan Perwakilan Rakyat Kabupaten</p>
            <p>Waropen</p>
          </div>
        </Link>
      
    </motion.div>
  )
}

export default LogoNavbar