export const dynamic = "force-dynamic";
import FraksiComponent from '@/components/custom/client-component/fraksi-card';
import HeaderPages from '@/components/custom/header-pages'
import { prisma } from '@/lib/db';

export const revalidate = 0;


export const generateMetadata = () => {
    return {
        title: 'Fraksi | DPRK WAROPEN',
    };
};

const FraksiPage = async () => {

  const fraksis = await prisma.fraksi.findMany({
    include:{
      partai:{
        include:{
          anggotaDewan:true
        }
      }
    }
  })

  return (
    <>
        <HeaderPages title={"Fraksi-fraksi Dewan Perwakilan Rakyat Kabupaten Waropen"} />
        <FraksiComponent fraksiData={fraksis} />
    </>
  )
}

export default FraksiPage