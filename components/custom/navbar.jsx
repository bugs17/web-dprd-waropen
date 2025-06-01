import React from 'react'
import LogoNavbar from './logo-navbar'
import KontakOnNavbar from './kontak-on-navbar'
import NavMenu from './nav-menu'
import SideBarMobile from './side-bar-mobile'

const Navbar = () => {
  return (
    <div className="w-full lg:h-28 h-18 bg-[#231c26] flex flex-row sticky top-0 z-50">
      {/* ini untuk logo */}
      <LogoNavbar />

      {/* ini untuk navbar */}
      <div className="h-full lg:w-[75%] w-[25%]  lg:flex lg:flex-col ">
        <div className="hidden w-full lg:flex justify-end">
          <KontakOnNavbar />
        </div>

        <div className="justify-end items-end px-3 pb-4 hidden lg:flex w-full h-full">
          <NavMenu />
        </div>

        <SideBarMobile />
      </div>
    </div>
  )
}

export default Navbar