import DialogDeleteAnggotaDewan from '@/components/custom/client-component/dialog-delete-anggota-dewan'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { prisma } from '@/lib/db'
import { Eye, Pencil, Trash, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async () => {

    const anggotaDewans = await prisma.anggotaDewan.findMany()

    return (
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-6">
            <div className="w-full flex justify-between">
                <h1>Daftar anggota dewan</h1>
                <Link href={"/dashboard/anggota-dewan/create"} >
                    <Button className={"cursor-pointer"}>
                        <User className="text-black" />
                        <span>Tambah</span>
                    </Button>
                </Link>
            </div>

            <div className="flex flex-wrap w-full pb-6 pt-6 gap-4 justify-center">
            {anggotaDewans.map((dewan, index) => (
                
                    <div
                    className="w-full lg:w-1/5 h-60 overflow-hidden group"
                    key={index}
                    >
                        <div className="relative w-full h-full overflow-hidden rounded border border-gray-300">
                            <Image
                                src={`/api/anggota-dewan/image/${dewan.imageUrl}`}
                                alt={dewan.nama}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            <div className="absolute bottom-0 left-0 p-2">
                                <Tooltip>
                                <TooltipTrigger asChild>
                                    <Eye size={15} className='cursor-pointer hover:text-black text-amber-500'  />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{dewan.nama}</p>
                                </TooltipContent>
                                </Tooltip>
                            </div>

                            <div className="absolute bottom-0 right-0 pr-2 pb-2">
                                <div className='flex flex-row justify-end gap-3 items-center'>
                                    <Link href={`/dashboard/anggota-dewan/edit/${dewan.id}`}>
                                        <Pencil size={15} className='cursor-pointer hover:text-black text-amber-500' />
                                    </Link>
                                    <DialogDeleteAnggotaDewan namaPartai={dewan.nama} idAnggotaDewan={dewan.id} />
                                </div>
                            </div>
                        </div>
                    </div>
            ))}
            </div>
        </div>
    )
}

export default page