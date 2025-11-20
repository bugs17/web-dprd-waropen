export const dynamic = "force-dynamic";
import { prisma } from '@/lib/db'
import Calendar from './kalender-component'

export const revalidate = 0;


const KalenderSection = async () => {

  const data = await prisma.jadwalSidang.findMany()

  return (
    <div className="relative overflow-visible z-0 bg-[radial-gradient(#312e31_1px,transparent_0.3px)] [background-size:16px_16px] w-full pb-20 bg-[#231c26] px-10 lg:px-20">
      <Calendar instances={data} />
    </div>
  )
}

export default KalenderSection
