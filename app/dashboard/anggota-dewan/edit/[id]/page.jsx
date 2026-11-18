import FormEditAnggotaDewan from '@/components/custom/client-component/form-edit-anggota-dewan';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';


export const generateMetadata = () => {
    return {
        title: 'Anggota Dewan | DPRK WAROPEN',
    };
};

const EditAnggotaDewanPage = async ({params}) => {
    const { id } = await params;

    if (!id) {
    return <p>Not found</p>;
    }


    return (
        <div className="bg-muted/50 min-h-[100vh] flex flex-col flex-1 rounded-xl md:min-h-min p-6">
        <div className='flex flex-row justify-between items-center'>
            <Link href={"/dashboard/anggota-dewan"} className='flex max-w-sm flex-row gap-3 items-center hover:text-app-muted group'>
                <ArrowLeft className='text-app-ink group-hover:text-app-muted' />
                <span>Kembali</span>
            </Link>

            <span className='text-app-ink group-hover:text-app-muted'>Edit Data Anggota Dewan</span>
        </div>
        <FormEditAnggotaDewan idDewan={id} />
    </div>
    )
}

export default EditAnggotaDewanPage