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

const toSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")    // hapus tanda baca kecuali huruf & angka
      .replace(/\s+/g, "-")           // ganti spasi jadi tanda minus
      .trim();
  };

const CardPerson = ({nama, komisi, fraksi, index}) => {

    return (
        <Link href={`/tentang-dprd/detail-anggota-dprk/${toSlug(nama)}`} className="flex-1 bg-[#231c26] hover:cursor-pointer group hover:shadow-violet-200  shadow rounded h-96 overflow-hidden">
            <div className="flex flex-row w-full h-full overflow-hidden">
                <div className="w-[40%] group-hover:w-[50%] transition-all duration-300 ease-in-out h-full overflow-hidden">
                    <Image alt="foto anggota dprk waropen" className="object-cover h-full w-full" height={300} width={300} src={"/person.jpg"}  />
                </div>
                <div className="w-[60%] group-hover:w-[50%] transition-all duration-300 ease-in-out h-full py-5 px-2 flex flex-col">

                    <div className="w-full h-[50%] flex flex-col gap-2">
                        <span className="text-white font-semibold text-lg">{nama}</span>
                        <div className="flex flex-row items-center gap-1">
                            <span className="text-sm text-gray-200">{komisi}</span>
                        </div>
                    </div>

                    <div className="w-full h-[50%] flex items-end">
                        <div className="w-full py-5 border-t-2 border-t-amber-500 text-white text-sm">
                            {fraksi}
                        </div>
                    </div>

                </div>
            </div>
        </Link>
    )
}
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