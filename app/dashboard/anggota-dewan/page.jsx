import { Button } from '@/components/ui/button'
import { Eye, Pencil, Trash, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
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
        {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
            <div
            key={num}
            className="w-full lg:w-1/5 h-60 overflow-hidden group"
            >
                <div className="relative w-full h-full overflow-hidden rounded border border-gray-300">
                    <Image
                        src={`/person.jpg`}
                        alt={'berita.judul'}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <div className="absolute bottom-0 left-0 p-2">
                        <Eye size={15} className='cursor-pointer hover:text-green-500' />
                    </div>

                    <div className="absolute bottom-0 right-0 bg-gradient-to-t from-black/90 to-transparent pr-2 pb-2">
                        <div className='flex flex-row justify-end gap-3 items-center'>
                            <Pencil size={15} className='cursor-pointer hover:text-amber-500' />
                            <Trash size={15} className='cursor-pointer hover:text-red-500' />
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