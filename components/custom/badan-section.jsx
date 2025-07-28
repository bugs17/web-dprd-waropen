import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import CardAnggotaBadan from "./card--anggota-badan"


const AcordComponent = () => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full mb-5"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="items-center justify-center flex flex-row gap-3">
          <h1 className="text-amber-300 text-4xl font-extrabold ">BADAN MUSYAWARAH</h1>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col justify-center">
          <p className="text-white lg:text-center text-lg text-center">
            PERIODE TAHUN 2024-2029
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <CardAnggotaBadan badan={"MUSYAWARAH"} nama={"John Doe"} status={"KETUA"} />
            
          </div>
        </AccordionContent>
      </AccordionItem>

    </Accordion>
  )
}

const BadanSection = () => {
  return (
    <div className="w-full h-full lg:px-8 px-5">

        <p className="text-white lg:text-center text-balance lg:mb-4">
          Badan-badan sebagai alat kelengkapan Dewan Perwakilan Rakyat Kabupaten Waropen meliputi Badan Musyawarah, Badan Pembentuk Peraturan Daerah, Badan Kehormatan, dan Badan Anggaran.
        </p>

        <AcordComponent />

    </div>
  )
}

export default BadanSection