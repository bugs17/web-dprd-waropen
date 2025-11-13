import LogoNavbar from './logo-navbar'
import KontakOnNavbar from './kontak-on-navbar'
import NavMenu from './nav-menu'
import SideBarMobile from './side-bar-mobile'
import NamaKetuaWithTooltip from './nama-ketua-navbar'

const Navbar = () => {
  return (
    <div className="w-full lg:h-28 h-18 bg-[#231c26] flex flex-row sticky top-0 z-50">
      {/* ini untuk logo */}
      <LogoNavbar />

      {/* ini untuk navbar */}
      <div className="h-full lg:w-[75%] w-[25%] lg:flex lg:flex-col ">
        <div className="hidden w-full lg:flex justify-end">
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