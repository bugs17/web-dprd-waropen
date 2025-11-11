import ProfileCard from '@/components/custom/client-component/profile-card'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/db'
import { User } from 'lucide-react'
import Link from 'next/link'


export const generateMetadata = () => {
    return {
        title: 'Anggota Dewan | DPRK WAROPEN',
    };
};

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
                
                    

                    <ProfileCard  key={index} name={dewan.nama} imageUrl={`/api/anggota-dewan/image/${dewan.imageUrl}`} role={dewan.peranDewan} urlEdit={`/dashboard/anggota-dewan/edit/${dewan.id}`} dewanId={dewan.id} />
            ))}
            </div>
        </div>
    )
}

export default page

