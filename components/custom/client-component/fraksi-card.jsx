"use client"

import Image from "next/image";

export default function FraksiComponent({ fraksiData }) {
  return (
    <div className="space-y-12 px-8 py-16">
      {fraksiData.map((fraksi, idx) => (
        <div key={idx} className="bg-muted/50 p-8 shadow-md text-white">
          {/* Nama Fraksi */}
          <h2 className="text-3xl text-center font-bold mb-6">{fraksi.name}</h2>

          {/* Logo Partai */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-items-center mb-8">
            {fraksi.parties.map((party, pIdx) => (
                <div key={pIdx} className="flex flex-col items-center">
                <Image
                    src={party.logo}
                    alt={party.name}
                    width={80}
                    height={80}
                    priority
                    className="rounded-full border-2 border-white"
                />
                <span className="mt-3 text-lg font-semibold">{party.name}</span>
                </div>
            ))}
            </div>

          {/* Daftar Anggota Dewan */}
          <div className="grid md:grid-cols-2 gap-4">
            {fraksi.members.map((member, mIdx) => (
              <div key={mIdx} className="p-2 bg-zinc-800 rounded-md">
                <p>
                  <span className="font-semibold">{member.name}</span> -{" "}
                  <span className="italic">{member.role}</span> -{" "}
                  <span className="text-yellow-400">{member.party}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}