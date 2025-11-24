import { getAgendaList } from '@/action/get-agenda'
import Calendar from './kalender-component'



const KalenderSection = async () => {

  const data = await getAgendaList()

  return (
    <div className="relative overflow-visible z-0 bg-[radial-gradient(#312e31_1px,transparent_0.3px)] [background-size:16px_16px] w-full pb-20 bg-[#231c26] px-10 lg:px-20">
      <Calendar instances={data} />
    </div>
  )
}

export default KalenderSection
