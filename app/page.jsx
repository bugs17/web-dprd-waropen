import KontakOnNavbar from "@/components/custom/kontak-on-navbar";
import NavMenu from "@/components/custom/nav-menu";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-28 bg-[#231c26] flex flex-row sticky">
      {/* ini untuk logo */}
      <Link href={'/'} className="h-full w-[25%] flex flex-row items-center gap-2 pl-4">
        <Image style={{ objectFit: 'contain' }} src={'/logo.png'} height={80} width={80} draggable={false} alt="logo"  />
        <div class="text-center text-white text-xs leading-tight">
          <p>Dewan Perwakilan Rakyat Daerah</p>
          <p>Kabupaten Waropen</p>
        </div>
      </Link>

      {/* ini untuk navbar */}
      <div className="h-full w-[75%]  flex flex-col ">
        <div className=" w-full flex justify-end">
          <KontakOnNavbar />
        </div>

        <div className="justify-center items-end px-8 pb-4 flex w-full h-full">
          <NavMenu />
        </div>
      </div>
    </div>
  );
}
