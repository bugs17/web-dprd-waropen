import HeaderPages from '@/components/custom/header-pages'
import KomisiSection from '@/components/custom/komisi-section'

export const generateMetadata = () => {
    return {
        title: 'Komisi | DPRK WAROPEN',
    };
};

const KomisiPage = () => {
  return (
    <>
    <HeaderPages title={"Komisi-komisi Dewan Perwakilan Rakyat Kabupaten Waropen"} />
    <KomisiSection />
    </>
  )
}

export default KomisiPage