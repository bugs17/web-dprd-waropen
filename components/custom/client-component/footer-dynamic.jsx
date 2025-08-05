"use client"
import { usePathname } from 'next/navigation'
import Footer from '../footer'

const FooterDinamic = () => {
    const pathname = usePathname()

    const hideLayout = pathname.startsWith("/dashboard") // bisa disesuaikan
  return (
    <>
        {!hideLayout && <Footer />}
    </>
  )
}

export default FooterDinamic