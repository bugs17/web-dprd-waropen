
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Newspaper, Search } from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/db"
import NewsList from "@/components/custom/client-component/card-list-berita"

export const revalidate = 0;


export const generateMetadata = () => {
  return {
    title: 'Berita | DPRK WAROPEN',
  };
};

const Beritas = async () => {

    const beritas = await prisma.berita.findMany({
        orderBy:{
            id:"desc"
        }
    })

    return (
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-6" >
            <div className={`w-full flex ${beritas.length > 0 ? "justify-between" : "justify-end"} justify-between`}>
                {beritas.length > 0 && (<div className="relative hidden w-full max-w-sm mb-5">
                    <Input
                        type="text"
                        placeholder="Cari berita..."
                        className="pr-10 text-white"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-white h-5 w-5 pointer-events-none" />
                </div>)}

                <Link href={"/dashboard/berita/create"}>
                    <Button className={"cursor-pointer"}>
                        <Newspaper className="text-black" />
                        <span>Baru</span>
                    </Button>
                </Link>
            </div>

            <NewsList news={beritas}  />
        </div>
    )
}

export default Beritas