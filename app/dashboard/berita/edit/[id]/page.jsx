

import FormEditBerita from "@/components/custom/client-component/form-edit-berita";
import { prisma } from "@/lib/db";

export const revalidate = 0;

export const generateMetadata = () => {
  return {
    title: 'Berita | DPRK WAROPEN',
  };
};

const EditBeritaPage = async ({params}) => {
    const { id } = await params;

    if (!id) {
    return <p>Not found</p>;
    }
    

    let berita;
    try {
        berita = await prisma.berita.findFirst({
            where:{
                id:parseInt(id)
            }
        })
    } catch (error) {
        console.error(error.message)
    }





  return (
        <FormEditBerita  judulProps={berita.judul} dateProps={berita.createdAt} postProps={berita.isi} imgUrlProps={berita.imageUrl} idProps={berita.id}/>
  )
}

export default EditBeritaPage