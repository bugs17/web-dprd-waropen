import React from 'react'

const Devider = ({title}) => {
  return (
    <div className='h-40 w-full  items-center flex pl-14'>

        <div className='flex flex-row gap-5 items-center'>
            <span className='text-3xl font-semibold text-white uppercase'>{title}</span>
            <div className="h-1 w-36 bg-gradient-to-r from-orange-300 to-amber-500" />
        </div>
    </div>
  )
}

export default Devider