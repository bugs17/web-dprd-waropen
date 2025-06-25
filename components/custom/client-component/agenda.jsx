"use client"

import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Clock4 } from 'lucide-react'
import { useState } from 'react';


const kegiatan = [
    {
      id: 1,
      tanggal: "Senin, 23-06-2025",
      jam: "09:00",
      judul_kegiatan: "Rapat Koordinasi Bulanan DPRD bersama seluruh ketua fraksi dan pimpinan komisi",
    },
    {
      id: 2,
      tanggal: "Selasa, 24-06-2025",
      jam: "10:30",
      judul_kegiatan: "Sidang Paripurna untuk Pembahasan dan Penetapan Rancangan APBD Tahun 2026",
    },
    {
      id: 3,
      tanggal: "Rabu, 25-06-2025",
      jam: "08:00",
      judul_kegiatan: "Kunjungan Kerja Komisi A ke Kecamatan Timur untuk meninjau proyek infrastruktur jalan",
    },
    {
      id: 4,
      tanggal: "Kamis, 26-06-2025",
      jam: "13:00",
      judul_kegiatan: "Audiensi bersama LSM dan perwakilan warga terkait isu lingkungan dan tata ruang kota",
    },
    {
      id: 5,
      tanggal: "Jumat, 27-06-2025",
      jam: "15:45",
      judul_kegiatan: "Sosialisasi Peraturan Daerah Baru tentang Ketertiban Umum dan Ketenteraman Masyarakat",
    },
];
  

const Agenda = () => {

    const [index, setIndex] = useState(0)
    const data = kegiatan[index]

    const next = () => {
        if (index < kegiatan.length - 1) {
            setIndex(index + 1);
        }
    }

    const prev = () => {
        if (index > 0) {
            setIndex(index - 1);
          }
    }



  return (
    <div className='w-full  bg-[#231c26]'>
            <div className='w-full justify-center items-center flex flex-col py-5'>
                <div className="flex flex-row items-center gap-3">
                    {
                    index <= 0 ? "" : (
                    <Button onClick={prev} className={"cursor-pointer bg-amber-500 hover:bg-orange-300"}>
                        <ChevronLeft className="text-black" />
                    </Button>
                    )
                    }
                    <span className="font-semibold text-white text-lg">{data.tanggal}</span>
                    <Button onClick={next} className={"cursor-pointer bg-amber-500 hover:bg-orange-300"}>
                        <ChevronRight className="text-black" />
                    </Button>
                </div>

                <div className="w-full px-12 flex flex-col gap-6">
                    <div className="w-full border-l-4 border-violet-400 flex flex-col gap-5 pl-10">
                        <div className="flex flex-row gap-3 items-center">
                            <Clock4 className="text-white" />
                            <span className="text-white">{data.jam}</span>
                        </div>
                        <div>
                            <p className="text-white font-medium">
                                {data.judul_kegiatan}
                            </p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
  )
}

export default Agenda