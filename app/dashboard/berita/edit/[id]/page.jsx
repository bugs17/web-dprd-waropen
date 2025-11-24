

"use client";
import { getDetailBerita } from "@/action/get-detail-berita";
import FormEditBerita from "@/components/custom/client-component/form-edit-berita";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";



const EditBeritaPage = () => {
    const params = useParams()
    const id = params.id

    if (!id) {
      return <p>Not found</p>;
    }

    const [beritaState, setBeritaState] = useState(null)

    const fetchData = async () => {
      const {berita, beritas} = await getDetailBerita(id)
      if (berita) {
        setBeritaState(berita)
      }
    }

    useEffect(() => {
      document.title = 'Berita | DPRK WAROPEN'
      fetchData()
    },[])


  if (beritaState === null) {
    return (
      <div className='w-full justify-center items-center'>
          <Loader className='text-amber-500 animate-spin' />
      </div>
    )
  }





  return (
        <FormEditBerita  judulProps={beritaState.judul} dateProps={beritaState.createdAt} postProps={beritaState.isi} imgUrlProps={beritaState.imageUrl} idProps={beritaState.id}/>
  )
}

export default EditBeritaPage