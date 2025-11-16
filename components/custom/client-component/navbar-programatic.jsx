"use client"
import { usePathname } from 'next/navigation'
import Navbar from '../navbar'

const NavbarDinamic = () => {
    const pathname = usePathname()

    const isDashboard = pathname.startsWith("/dashboard");
    const isLogin = pathname.startsWith("/login");
    const hideFooter = isDashboard || isLogin;

    return <>{!hideFooter && <Navbar />}</>;
  
}

export default NavbarDinamic