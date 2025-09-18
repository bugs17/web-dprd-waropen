import { slugToText } from "@/lib/toSlug";

const EditBeritaPage = ({params}) => {
    const { slug } = params;
    
    if (!slug) {
        return <p>ID not found</p>;
    }



  return (
    <div>
        {slugToText(slug)}
    </div>
  )
}

export default EditBeritaPage