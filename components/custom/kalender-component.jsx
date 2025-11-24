"use client"
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react'
import { createViewMonthGrid } from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/calendar.css'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { formatDateCalander } from '@/lib/formatDate'

const Calendar = ({instances}) => {


  
  const kalender = useCalendarApp({
    locale: 'id-ID',
    views: [createViewMonthGrid()],
    events: instances.map((event) => ({
          id: event?.id,
          title: event?.tentang,
          start: formatDateCalander(event?.date),
          end: formatDateCalander(event?.date),
          description: event?.deskripsi
        })), // selalu ada, bisa kosong dulu
    plugins: [
      typeof window !== 'undefined' &&
        createEventModalPlugin({ appendTo: document.body }),
    ].filter(Boolean),
  })

  return (
    <ScheduleXCalendar calendarApp={kalender} />
  )
}

export default Calendar




// const events = [
//   {
//     id: 1,
//     title: "Rapat Paripurna Pembukaan Masa Sidang",
//     start: "2025-06-18T09:00:00.000Z",
//     end: "2025-06-18T12:00:00.000Z",
//     description: "Sidang pembukaan masa sidang DPRD tahun anggaran 2025."
//   },
//   {
//     id: 2,
//     title: "Rapat Komisi Anggaran dan Keuangan",
//     start: "2025-06-20T13:00:00.000Z",
//     end: "2025-06-20T16:00:00.000Z",
//     description: "Pembahasan RKA SKPD dan rancangan APBD perubahan 2025."
//   },
//   {
//     id: 3,
//     title: "Rapat Dengar Pendapat Umum (RDPU)",
//     start: "2025-06-24T08:30:00.000Z",
//     end: "2025-06-24T11:30:00.000Z",
//     description: "RDPU dengan masyarakat terkait revisi Perda RTRW kota."
//   },
//   {
//     id: 4,
//     title: "Rapat Gabungan Komisi",
//     start: "2025-06-27T10:00:00.000Z",
//     end: "2025-06-27T14:00:00.000Z",
//     description: "Pembahasan hasil evaluasi gubernur terhadap APBD murni 2025."
//   },
//   {
//     id: 5,
//     title: "Rapat Paripurna Penetapan Perda",
//     start: "2025-07-01T09:00:00.000Z",
//     end: "2025-07-01T12:00:00.000Z",
//     description: "Penetapan dan pengesahan 3 Perda inisiatif DPRD."
//   }
// ];