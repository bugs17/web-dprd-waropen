import HeaderPages from "@/components/custom/header-pages"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { prisma } from "@/lib/db"
import { formatTanggalIndo } from "@/lib/formatDate"
import { truncateText } from "@/lib/trunc-kalimat"
import { Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const ListBerita = async () => {


  const beritas = await prisma.berita.findMany()
  return (
    <>
        <HeaderPages title={"Berita"} />
        
        {/* search */}
        <div className="w-full mb-3 flex justify-center">
          <div className="relative w-full max-w-sm">
              <Input
                  type="text"
                  placeholder="Cari berita..."
                  className="pr-10 text-white"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-white h-5 w-5 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-wrap w-full px-4 pb-6">
          {beritas.map((berita, index) => (
            <Link
              key={index}
              href={`/berita/${berita.slug}`}
              className="w-full lg:w-1/3 h-60 p-4 overflow-hidden group"
            >
              <div className="relative w-full h-full overflow-hidden rounded-lg">
                <Image
                  src={`/api/berita/image/${berita.imageUrl}`}
                  alt={berita.judul}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div>
                      <Tooltip>
                        <TooltipTrigger>
                          <h3 className="text-white text-lg font-semibold">
                            {truncateText(berita.judul, 45)}
                          </h3>
                          <TooltipContent>
                            {berita.judul}
                          </TooltipContent>
                        </TooltipTrigger>
                      </Tooltip>
                    </div>
                  <span className="text-white text-xs font-mono">
                    {formatTanggalIndo(berita.createdAt)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
    </>
  )
}

export default ListBerita