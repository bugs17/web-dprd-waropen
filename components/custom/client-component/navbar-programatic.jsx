"use client"
import { usePathname } from 'next/navigation'
import Navbar from '../navbar'

const NavbarDinamic = () => {
    const pathname = usePathname()

    const hideLayout = pathname.startsWith("/dashboard") // bisa disesuaikan
  return (
    <>
        {!hideLayout && <Navbar />}
    </>
  )
}

export default NavbarDinamic