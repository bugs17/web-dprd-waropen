import React from 'react'
import { Button } from '../ui/button'
import { MoveRight } from 'lucide-react'

const Devider = ({title, bg, btn}) => {
  return (
    <div className={`h-40 w-full  items-center flex flex-row justify-between px-14 ${bg ? 'bg-[#231c26]' : ''} `}>

        <div className='flex flex-row gap-5 items-center'>
            <span className='text-md lg:text-3xl font-semibold text-white uppercase'>{title}</span>
            <div className="h-1 w-20 lg:w-36 bg-gradient-to-r from-orange-300 to-amber-500" />
        </div>

        {btn && (

        <Button size={'lg'} className={`bg-transparent border-[1px] border-amber-500 hover:border-white cursor-pointer hover:bg-amber-500 rounded-none flex flex-row items-center gap-5 group/btn`}>
            <span className='text-amber-500 text-sm lg:text-xl group-hover/btn:text-white'>Lainnya</span>
            <MoveRight size={18} className='text-amber-500 group-hover/btn:text-white' />
        </Button>
        )}
    </div>
  )
}

export default Devider