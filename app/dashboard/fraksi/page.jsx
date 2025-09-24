import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus } from 'lucide-react'
import Link from 'next/link'

const TabelAnggotaFraksi = () => {
    return (
        <Table className="border border-white">

            <TableHeader>
                <TableRow className={"bg-gray-600 hover:bg-gray-600"}>
                    <TableHead className="w-[100px] text-left text-white">No</TableHead>
                    <TableHead className="w-[100px] text-left text-white">Partai</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                <TableRow className={""}>
                    <TableCell className="font-medium w-[100px] text-left text-white">1</TableCell>
                    <TableCell className="font-medium w-[100px] text-left text-white">Partai Demokrasi Indonesia Perjaungan</TableCell>
                </TableRow>
                <TableRow className={""}>
                    <TableCell className="font-medium w-[100px] text-left text-white">2</TableCell>
                    <TableCell className="font-medium w-[100px] text-left text-white">Partai Demokrat</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

const FraksiList = () => {
  return (
    <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-6">
        <div className="w-full flex justify-between">
            <h4>Fraksi-fraksi DPRK</h4>

            <Link href={"/dashboard/fraksi/create"}>
                <Button className={"cursor-pointer"}>
                    <Plus className="text-black" />
                    <span>Tambah</span>
                </Button>
            </Link>
        </div>


        <div className='w-full flex flex-col mt-9'>
            <h1 className="text-amber-300 text-2xl font-extrabold text-center lg:mb-4">FRAKSI DEMOKRASI INDONESIA PERJUANGAN </h1>
        </div>

        <TabelAnggotaFraksi />

    </div>
  )
}

export default FraksiList