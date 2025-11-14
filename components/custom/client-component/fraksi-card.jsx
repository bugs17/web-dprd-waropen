"use client"

import Image from "next/image";
import Link from "next/link";
import { toSlug } from '@/lib/toSlug'


// rank jabatan
const getRank = (jabatan) => {
  const lower = jabatan.toLowerCase();

  
  if (lower.startsWith("ketua")) return 1;
  if (lower.startsWith("wakil")) return 2;

  if (lower.startsWith("anggota")) return 3;

  return 999;
};

// sorting tanpa mutasi array asli
const sortAnggotaDewan = (list) => {
  return [...list].sort((a, b) => getRank(a.jabatanFraksi) - getRank(b.jabatanFraksi));
};


export default function FraksiComponent({ fraksiData }) {
  return (
    <div className="space-y-12 px-8 py-16">
      {fraksiData.map((fraksi, idx) => (
        <div key={idx} className="bg-muted/50 bg-[radial-gradient(#312e31_1px,transparent_0.3px)] [background-size:16px_16px] p-8 shadow-md text-white">
          {/* Nama Fraksi */}
          <h2 className="text-3xl text-center font-bold mb-6 border-b-2 border-b-amber-400">{fraksi.nama}</h2>

          {/* Logo Partai */}
          <div className="flex justify-center mb-8">
            
            {fraksi.partai.map((party, pIdx) => (
                <div key={pIdx} className="flex flex-col gap-8 items-center">
                  {/* <Image
                      src={`/api/partai/image/${party.imageUrl}`}
                      alt={party.nama}
                      width={120}
                      height={120}
                      priority
                      className="rounded-full border-2 border-white"
                  /> */}
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                    
                      {(() => {
                        const sortedDewan = sortAnggotaDewan(party.anggotaDewan);
                        return sortedDewan.map((member, mIdx) => (
                          <Link key={mIdx} href={`/tentang-dprd/detail-anggota-dprk/${toSlug(member.nama)}`} className="flex-1 bg-[#231c26] hover:cursor-pointer group hover:shadow-violet-200  shadow rounded h-96 overflow-hidden">
                              <div className="flex flex-row w-full h-full overflow-hidden">
                                  <div className="w-[50%] group-hover:w-[60%] transition-all duration-300 ease-in-out h-full overflow-hidden">
                                      <Image 
                                          alt={member.nama} 
                                          className="object-cover h-full w-full" 
                                          height={300} 
                                          width={300} 
                                          src={`/api/anggota-dewan/image/${member.imageUrl}`}  
                                          placeholder="blur"
                                          blurDataURL="/placeholder.png"
                                          priority
                                          />
                                  </div>
                                  <div className="w-[50%] group-hover:w-[40%] transition-all duration-300 ease-in-out h-full py-5 px-2 flex flex-col">

                                      <div className="w-full h-[50%] flex flex-col gap-2">
                                          <span className="text-white font-semibold text-lg">{member.nama}</span>
                                          
                                      </div>

                                      <div className="w-full h-[50%] flex items-end">
                                          <div className="w-full py-5 border-t-2 border-t-amber-500 text-white text-sm">
                                              {member.jabatanFraksi}
                                          </div>
                                      </div>

                                  </div>
                              </div>
                          </Link>
                        ));
                      })()}
                    
                  </div>
                </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}


