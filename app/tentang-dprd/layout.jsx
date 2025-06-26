import BroadcumCustom from '@/components/custom/client-component/broadcump-custom'
import React from 'react'

const LayoutTentangDpr = ({children}) => {
  return (
    <div>
        <BroadcumCustom />
        
        {children}
    </div>
  )
}

export default LayoutTentangDpr

