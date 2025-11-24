"use server";

import { prisma } from "@/lib/db";
import path from "path";
import { writeFile } from "fs/promises";
import { console } from "inspector";
import { revalidatePath } from "next/cache";




export const editAnggotaDewan = async (nama, tmptLahir, tglLahir, riwayatPendidikan, riwayatPekerjaan, partaiID, jabatanDewan, jabatanFraksi, fotoProfil, idAnggotaDewan) => {
    try {

        const dataAnggotaDewan = {
            nama: nama,
            tempatLahir: tmptLahir,
            tanggalLahir: tglLahir,
            peranDewan: jabatanDewan,
            peranKomisi: jabatanDewan,
            jabatanFraksi: jabatanFraksi,
            partaiId: parseInt(partaiID) ,
        }

        const anggotaDewan = await prisma.anggotaDewan.findFirst({
            where:{
                id:parseInt(idAnggotaDewan)
            }
        })

        if (!anggotaDewan) throw new Error("Anggota dewan tidak ditemukan");


        if (fotoProfil !== null) {
            // ####### proses handle foto profil anggota dewan ##########
            // Pastikan parameter file diterima
            if (!fotoProfil || typeof fotoProfil !== "object") {
                throw new Error("File gambar tidak valid");
            }
    
    
            // Modifikasi nama file: hilangkan spasi dan tambahkan timestamp
            const timestamp = Date.now();
            const originalName = fotoProfil.name.replace(/\s+/g, ""); // Hapus semua spasi
            const extension = path.extname(originalName); // Ekstensi file (.jpg, .png, dll)
            const fileName = `${path.basename(originalName, extension)}-${timestamp}${extension}`;
    
            // Tentukan lokasi penyimpanan file
            const filePath = path.join(process.cwd(), "/uploads/profile-dewan", fileName);
            
            // Simpan file ke server
            const namaFileDiDb = `${fileName}`
            await writeFile(filePath, Buffer.from(await fotoProfil.arrayBuffer()));
            // ###########################################################

            dataAnggotaDewan.imageUrl = namaFileDiDb
            
        }


        await prisma.riwayatPendidikan.deleteMany({
            where:{
                anggotaDewanId:parseInt(anggotaDewan.id)
            }
        })

        await prisma.riwayatPekerjaan.deleteMany({
            where:{
                anggotaDewanId:parseInt(anggotaDewan.id)
            }
        })




        // mapping data riwayat pendidikan
        const dataRiwayatPendidikanMapped = riwayatPendidikan
            .filter(item => item.nama.trim() !== "" && item.tahun)
            .map(item => ({
                namaSekolah: item.nama,
                tahunLulus: item.tahun
            }))

        // mapping data riwayat pekerjaan
        const dataRiwayatPekerjaanMapped = riwayatPekerjaan
            .filter(item => item.kerja.trim() !== "" && item.tahun.trim() !== "")
            .map(item => ({
                jabatanPekerjaan: item.kerja,
                tahunMenjabat: item.tahun
            }))



        await prisma.anggotaDewan.update({
            where:{
                id:parseInt(anggotaDewan.id)
            },
            data: {
                ...dataAnggotaDewan,
                riwayatPendidikan:
                    dataRiwayatPendidikanMapped.length > 0
                    ? {createMany : {data : dataRiwayatPendidikanMapped }}
                    : undefined,
                riwayatPekerjaan:
                    dataRiwayatPekerjaanMapped.length > 0
                    ? {createMany : {data : dataRiwayatPekerjaanMapped}}
                    : undefined
            }
        })

        revalidatePath('/dashboard/anggota-dewan')
        return true


    } catch (error) {
        console.error("Error detail:", error);
        return false
    }
}