import BackToTop from "@/components/custom/back-to-top";
import Navbar from "@/components/custom/navbar";


export const metadata = {
  title: "Beranda | DPRD Kabupaten Waropen",
  description: "Halaman beranda website DPRD Kabupaten Waropen",
}

export default function Home() {



  return (
    <>
    <BackToTop />
      <Navbar />
      
    </>
  );
}
