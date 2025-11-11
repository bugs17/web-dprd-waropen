import ButtonOpenDialogAddPartai from '@/components/custom/client-component/button-open-dialog-add-partai'
import DialogAddPartai from '@/components/custom/client-component/dialog-add-partai'
import DialogDeletePartai from '@/components/custom/client-component/dialog-delete-partai'
import DialogEditPartai from '@/components/custom/client-component/dialog-edit-partai'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { prisma } from '@/lib/db'
import { Pencil, Trash } from 'lucide-react'
import React from 'react'

const page = async () => {


  const partaiList = await prisma.partai.findMany({
    orderBy:{
      id:'desc'
    }
  })

  const fraksis = await prisma.fraksi.findMany()


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
              {partaiList.length > 0 ?
                partaiList.map((p) => (
                  <TableRow key={p.id} className="">
                    <TableCell>
                      <img
                        src={`/api/partai/image/${p.imageUrl}`}
                        alt={p.nama}
                        className="w-10 h-10 object-cover rounded-md border "
                      />
                    </TableCell>
                    <TableCell className="font-medium">{p.nama}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <DialogEditPartai idPartaiState={p.id} namaPartaiState={p.nama} urlPreviewState={`/api/partai/image/${p.imageUrl}`} fraksiSelectedState={p.fraksiId} fraksisState={fraksis} />
                      <DialogDeletePartai key={p.id} idPartai={p.id} namaPartai={p.nama} />
                    </TableCell>
                  </TableRow>
                ))
              :
                <TableRow >
                  <TableCell>
                    <span>---</span>
                  </TableCell>
                  <TableCell className="font-medium"><span>---</span></TableCell>
                  <TableCell className="text-right space-x-2">
                    <span>---</span>
                    <span>---</span>
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </div>
        


    </div>
  )
}

export default page