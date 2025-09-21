"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Calendar22 } from "./date-picker"
import TextEditor from "./text-editor"
import ImagePicker from "./pilih-gambar"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import { editBerita } from "@/action/edit-berita"

const FormEditBerita = ({idProps, judulProps, dateProps, imgUrlProps, postProps}) => {


    const route = useRouter()
    const [post, setPost] = useState(postProps)
    const [imgFile, setImgFile] = useState(null)
    const [date, setDate] = useState(new Date(dateProps))
    const [judul, setJudul] = useState(judulProps)
    const [loading, setLoading] = useState(false)

    const onChange = (content) => {
        setPost(content)
    }

    const handlePublish = async () => {
        setLoading(true);
        if (!post || !judul || !date ) {
        toast.error("Mohon mengisi semua kolom sebelum publish")
        setLoading(false);
        return;
        }

        try {
        await editBerita(judul, imgFile, post, date, idProps)
        toast.success("Sukses")
        setLoading(false)
        route.push("/dashboard/berita")
        } catch (error) {
        console.log("Error saat edio berita")
        toast.error("Terjadi error. COba lagi!")
        }
        
    }


  return (
    <div className="bg-muted/50 min-h-[100vh] flex flex-col flex-1 rounded-xl md:min-h-min p-6">
      <div className='flex flex-row justify-between items-center'>
        <Link href={"/dashboard/berita"} className='flex max-w-sm flex-row gap-3 items-center hover:text-gray-300 group'>
          <ArrowLeft className='text-white group-hover:text-gray-300' />
          <span>Kembali</span>
        </Link>
        <div className='flex flex-row items-center justify-end gap-2'>
          <Button disabled={loading} onClick={handlePublish} className={"bg-amber-300 hover:bg-amber-400 hover:cursor-pointer"}>Publish</Button>
        </div>
      </div>

      <div className='w-full flex flex-row items-center gap-7 py-5'>
          <span className='text-lg text-white'>Judul</span>
          <div className="relative w-full">
              <Input
                  type="text"
                  placeholder="Judul Berita"
                  className="pr-10 text-white"
                  onChange={(e) => setJudul(e.target.value)}
                  value={judul}
              />
          </div>
          <span className='text-lg text-white'>Tanggal</span>
          <Calendar22 date={date} setDate={setDate} />
      </div>

      <div className="flex-1 flex flex-col">
        <TextEditor content={post} onChange={onChange} />

        <div className='flex justify-center w-full mt-3'>
          <ImagePicker onChange={setImgFile} urlImagePreview={imgUrlProps} />
        </div>
      </div>

    </div>
  )
}

export default FormEditBerita