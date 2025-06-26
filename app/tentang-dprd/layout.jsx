import BroadcumCustom from '@/components/custom/client-component/broadcump-custom'
import React from 'react'

const LayoutTentangDpr = ({children}) => {
  return (
    <div>
        <BroadcumCustom />
        <div className='lg:h-48 h-36 w-full relative bg-[#110e12] flex justify-center items-center'>
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#543b502e_1px,transparent_1px),linear-gradient(to_bottom,#543b502e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
            <span className='lg:text-3xl text-xl text-white font-semibold text-center'>Anggota Dewan Kabupaten Waropen</span>
        </div>
        {children}
    </div>
  )
}

export default LayoutTentangDpr

