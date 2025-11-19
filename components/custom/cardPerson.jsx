export const dynamic = "force-dynamic";
import { prisma } from '@/lib/db'
import { toSlug } from '@/lib/toSlug'
import Image from 'next/image'
import Link from 'next/link'

const listJabatanAnggotaDewan = [
    { nama: "KETUA DPRK" },
    { nama: "WAKIL KETUA I" },
    { nama: "WAKIL KETUA II" },
    { nama: "WAKIL KETUA III" },
    { nama: "KETUA KOMISI A" },
    {  nama: "WAKIL KETUA KOMISI A" },
    {nama: "ANGGOTA KOMISI A" },
    {nama: "KETUA KOMISI B" },
    {nama: "WAKIL KETUA KOMISI B" },
    { nama: "ANGGOTA KOMISI B" },
    { nama: "KETUA KOMISI C" },
    { nama: "WAKIL KETUA KOMISI C" },
    { nama: "ANGGOTA KOMISI C" },
];

const CardPerson = async () => {

    const anggotaDewans = await prisma.anggotaDewan.findMany({
        include:{
            komisi:true,
            
        }
    })


    const anggotaDewanMapping = [];

    for (const { nama: jabatan } of listJabatanAnggotaDewan) {
    
    if (jabatan.startsWith("ANGGOTA")) {
        // Banyak orang
        const listAnggota = anggotaDewans.filter(a => a.peranDewan === jabatan);

        listAnggota.forEach(a => {
        anggotaDewanMapping.push({
            nama: a.nama,
            jabatan: a?.peranDewan || "-",
            fraksi_partai: a?.jabatanFraksi || "-",
            url_photo: `/api/anggota-dewan/image/${a.imageUrl}`,
        });
        });

    } else {
        // Satu orang saja
        const orang = anggotaDewans.find(a => a.peranDewan === jabatan);

        if (orang) {
        anggotaDewanMapping.push({
            nama: orang.nama,
            jabatan: orang?.peranDewan || "-",
            fraksi_partai: orang?.jabatanFraksi || "-",
            url_photo: `/api/anggota-dewan/image/${orang.imageUrl}`,
        });
        }
    }
    }

    // const ketua = anggotaDewans.find(p => p.peranDewan === "KETUA DPRK")

    // const anggotaDewanMapping = [
    // {
    //     nama: ketua.nama,
    //     komisi: ketua?.komisi?.nama || "-",
    //     fraksi_partai: ketua?.jabatanFraksi || "-",
    //     url_photo: `/api/anggota-dewan/image/${ketua.imageUrl}`,
    //     },
        
    // ];

    return (
            anggotaDewanMapping.map((a, idx) => (

                <Link key={idx} href={`/tentang-dprd/detail-anggota-dprk/${toSlug(a.nama)}`} className="flex-1 bg-[#231c26] hover:cursor-pointer group hover:shadow-violet-200  shadow rounded h-96 overflow-hidden">
                    <div className="flex lg:flex-row flex-col w-full h-full overflow-hidden">
                        <div className="lg:w-[40%] group-hover:w-[50%] transition-all duration-300 ease-in-out h-full overflow-hidden">
                            <Image 
                                alt={a.nama} 
                                className="object-cover h-full w-full" 
                                height={300} 
                                width={300} 
                                src={a.url_photo}  
                                placeholder="blur"
                                blurDataURL="/placeholder.png"
                                priority
                                />
                        </div>
                        <div className="lg:w-[60%] group-hover:w-[50%] transition-all duration-300 ease-in-out h-full py-5 px-2 flex flex-col">

                            <div className="w-full h-[50%] flex flex-col gap-2">
                                <span className="text-white font-semibold text-lg">{a.nama}</span>
                                <div className="flex flex-row items-center gap-1">
                                    <span className="text-sm text-gray-200">{a.jabatan}</span>
                                </div>
                            </div>

                            <div className="w-full h-[50%] flex items-end">
                                <div className="w-full py-5 border-t-2 border-t-amber-500 text-white text-sm">
                                    {a.fraksi_partai}
                                </div>
                            </div>

                        </div>
                    </div>
                </Link>
            ))
            )
}

export default CardPerson