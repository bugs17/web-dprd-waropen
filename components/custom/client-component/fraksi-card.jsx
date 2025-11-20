"use client"

import Image from "next/image";
import Link from "next/link";


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
    <div className="lg:space-y-12 space-y-8 lg:px-8 py-16">
      {fraksiData.map((fraksi, idx) => (
        <div key={idx} className="bg-muted/50 bg-[radial-gradient(#312e31_1px,transparent_0.3px)] [background-size:16px_16px] p-8 shadow-md text-white">
          {/* Nama Fraksi */}
          <h2 className="lg:text-3xl text-2xl text-center font-bold lg:mb-6 mb-10 border-b-2 lg:border-b-amber-400 border-b-zinc-500">{fraksi.nama}</h2>

          {/* Logo Partai */}
          <div className="flex justify-center mb-8">
            
            {fraksi.partai.map((party, pIdx) => (
                <div key={pIdx} className="flex flex-col gap-8 items-center">
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 lg:gap-8 gap-4">
                      {(() => {
                        const sortedDewan = sortAnggotaDewan(party.anggotaDewan);
                        return sortedDewan.map((member, mIdx) => (
                          <Link key={mIdx} href={`/tentang-dprd/detail-anggota-dprk/${member.id}`} className="flex-1 bg-[#231c26] hover:cursor-pointer group hover:shadow-violet-200  shadow rounded lg:h-96 h-80 overflow-hidden">
                              <div className="flex lg:flex-row flex-col w-full h-full overflow-hidden">
                                  <div className="lg:w-[50%] md:lg:w-[50%] w-full lg:group-hover:w-[60%] lg:pt-0 pt-5 transition-all duration-300 ease-in-out h-full overflow-hidden">
                                      <Image 
                                          alt={member.nama} 
                                          className="lg:object-cover object-contain  h-full w-full" 
                                          height={300} 
                                          width={300} 
                                          src={`/api/anggota-dewan/image/${member.imageUrl}`}  
                                          placeholder="blur"
                                          blurDataURL="/placeholder.png"
                                          priority
                                          />
                                  </div>
                                  <div className="lg:w-[50%] md:lg:w-[50%] w-full lg:group-hover:w-[40%] transition-all duration-300 ease-in-out h-full py-5 px-2 flex flex-col">

                                      <div className="w-full lg:h-[50%] h-[40%] flex flex-col items-center lg:items-start gap-2">
                                          <span className="text-white font-semibold text-base lg:text-lg">{member.nama}</span>
                                      </div>

                                      <div className="w-full lg:h-[50%] h-[20%] flex lg:items-end items-center lg:justify-start justify-center">
                                          <div className="w-full lg:items-start items-center justify-center lg:justify-start flex lg:block py-5 border-t-2 lg:border-t-amber-500 border-t-zinc-500 text-white text-sm">
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


