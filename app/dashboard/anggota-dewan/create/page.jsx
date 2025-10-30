import FormAddAnggotaDewan from "@/components/custom/client-component/form-add-anggota-dewan"
import { prisma } from "@/lib/db"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"


const page = async () => {

  const partais = await prisma.partai.findMany()
  const badans = await prisma.badan.findMany()

  return (
    <div className="bg-muted/50 min-h-[100vh] flex flex-col flex-1 rounded-xl md:min-h-min p-6">
        <div className='flex flex-row justify-between items-center'>
            <Link href={"/dashboard/anggota-dewan"} className='flex max-w-sm flex-row gap-3 items-center hover:text-gray-300 group'>
            <ArrowLeft className='text-white group-hover:text-gray-300' />
            <span>Kembali</span>
            </Link>
        </div>
        <FormAddAnggotaDewan partaiList={partais} badanList={badans} />
    </div>
  )
}

export default page