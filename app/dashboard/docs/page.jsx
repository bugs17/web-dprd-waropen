import FileUploader from '@/components/custom/client-component/form-upload-docs'
import React from 'react'

const DocsPage = () => {
  return (
    <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-6">
        <FileUploader />
    </div>
  )
}

export default DocsPage