"use client"
import { Button } from '@/components/ui/button'
import { openDialogPartaiAtom } from '@/lib/globalState'
import { useAtom } from 'jotai'
import { Plus } from 'lucide-react'

const ButtonOpenDialogAddPartai = () => {
    const [open, setOpen] = useAtom(openDialogPartaiAtom)

  return (
    <Button className={"cursor-pointer"} onClick={() => setOpen(true)}>
        <Plus className="text-black" />
        <span>Tambah</span>
    </Button>
  )
}

export default ButtonOpenDialogAddPartai