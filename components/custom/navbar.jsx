import LogoNavbar from './logo-navbar'
import KontakOnNavbar from './kontak-on-navbar'
import NavMenu from './nav-menu'
import SideBarMobile from './side-bar-mobile'
import ThemeToggle from './client-component/theme-toggle'

const Navbar = () => {
  return (
    <div className="w-full lg:h-28 h-18 bg-app-surface border-b border-app-line flex flex-row sticky top-0 z-50">
      {/* ini untuk logo */}
      <LogoNavbar />

      {/* ini untuk navbar */}
      <div className="h-full lg:w-[75%] w-[25%] lg:flex lg:flex-col ">
        <div className="hidden w-full lg:flex justify-end items-center gap-2">
          <ThemeToggle />
          <KontakOnNavbar />
        </div>

        <div className="justify-between items-end px-3 pb-4 hidden lg:flex lg:flex-row w-full h-full">
          <div className="hidden w-full h-full lg:flex items-end pb-2">
            {/* <NamaKetuaWithTooltip /> */}
          </div>
          <NavMenu />
        </div>

        <SideBarMobile />
      </div>
    </div>
  )
}

export default Navbar