import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { prisma } from "@/lib/db";


function PartaiItem({urlImage, namaPartai}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="transition-transform duration-300 hover:scale-105 hover:cursor-pointer">
            <img
              src={`/api/partai/image/${urlImage}`}
              alt={namaPartai}
              className="w-40 h-40 object-cover rounded-xl border border-neutral-300 shadow-2xl"
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-medium">{namaPartai}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

const FraksiList = async () => {

    const listFraksi = await prisma.fraksi.findMany({
        include:{
            partai:true
        }
    })


    return (
        <div className="bg-[#0a0a0a] min-h-[100vh] flex-1 rounded-xl md:min-h-min p-6">
            <div className="w-full flex justify-between">
                <h4>Fraksi-fraksi DPRK</h4>
            </div>

        {
            listFraksi.length > 0 && (
                listFraksi.map((fraksi, index) => (
                    <div key={index} className="bg-muted/50 rounded-xl min-h-36 flex flex-col overflow-hidden mt-5">
                            <div className="flex flex-row w-full bg-neutral-500 justify-center">
                                <h3 className="text-white text-center font-bold">{fraksi.nama}</h3>
                            </div>
                        <div className="w-full flex flex-wrap justify-center gap-5 p-5">
                            {fraksi.partai.length > 0 && (
                                fraksi.partai.map((partai, index) => (
                                    <PartaiItem key={index} urlImage={partai.imageUrl} namaPartai={partai.nama} />
                                ))
                            )}
                        </div>


                        <Table>
                            <TableHeader>
                                <TableRow className="">
                                    <TableHead className="text-center">Nama Anggota</TableHead>
                                    <TableHead className="text-left">Jabatan</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="text-center">
                                    <span>---</span>
                                    </TableCell>
                                    <TableCell className="text-left">
                                    <span>---</span>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                    </div>
                ))
            )
        }


        </div>
    )
}

export default FraksiList