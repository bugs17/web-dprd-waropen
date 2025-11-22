"use client";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import CardAnggotaKomisi from "./cardAnggotaKomisi";
import { getAllAnggotaDewan } from "@/action/get-list-anggota-dewan";

export const revalidate = 0;

// Sort komisi dibuat lebih aman dengan default list = []
const sortKomisi = (list = []) => {
  return list.sort((a, b) => {
    const j1 = a?.peranDewan?.toLowerCase() ?? "";
    const j2 = b?.peranDewan?.toLowerCase() ?? "";

    const rank = (jabatan) => {
      if (jabatan.includes("ketua") && !jabatan.includes("wakil")) return 1;
      if (jabatan.includes("wakil")) return 2;
      if (jabatan.includes("anggota")) return 3;
      return 99;
    };

    return rank(j1) - rank(j2);
  });
};

const AcordComponent = () => {
  const [anggota, setAnggota] = useState([]); // awalnya [] → aman tidak error

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllAnggotaDewan();
      if (data) {
        setAnggota(data); // setelah fetch terisi, tetap aman
      }
    };
    fetchData();
  }, []);

  // filter tetap aman karena anggota awalnya []
  const komisiA = anggota.filter((a) =>
    a?.peranDewan?.includes("KOMISI A")
  );
  const komisiB = anggota.filter((a) =>
    a?.peranDewan?.includes("KOMISI B")
  );
  const komisiC = anggota.filter((a) =>
    a?.peranDewan?.includes("KOMISI C")
  );

  const komisis = [
    {
      name: "KOMISI-A",
      deskripsi: "MEMBIDANGI HUKUM DAN PEMERINTAHAN",
      anggotaKomisi: sortKomisi(komisiA),
    },
    {
      name: "KOMISI-B",
      deskripsi: "MEMBIDANGI EKONOMI DAN KEUANGAN",
      anggotaKomisi: sortKomisi(komisiB),
    },
    {
      name: "KOMISI-C",
      deskripsi: "MEMBIDANGI PEMBANGUNAN",
      anggotaKomisi: sortKomisi(komisiC),
    },
  ];

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full mb-5"
      defaultValue="item-1"
    >
      {komisis.map((kms, idx) => (
        <AccordionItem key={idx} value={`item-${idx + 1}`}>
          <AccordionTrigger className="items-center justify-center flex flex-row gap-3">
            <h1 className="text-amber-300 lg:text-4xl text-xl font-extrabold ">
              {kms.name}
            </h1>
          </AccordionTrigger>

          <AccordionContent className="flex flex-col justify-center">
            <p className="text-white lg:text-center lg:text-lg text-sm text-balance text-center">
              {kms.deskripsi}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 gap-4 mt-8">
              {kms?.anggotaKomisi?.length > 0 ? (
                kms.anggotaKomisi.map((agt, i) => (
                  <CardAnggotaKomisi
                    key={i}
                    komisi={kms.name}
                    nama={agt.nama}
                    status={agt.peranDewan}
                    urlImage={agt.imageUrl}
                  />
                ))
              ) : (
                <></>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

const KomisiSection = () => {
  return (
    <div className="w-full h-full lg:px-8 px-5">
      <p className="text-white text-base lg:text-center text-balance lg:mb-4 mb-8">
        Komisi merupakan alat kelengkapan DPRK yang bersifat tetap dan dibentuk
        oleh DPRK pada awal masa jabatan keanggotaan DPRK. Setiap anggota DPRK
        kecuali pimpinan DPRK wajib menjadi anggota salah satu komisi. Komisi
        pada Dewan Perwakilan Rakyat Kabupaten Waropen meliputi Komisi A
        (Membidangi HUKUM DAN PEMERINTAHAN), Komisi B (Membidangi EKONOMI DAN
        KEUANGAN), Komisi C (Membidangi PEMBANGUNAN).
      </p>

      <AcordComponent />
    </div>
  );
};

export default KomisiSection;
