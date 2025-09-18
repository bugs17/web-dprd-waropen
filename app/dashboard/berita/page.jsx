import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, Newspaper, Pencil, Search, Trash } from "lucide-react"
import { Table, TableBody,TableCell,TableHead,TableHeader,TableRow} from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { truncateText } from "@/lib/trunc-kalimat"
import Link from "next/link"
import { prisma } from "@/lib/db"
import DeleteBerita from "@/components/custom/client-component/button-delete-berita"

const TabelListBerita = async () => {

    const beritas = await prisma.berita.findMany({
        orderBy:{
            id: 'desc'
        }
    })

    return (
        <div className="rounded-lg overflow-hidden border border-gray-300">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-600 hover:bg-gray-600">
                        <TableHead className="w-[100px] text-left text-white">No</TableHead>
                        <TableHead className="w-[100px] text-center text-white">Judul</TableHead>
                        <TableHead className="w-[100px] text-center text-white">Tanggal</TableHead>
                        <TableHead className="w-[100px] text-right text-white">Aksi</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>

                    {beritas.length > 0 ? 
                    (
                        beritas.map((berita, index) => (
                            <TableRow key={berita.id} className="odd:bg-gray-900 even:bg-gray-800 hover:bg-gray-700">
                                <TableCell className="font-medium w-[100px] text-left text-white">{index+1}</TableCell>
                                <TableCell className="font-medium w-[100px] text-center text-white">
                                    <Tooltip>
                                        <TooltipTrigger>
                                            {truncateText(berita.judul, 20)}
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{berita.judul}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TableCell>
                                <TableCell className="font-medium w-[100px] text-center text-white">
                                    17-Agustus-2025
                                </TableCell>
                                <TableCell className="flex gap-2 justify-end items-center text-white">
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Link href={"#"} >
                                                <Eye className="text-white " size={16} />
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Lihat</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Link href={`/dashboard/berita/edit/${berita.slug}`}>
                                                <Pencil className="text-white text-xs" size={16} />
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Edit</p>
                                        </TooltipContent>
                                    </Tooltip>

                                    <DeleteBerita judulBerita={berita.judul} idBerita={berita.id} />
                                    
                                </TableCell>
                            </TableRow>
                        ))
                    )
                    :
                    (
                        <TableRow className="odd:bg-gray-900 even:bg-gray-800 hover:bg-gray-700">
                            <TableCell className="font-medium w-[100px] text-left text-white">#</TableCell>
                            <TableCell className="font-medium w-[100px] text-center text-white">
                                ---
                            </TableCell>
                            <TableCell className="font-medium w-[100px] text-center text-white">
                                ---
                            </TableCell>
                            <TableCell className="flex gap-2 justify-end items-center text-white">
                                ---
                                
                            </TableCell>
                        </TableRow>
                    )
                    }
                    

                </TableBody>
            </Table>
        </div>

    )
}

const Beritas = () => {


    return (
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-6" >
            <div className="w-full flex justify-between">
                <div className="relative w-full max-w-sm mb-5">
                    <Input
                        type="text"
                        placeholder="Cari berita..."
                        className="pr-10 text-white"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-white h-5 w-5 pointer-events-none" />
                </div>

                <Link href={"/dashboard/berita/create"}>
                    <Button className={"cursor-pointer"}>
                        <Newspaper className="text-black" />
                        <span>Baru</span>
                    </Button>
                </Link>
            </div>

            <TabelListBerita />
        </div>
    )
}

export default Beritas