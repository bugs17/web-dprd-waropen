export const dynamic = "force-dynamic";
import { prisma } from "@/lib/db"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import CardAnggotaBadan from "./card--anggota-badan"

export const revalidate = 0;

const sortBadan = (list) => {
  return list.sort((a, b) => {
    const j1 = a.peranBadan.toLowerCase();
    const j2 = b.peranBadan.toLowerCase();

    const rank = (jabatan) => {
      if (jabatan.includes("ketua") && !jabatan.includes("wakil")) return 1;
      if (jabatan.includes("wakil")) return 2;
      if (jabatan.includes("anggota")) return 3;
      return 99;
    };

    return rank(j1) - rank(j2);
  });
};

const AcordComponent = async () => {

  const badan = await prisma.badan.findMany({
    include:{
      anggotaDewan:true
    },
    orderBy:{
      id:"desc"
    }
  })

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full mb-5"
      defaultValue="item-1"
    >
    {badan.length > 0 ? (
      badan.map((b, i) => (

      <AccordionItem key={i} value={`item-${i+1}`}>
        <AccordionTrigger className="items-center justify-center flex flex-row gap-3">
          <h1 className="text-amber-300 lg:text-4xl text-xl uppercase lg:font-extrabold font-bold">{b.nama}</h1>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col justify-center">
          <p className=" lg:text-center lg:text-lg text-sm text-zinc-500 text-center">
            PERIODE TAHUN {b.tahunPeriode}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {b.anggotaDewan.length > 0 ? (
              
              sortBadan(b.anggotaDewan).map((a, ai) => (
                <CardAnggotaBadan key={ai} badan={b.nama} nama={a.nama} status={a.peranBadan} />
              ))
            ):(
              <></>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>

      ))
    ) : (
      <></>
    )}
    </Accordion>
  )
}

const BadanSection = () => {
  return (
    <div className="w-full h-full lg:px-8 px-5">

        <p className="text-white lg:text-center text-balance text-base mb-8 lg:mb-4">
          Badan-badan sebagai alat kelengkapan Dewan Perwakilan Rakyat Kabupaten Waropen meliputi Badan Musyawarah, Badan Pembentuk Peraturan Daerah, Badan Kehormatan, dan Badan Anggaran.
        </p>

        <AcordComponent />

    </div>
  )
}

export default BadanSection