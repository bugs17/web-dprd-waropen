import React from 'react'
import Calendar from './kalender-component'

const KalenderSection = () => {
  return (
    <div className='relative bg-[radial-gradient(#312e31_1px,transparent_0.3px)] [background-size:16px_16px] w-full pb-8 h-auto bg-[#231c26] px-10 lg:px-20'>
        <Calendar />
    </div>
  )
}

export default KalenderSection
