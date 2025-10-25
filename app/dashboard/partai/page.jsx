import ButtonOpenDialogAddPartai from '@/components/custom/client-component/button-open-dialog-add-partai'
import DialogAddPartai from '@/components/custom/client-component/dialog-add-partai'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pencil, Trash } from 'lucide-react'
import React from 'react'

const page = () => {

  const partaiList = [
    { id: 1, nama: "Partai Maju Bersatu", logo: "https://pdiperjuangankalsel.id/wp-content/uploads/2018/01/logo-pdi5.png" },
    { id: 2, nama: "Partai Harapan Rakyat", logo: "https://pdiperjuangankalsel.id/wp-content/uploads/2018/01/logo-pdi5.png" },
    { id: 3, nama: "Partai Biru Langit", logo: "https://pdiperjuangankalsel.id/wp-content/uploads/2018/01/logo-pdi5.png" },
  ]

  return (
    <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-6">
        <div className="w-full flex justify-between">
            <h4>List Partai</h4>

            
            <DialogAddPartai>
                <ButtonOpenDialogAddPartai />
            </DialogAddPartai>
        </div>


      <div className="overflow-x-auto mt-10">
          <Table>
            <TableHeader>
              <TableRow className="">
                <TableHead className="w-[80px]">Logo</TableHead>
                <TableHead>Nama Partai</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partaiList.map((p) => (
                <TableRow key={p.id} className="">
                  <TableCell>
                    <img
                      src={p.logo}
                      alt={p.nama}
                      className="w-10 h-10 object-cover rounded-md border "
                    />
                  </TableCell>
                  <TableCell className="font-medium">{p.nama}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button className={"cursor-pointer hover:!bg-amber-500"} variant="outline" size="sm">
                      <span>Edit</span>
                      <Pencil size={10} />
                    </Button>
                    <Button className={"cursor-pointer hover:!bg-red-800"} variant="destructive" size="sm">
                      <span>Edit</span>
                      <Trash size={10} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        


    </div>
  )
}

export default page