import CalendarAdmin from "@/components/custom/client-component/calandarAdmin"

export const generateMetadata = () => {
    return {
        title: 'Jadwal | DPRK WAROPEN',
    };
};

const JadwalSidangPage = () => {
  return (
    <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-6">

            <CalendarAdmin />
        </div>
  )
}

export default JadwalSidangPage