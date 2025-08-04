import { Construction } from "lucide-react"
import Link from "next/link"

const PengaduanDprkPage = () => {
  return (
    <div className='w-full h-96 flex flex-col justify-center items-center'>
        <Construction size={70} className="text-amber-400" />
        <h1 className="text-lg text-white text-center font-semibold">Fitur ini dalam masa pengembangan.</h1>
        <Link href={'/'} className="text-blue-400">Kembali ke beranda</Link>
    </div>
  )
}

export default PengaduanDprkPage