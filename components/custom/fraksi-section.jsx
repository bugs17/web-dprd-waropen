import Image from "next/image"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const TabelAnggotaFraksi = () => {
    return (
        <Table className="border border-white">
            <TableCaption>LIST ANGGOTA FRAKSI DEMOKRASI INDONESIA PERJUANGAN</TableCaption>

            <TableHeader>
                <TableRow className={"bg-gray-600 hover:bg-gray-600"}>
                    <TableHead className="w-[100px] text-center text-white">Nama</TableHead>
                    <TableHead className="w-[100px] text-center text-white">Partai</TableHead>
                    <TableHead className="w-[100px] text-center text-white">Jabatan</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                <TableRow className={""}>
                    <TableCell className="font-medium w-[100px] text-center text-white">Yohanis J Tabibiati</TableCell>
                    <TableCell className="font-medium w-[100px] text-center text-white">Partai Demokrasi Indonesia Perjaungan</TableCell>
                    <TableCell className="font-medium w-[100px] text-center text-white">Ketua</TableCell>
                </TableRow>
                <TableRow className={""}>
                    <TableCell className="font-medium w-[100px] text-center text-white">Yohanis J Tabibiati</TableCell>
                    <TableCell className="font-medium w-[100px] text-center text-white">Partai Demokrasi Indonesia Perjaungan</TableCell>
                    <TableCell className="font-medium w-[100px] text-center text-white">Ketua</TableCell>
                </TableRow>
                <TableRow className={""}>
                    <TableCell className="font-medium w-[100px] text-center text-white">Yohanis J Tabibiati</TableCell>
                    <TableCell className="font-medium w-[100px] text-center text-white">Partai Demokrasi Indonesia Perjaungan</TableCell>
                    <TableCell className="font-medium w-[100px] text-center text-white">Ketua</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

const ListImagePartay = () => {
    return (
        <div className="flex flex-row gap-4 w-full h-auto justify-center lg:mb-5">
            <div className="w-40 h-40">
                    <Image alt="logo partai" className="object-contain h-full w-full" height={300} width={300} src={"/pdip.png"}  />
            </div>
            <div className="w-40 h-40">
                <Image alt="logo partai" className="object-contain h-full w-full" height={300} width={300} src={"/demokrat.gif"}  />
            </div>
            <div className="w-40 h-40">
                <Image alt="logo partai" className="object-contain h-full w-full" height={300} width={300} src={"/ppp.png"}  />
            </div>
        </div>
    )
}

const FraksiSection = () => {
  return (
    <div className="w-full h-full lg:px-8 px-5">

        <p className="text-white lg:text-center text-balance lg:mb-10">
          Fraksi-fraksi di DPRK Waropen Masa Jabatan 2024-2029 berjumlah 3 (Tiga) fraksi yaitu: Fraksi DEMOKRASI INDONESIA PERJUANGAN, Fraksi AMANAT NASIONAL, Fraksi GOLONGAN KARYA.
        </p>

        <h1 className="text-amber-300 text-4xl font-extrabold text-center lg:mb-4">FRAKSI DEMOKRASI INDONESIA PERJUANGAN </h1>
        <ListImagePartay />
        <TabelAnggotaFraksi />
    </div>
  )
}

export default FraksiSection