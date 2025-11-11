'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// Style bawaan NProgress bisa diubah, tapi ini cukup default
NProgress.configure({ showSpinner: false, trickleSpeed: 100 })

export default function ProgressBarClient() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.start()
    const timeout = setTimeout(() => {
      NProgress.done()
    }, 400)

    return () => clearTimeout(timeout)
  }, [pathname, searchParams])

  return null
}
