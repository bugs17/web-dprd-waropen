import CardPerson from "@/components/custom/cardPerson";
import HeaderPages from "@/components/custom/header-pages";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";


const anggotaDewan = [
    {
      nama: "H. Ahmad Sudirman, S.Sos",
      komisi: "Komisi A - Pemerintahan dan Hukum",
      fraksi_partai: "Fraksi Partai Demokrasi Indonesia Perjuangan",
      url_photo: "/images/anggota/ahmad-sudirman.jpg",
    },
    {
      nama: "Ir. Siti Rahayu",
      komisi: "Komisi B - Perekonomian dan Keuangan",
      fraksi_partai: "Fraksi Partai Golongan Karya",
      url_photo: "/images/anggota/siti-rahayu.jpg",
    },
    {
      nama: "Drs. Budi Santosa",
      komisi: "Komisi C - Infrastruktur dan Pembangunan",
      fraksi_partai: "Fraksi Partai Gerakan Indonesia Raya",
      url_photo: "/images/anggota/budi-santosa.jpg",
    },
    {
      nama: "Yulianti, S.H.",
      komisi: "Komisi D - Kesejahteraan Rakyat",
      fraksi_partai: "Fraksi Partai Keadilan Sejahtera",
      url_photo: "/images/anggota/yulianti.jpg",
    },
    {
      nama: "Rony Fernando, M.Pd",
      komisi: "Komisi E - Pendidikan dan Kebudayaan",
      fraksi_partai: "Fraksi Partai NasDem",
      url_photo: "/images/anggota/rony-fernando.jpg",
    },
];


const page = () => {
  return (
    <>
    <HeaderPages title={"Anggota Dewan Perwakilan Rakyat Kabupaten Waropen"} />

    <div className='w-full bg-[#110e12] pt-5 pb-5 lg:px-16 px-10'>
        <div className="w-full flex lg:flex-row flex-col-reverse mb-8">
            <div className="flex flex-col lg:w-[70%] w-full ">
                <span className="text-white lg:text-xl text-base font-semibold">Semua Anggota Dewan Perwakilan Rakyat Republik Indonesia</span>
                <span className="text-gray-300 text-base font-mono">Menampilkan <span className="text-white font-semibold">{anggotaDewan.length} Anggota</span></span>
            </div>

            <div className="flex justify-end lg:w-[30%] w-full items-center lg:mb-0 mb-3">
                <Input type="text" placeholder="Cari anggota dewan" className={"text-white"} />
            </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {
                anggotaDewan.map((item, index) => (
                    <CardPerson key={index} nama={item.nama} komisi={item.komisi} fraksi={item.fraksi_partai} />
                ))
            }
        </div>
    </div>
    </>
  )
}

export default page