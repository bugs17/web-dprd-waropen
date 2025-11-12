import ProfileCard from '@/components/custom/client-component/profile-card'
import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'
import Link from 'next/link'


export const generateMetadata = () => {
    return {
        title: 'Anggota Dewan | DPRK WAROPEN',
    };
};

const page = async () => {


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

            <ProfileCard />
        </div>
    )
}

export default page

