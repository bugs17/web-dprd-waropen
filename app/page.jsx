import AgendaAndSosialMedia from "@/components/custom/agenda-dan-sosialmedia";
import BackToTop from "@/components/custom/back-to-top";
import BeritaHome from "@/components/custom/berita";
import Devider from "@/components/custom/devider";
import DokumenTerbaru from "@/components/custom/dokumen-terbaru-home";
import Hero from "@/components/custom/hero-section";
import KalenderSection from "@/components/custom/kalender-section";
import LayananCepat from "@/components/custom/layanan-cepat";
import Navbar from "@/components/custom/navbar";


export const metadata = {
  title: "Beranda | DPRD Kabupaten Waropen",
  description: "Halaman beranda website DPRD Kabupaten Waropen",
}

export default function Home() {



  return (
    <>
      {/* <BackToTop /> */}
      <Navbar />
      <Hero />
      <Devider title={'Layanan Cepat'} bg={false} btn={false} underLine={false} />
      <LayananCepat />
      <Devider title={'Berita Terkini'} bg={true} btn={true} underLine={false} />
      <BeritaHome />
      <Devider title={'Dokumen Terbaru'} bg={false} btn={false} underLine={true} />
      <DokumenTerbaru />
      <Devider title={'Kalender Sidang'} bg={true} btn={false} underLine={false} />
      <KalenderSection />
      <AgendaAndSosialMedia />
    </>
  );
}
