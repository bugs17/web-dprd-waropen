
import {
Table,
TableBody,
TableCell,
TableHead,
TableHeader,
TableRow,
} from "@/components/ui/table";

import ButtonOpenDialogAddKartuUcapan from "@/components/custom/client-component/button-open-dialog-add-kartu-ucapan";
import DialogAddKartuUcapan from "@/components/custom/client-component/dialog-add-kartu-ucapan";
import DialogDeleteKartuUcapan from "@/components/custom/client-component/dialog-delete-kartu-ucapan";
import ButtonToggleKartuUcapan from "@/components/custom/client-component/button-toggle-kartu-ucapan";
import { prisma } from "@/lib/db";

export const revalidate = 0;

export const generateMetadata = () => {
return {
title: "Kartu Ucapan | DPRK WAROPEN",
};
};

const page = async () => {
let kartuUcapanList = [];

try {
kartuUcapanList = await prisma.kartuUcapan.findMany({
    orderBy: {
        id: "desc",
    },
});
} catch (error) {
    console.error("Gagal mengambil data kartu ucapan:", error);
}

return (
<div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-6">
<div className="w-full flex justify-between items-center">
<h4>Kartu Ucapan</h4>

    <DialogAddKartuUcapan>
      <ButtonOpenDialogAddKartuUcapan />
    </DialogAddKartuUcapan>
  </div>

  <div className="overflow-x-auto mt-10">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[180px]">Gambar</TableHead>
          <TableHead>Deskripsi</TableHead>
          <TableHead className="text-center w-[120px]">
            Status
          </TableHead>
          <TableHead className="text-right w-[220px]">
            Aksi
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {kartuUcapanList.length > 0 ? (
          kartuUcapanList.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <img
                  src={`/api/kartu-ucapan/image/${item.urlImage}`}
                  alt={item.description}
                  className="w-36 h-20 object-contain rounded-md border bg-[#231c26]"
                />
              </TableCell>

              <TableCell className="font-medium">
                {item.description}
              </TableCell>

              <TableCell className="text-center">
                {item.isShow ? (
                  <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    Tampil
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                    Disembunyikan
                  </span>
                )}
              </TableCell>

              <TableCell className="text-right space-x-2">
                <ButtonToggleKartuUcapan
                  idKartuUcapan={item.id}
                  isShow={item.isShow}
                />

                <DialogDeleteKartuUcapan
                  idKartuUcapan={item.id}
                  description={item.description}
                />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={4}
              className="text-center py-10 text-muted-foreground"
            >
              Belum ada kartu ucapan.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>
</div>

);
};

export default page;