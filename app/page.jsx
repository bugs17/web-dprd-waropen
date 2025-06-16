import BackToTop from "@/components/custom/back-to-top";
import Devider from "@/components/custom/devider";
import Hero from "@/components/custom/hero-section";
import LayananCepat from "@/components/custom/layanan-cepat";
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
      <Hero />
      <Devider title={'Layanan Cepat'} />
      <LayananCepat />
    </>
  );
}
