"use client"
import { usePathname } from 'next/navigation'
import Footer from '../footer'

const FooterDinamic = () => {
    const pathname = usePathname()

    const isDashboard = pathname.startsWith("/dashboard");
    const isLogin = pathname.startsWith("/login");
    const hideFooter = isDashboard || isLogin;

    return <>{!hideFooter && <Footer />}</>;
}

export default FooterDinamic