import DialogAddPartai from '@/components/custom/client-component/dialog-add-partai'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-6">
        <div className="w-full flex justify-between">
            <h4>List Partai</h4>

            
            <DialogAddPartai>
                <Button className={"cursor-pointer"}>
                    <Plus className="text-black" />
                    <span>Tambah</span>
                </Button>
            </DialogAddPartai>
        </div>
    </div>
  )
}

export default page