import ComingSoon from "@/components/custom/client-component/comingSoon"
import { Construction } from "lucide-react"
import Link from "next/link"

const PengaduanPemdaPage = () => {
  return (
    <div className='w-full h-96 flex flex-col justify-center items-center'>
        <ComingSoon 
          title="Pengaduan Ke Pemkab. Waropen"
          description="Fitur ini sedang kami kembangkan dan akan segera tersedia."
        />
    </div>
  )
}

export default PengaduanPemdaPage