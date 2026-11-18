"use client"
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react'
import { createViewMonthGrid } from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/calendar.css'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { formatDateCalander } from '@/lib/formatDate'
import { useTheme } from './client-component/theme-toggle'

const Calendar = ({instances}) => {
  const { theme } = useTheme()


  
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
    <div className={theme === "dark" ? "is-dark" : undefined}>
      <ScheduleXCalendar calendarApp={kalender} />
    </div>
  )
}

export default Calendar

