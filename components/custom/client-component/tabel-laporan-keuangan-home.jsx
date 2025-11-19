
"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FileDown } from "lucide-react"
import Link from "next/link"

const TabelListDok = ({docs}) => {
    
    

    return (
        <Table className="border border-zinc-500 rounded-md mb-8">

            <TableHeader>
                <TableRow className={"bg-gray-600 hover:bg-gray-600"}>
                    <TableHead className="w-[100px] lg:text-base text-sm text-left text-white">No</TableHead>
                    <TableHead className="w-[100px] lg:text-base text-sm text-center text-white">Nama</TableHead>
                    <TableHead className="w-[100px] lg:text-base text-sm text-right text-white">Dokumen</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody >
                    {docs.length > 0 ? (
                        docs.map((d, i) => (
                            <TableRow key={i} className={"hover:bg-[#110e12]"}>
                                <TableCell className="font-medium w-[100px] text-left text-zinc-300">{i + 1}</TableCell>
                                <TableCell className="font-medium w-[100px] text-center text-zinc-300">{d.namaDokumen}</TableCell>
                                <TableCell className="flex justify-end text-zinc-300">
                                    <Link href={`/api/download/${d.urlDokumen}`} download={true} className='lg:border lg:border-amber-700 rounded-sm cursor-pointer group lg:hover:bg-amber-700 lg:p-2 flex flex-row gap-2 items-center'>
                                        <FileDown className="text-amber-700 group-hover:text-white" />
                                        <span className='lg:block hidden'>PDF</span>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    ):(
                        <TableRow className={"hover:bg-[#110e12]"}>
                            <TableCell className="font-medium w-[100px] text-left text-white">---</TableCell>
                            <TableCell className="font-medium w-[100px] text-center text-white">---</TableCell>
                            <TableCell className="flex justify-end text-white">
                                ---
                            </TableCell>
                        </TableRow>
                    )}
            </TableBody>
        </Table>
    )
}


export default TabelListDok