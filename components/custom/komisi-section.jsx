import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import CardAnggotaKomisi from "./cardAnggotaKomisi"


const AcordComponent = ({komisi}) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full mb-5"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="items-center justify-center flex flex-row gap-3">
          <h1 className="text-amber-300 text-4xl font-extrabold ">KOMISI-A</h1>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col justify-center">
          <p className="text-white lg:text-center text-lg text-balance text-center">
            MEMBIDANGI HUKUM DAN PEMERINTAHAN
          </p>
          <p className="text-white lg:text-center text-lg text-center">
            PERIODE TAHUN 2024-2029
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <CardAnggotaKomisi komisi={"A"} nama={"John Doe"} status={"KETUA"} />
            <CardAnggotaKomisi komisi={"A"} nama={"John Doe"} status={"WAKIL KETUA"} />
            <CardAnggotaKomisi komisi={"A"} nama={"John Doe"} status={"ANGGOTA"} />
            <CardAnggotaKomisi komisi={"A"} nama={"John Doe"} status={"ANGGOTA"} />
            <CardAnggotaKomisi komisi={"A"} nama={"John Doe"} status={"ANGGOTA"} />
            <CardAnggotaKomisi komisi={"A"} nama={"John Doe"} status={"ANGGOTA"} />
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger className="items-center justify-center flex flex-row gap-3">
          <h1 className="text-amber-300 text-4xl font-extrabold ">KOMISI-B</h1>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col justify-center">
          <p className="text-white lg:text-center text-lg text-balance text-center">
            MEMBIDANGI EKONOMI DAN KEUANGAN
          </p>
          <p className="text-white lg:text-center text-lg text-center">
            PERIODE TAHUN 2024-2029
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <CardAnggotaKomisi komisi={"B"} nama={"John Doe"} status={"KETUA"} />
            <CardAnggotaKomisi komisi={"B"} nama={"John Doe"} status={"WAKIL KETUA"} />
            <CardAnggotaKomisi komisi={"B"} nama={"John Doe"} status={"ANGGOTA"} />
            <CardAnggotaKomisi komisi={"B"} nama={"John Doe"} status={"ANGGOTA"} />
            <CardAnggotaKomisi komisi={"B"} nama={"John Doe"} status={"ANGGOTA"} />
            <CardAnggotaKomisi komisi={"B"} nama={"John Doe"} status={"ANGGOTA"} />
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger className="items-center justify-center flex flex-row gap-3">
          <h1 className="text-amber-300 text-4xl font-extrabold ">KOMISI-C</h1>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col justify-center">
          <p className="text-white lg:text-center text-lg text-balance text-center">
            MEMBIDANGI PEMBANGUNAN
          </p>
          <p className="text-white lg:text-center text-lg text-center">
            PERIODE TAHUN 2024-2029
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <CardAnggotaKomisi komisi={"C"} nama={"John Doe"} status={"KETUA"} />
            <CardAnggotaKomisi komisi={"C"} nama={"John Doe"} status={"WAKIL KETUA"} />
            <CardAnggotaKomisi komisi={"C"} nama={"John Doe"} status={"ANGGOTA"} />
            <CardAnggotaKomisi komisi={"C"} nama={"John Doe"} status={"ANGGOTA"} />
            <CardAnggotaKomisi komisi={"C"} nama={"John Doe"} status={"ANGGOTA"} />
            <CardAnggotaKomisi komisi={"C"} nama={"John Doe"} status={"ANGGOTA"} />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}


const KomisiSection = () => {
  return (
    <div className="w-full h-full lg:px-8 px-5">

        <p className="text-white lg:text-center text-balance lg:mb-4">
          Komisi merupakan alat kelengkapan DPRK yang bersifat tetap dan dibentuk oleh DPRK pada awal masa jabatan keanggotaan DPRK. Setiap anggota DPRK kecuali pimpinan DPRK wajib menjadi anggota salah satu komisi.
          Komisi pada Dewan Perwakilan Rakyat Kabupaten Waropen meliputi Komisi A (Membidangi HUKUM DAN PEMERINTAHAN), Komisi B (Membidangi EKONOMI DAN KEUANGAN), Komisi C (Membidangi PEMBANGUNAN).
        </p>

        <AcordComponent />

    </div>
  )
}

export default KomisiSection