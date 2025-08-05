'use client'

import { useEffect, useState } from 'react'

export default function DigitalClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      setTime(`${hours}:${minutes}`)
    }

    updateClock() // update saat mount
    const interval = setInterval(updateClock, 1000 * 60) // update tiap menit

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-gray-300 text-2xl font-mono">
      {time}
    </div>
  )
}
