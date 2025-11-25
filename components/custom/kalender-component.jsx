"use client"
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react'
import { createViewMonthGrid } from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/calendar.css'
import { createEventModalPlugin } from '@schedule-x/event-modal'

const Calendar = ({instances}) => {


  
  const kalender = useCalendarApp({
    locale: 'id-ID',
    views: [createViewMonthGrid()],
    events: instances.map((event) => ({
          id: event?.id,
          title: event?.tentang,
          start: new Date(event?.createdAt).toISOString().slice(0, 16),
          end: new Date(event?.createdAt).toISOString().slice(0, 16),
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

