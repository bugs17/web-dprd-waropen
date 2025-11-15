import FormStrukturOrganisasiSetwan from "@/components/custom/client-component/form-struktur-organisasi-setwan";
import { prisma } from "@/lib/db"


export const generateMetadata = () => {
    return {
        title: 'Struktur Organisasi Setwan | DPRK WAROPEN',
    };
};

const StrukturSetwanPage = async () => {

    const data = await prisma.setwan.findFirst()


    return (
        <FormStrukturOrganisasiSetwan data={data} />
    )
}

export default StrukturSetwanPage