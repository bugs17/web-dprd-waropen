import FormEditBerita from "@/components/custom/client-component/form-edit-berita";
import { prisma } from "@/lib/db";
import { slugToText } from "@/lib/toSlug";

const EditBeritaPage = async ({params}) => {
    const { slug } = await params;

    if (!slug) {
    return <p>Not found</p>;
    }
    

    let berita;
    try {
        berita = await prisma.berita.findFirst({
            where:{
                slug:slug
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