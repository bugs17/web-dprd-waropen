import FormGalery from '@/components/custom/client-component/form-galey'
import ImageDrop from '@/components/custom/client-component/upload-galery'
import React from 'react'

const page = () => {
  return (
    <div className="bg-muted/50 min-h-[100vh] flex-1  rounded-xl md:min-h-min p-6">
        <FormGalery />
        
    </div>
  )
}

export default page