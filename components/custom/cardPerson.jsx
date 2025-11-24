"use client"
import { getAllAnggotaDewan } from '@/action/get-list-anggota-dewan';
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react';


const listJabatanAnggotaDewan = [
    { nama: "KETUA DPRK" },
    { nama: "WAKIL KETUA I" },
    { nama: "WAKIL KETUA II" },
    { nama: "WAKIL KETUA III" },
    { nama: "KETUA KOMISI A" },
    {nama: "KETUA KOMISI B" },
    { nama: "KETUA KOMISI C" },
    {  nama: "WAKIL KETUA KOMISI A" },
    {nama: "WAKIL KETUA KOMISI B" },
    { nama: "WAKIL KETUA KOMISI C" },
    {nama: "ANGGOTA KOMISI A" },
    { nama: "ANGGOTA KOMISI B" },
    { nama: "ANGGOTA KOMISI C" },
];

const CardPerson = () => {
    const [anggotaDewans, setAnggotaDewans] = useState([])

    useEffect(() => {
        const getDewans = async () => {
            const data = await getAllAnggotaDewan()
            if (data) {
                setAnggotaDewans(data)
            }
        }
        getDewans()
    },[])


    const anggotaDewanMapping = [];

    for (const { nama: jabatan } of listJabatanAnggotaDewan) {
    
    if (jabatan.startsWith("ANGGOTA")) {
        // Banyak orang
        const listAnggota = anggotaDewans.filter(a => a.peranDewan === jabatan);

        listAnggota.forEach(a => {
        anggotaDewanMapping.push({
            id: a.id,
            nama: a.nama,
            jabatan: a?.peranDewan || "-",
            fraksi_partai: a?.partai?.fraksi?.nama || "Pengangkatan Adat",
            url_photo: `/api/anggota-dewan/image/${a.imageUrl}`,
        });
        });

    } else {
        // Satu orang saja
        const orang = anggotaDewans.find(a => a.peranDewan === jabatan);

        if (orang) {
        anggotaDewanMapping.push({
            id:orang.id,
            nama: orang.nama,
            jabatan: orang?.peranDewan || "-",
            fraksi_partai: orang?.partai?.fraksi?.nama || "Pengangkatan Adat",
            url_photo: `/api/anggota-dewan/image/${orang.imageUrl}`,
        });
        }
    }
    }



    return (
            anggotaDewanMapping.map((a, idx) => (

                <Link key={idx} href={`/tentang-dprd/detail-anggota-dprk/${a.id}`} className="flex-1 bg-[#231c26] hover:cursor-pointer group hover:shadow-violet-200  shadow rounded h-96 overflow-hidden">
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
                                    <span className="text-xs text-zinc-500">{a.fraksi_partai}</span>
                                </div>
                            </div>

                            <div className="w-full h-[50%] flex items-end">
                                <div className="w-full py-5 text-amber-400 border-t-2 border-t-zinc-500  text-sm">
                                    {a.jabatan}
                                </div>
                            </div>

                        </div>
                    </div>
                </Link>
            ))
            )
}

export default CardPerson