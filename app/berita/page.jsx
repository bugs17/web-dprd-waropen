import BeritaList from "@/components/custom/client-component/berita-list"
import HeaderPages from "@/components/custom/header-pages"


export const generateMetadata = () => {
    return {
        title: 'Berita | DPRK WAROPEN',
    };
};

const ListBerita = async () => {


  return (
    <>
        <HeaderPages title={"Berita"} />
        
        <BeritaList />
    </>
  )
}

export default ListBerita