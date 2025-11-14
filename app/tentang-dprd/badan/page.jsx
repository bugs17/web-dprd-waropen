import BadanSection from '@/components/custom/badan-section'
import HeaderPages from '@/components/custom/header-pages'


export const generateMetadata = () => {
    return {
        title: 'Badan | DPRK WAROPEN',
    };
};

const BadanPage = () => {
  return (
    <>
    <HeaderPages title={"Badan-badan Dewan Perwakilan Rakyat Kabupaten Waropen"} />
    <BadanSection />
    </>
  )
}

export default BadanPage