"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar23 } from "./date-picker-add-anggota"
import { useRef, useState, useTransition } from "react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import ImagePickerAnggotaDewan from "./pilih-gambar-anggota-dewan"
import PartaiDropdown from "./dropdown-list-partai"
import JabatanAnggotaDewanDropdown from "./dropdown-list-jabatan-anggota-dewan"
import BadanDropdown from "./dropdown-badan"


// constant list jabatan
const listJabatanAnggotaDewan = [
    { id: 1, nama: "KETUA DPRK" },
    { id: 2, nama: "WAKIL KETUA I" },
    { id: 3, nama: "WAKIL KETUA II" },
    { id: 4, nama: "WAKIL KETUA III" },
    { id: 5, nama: "KETUA KOMISI A" },
    { id: 6, nama: "WAKIL KETUA KOMISI A" },
    { id: 7, nama: "ANGGOTA KOMISI A" },
    { id: 8, nama: "KETUA KOMISI B" },
    { id: 9, nama: "WAKIL KETUA KOMISI B" },
    { id: 10, nama: "ANGGOTA KOMISI B" },
    { id: 11, nama: "KETUA KOMISI C" },
    { id: 12, nama: "WAKIL KETUA KOMISI C" },
    { id: 13, nama: "ANGGOTA KOMISI C" },
];

// constant list jabatan in Badan
const listJabatanBadan = [
    { id: 1, nama: "KETUA" },
    { id: 2, nama: "WAKIL" },
    { id: 3, nama: "ANGGOTA" },
    
];

// constant list jabatan in Fraksi
const listJabatanFraksi = [
    { id: 1, nama: "KETUA" },
    { id: 2, nama: "WAKIL" },
    { id: 3, nama: "ANGGOTA" },
    
];


const FormAddAnggotaDewan = ({partaiList, badanList}) => {


    // state
    const [nama, setNama] = useState("")
    const [tmptLahir, setTmptLahir] = useState("")
    const [date, setDate] = useState(undefined)
    const [imgFile, setImgFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [isPending, startTransition] = useTransition()
    const [jobs, setJobs] = useState([
        { id: Date.now(), kerja: "", tahun: "" },
    ])
    
    // ref
    const counterRef = useRef(0)

    // function generate ID for input kerja
    const generateId = () => {
        counterRef.current += 1
        return counterRef.current
    }

    // function handle change on job input
    const handleChange = (id, field, value) => {
        setJobs((prev) =>
        prev.map((job) =>
            job.id === id ? { ...job, [field]: value } : job
        )
        )
    }

    // handle add new job input
    const handleAdd = () => {
        setJobs((prev) => [...prev, { id: generateId(), kerja: "", tahun: "" }])
    }

    // handle delete input job
    const handleRemove = (id) => {
        setJobs((prev) => prev.filter((job) => job.id !== id))
    }

    // handle submit all input here
    const handleSubmit = () => {
        console.log("Riwayat kerja:", jobs)
    }

    // handle on select paratai from dropdown
    const handleSelectPartai = (partai) => {
        console.log("Partai terpilih:", partai);
    };
    
    // handle select jabatan anggota dewan from dropdown menu
    const handleSelectJabatanAnggotaDewan = (jabatan) => {
        console.log("jabatan terpilih:", jabatan);
    };

    return (
        <div className="flex flex-col gap-6 mt-8">

            <span className="text-slate-500">Data diri</span>
            <Separator className={""} />

            <div className="flex gap-5">
                <div className="flex flex-col gap-3 w-full">
                    <Label htmlFor="tanggal-lahir">Nama</Label>
                    <Input onChange={(e) => setNama(e.target.value)} id="nama" type="text" placeholder="Nama anggota dewan" />
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <Label htmlFor="tempat-lahir">Tempat Lahir</Label>
                    <Input onChange={(e) => setTmptLahir(e.target.value)} id="tempat-lahir" type="text" placeholder="Tempat Lahir" />
                </div>
            </div>

            <div className="flex pr-[20px]">
                <div className="flex flex-col gap-3 w-[50%]">
                    <Label htmlFor="tgl-lahir">Tanggal Lahir</Label>
                    <Calendar23 date={date} setDate={setDate} />
                </div>
            </div>

            <span className="text-slate-500 mt-3">Riwayat Pendidikan</span>
            <Separator className={""} />

            <div className="flex gap-5">
                <div className="flex flex-col gap-3 w-full">
                    <Label htmlFor="sd">SD</Label>
                    <Input id="sd" type="text" placeholder="Sekolah Dasar" />
                </div>
                <div className="flex flex-col gap-3 w-40">
                    <Label htmlFor="smp">Tahun Lulus</Label>
                    <Input
                        type="number"
                        placeholder="2020"
                        />
                </div>
            </div>
            
            <div className="flex gap-5">
                <div className="flex flex-col gap-3 w-full">
                    <Label htmlFor="SMP">SMP Sederajat</Label>
                    <Input id="SMP" type="text" placeholder="Sekolah Dasar" />
                </div>
                <div className="flex flex-col gap-3 w-40">
                    <Label htmlFor="smp">Tahun Lulus</Label>
                    <Input
                        type="number"
                        placeholder="2020"
                        />
                </div>
            </div>

            <div className="flex gap-5">
                <div className="flex flex-col gap-3 w-full">
                    <Label htmlFor="SMA">SMA/SMK Sederajat</Label>
                    <Input id="SMA" type="text" placeholder="Sekolah Dasar" />
                </div>
                <div className="flex flex-col gap-3 w-40">
                    <Label htmlFor="smp">Tahun Lulus</Label>
                    <Input
                        type="number"
                        placeholder="2020"
                        />
                </div>
            </div>

            <div className="flex gap-5">
                <div className="flex flex-col gap-3 w-full">
                    <Label htmlFor="Strata-1">Strata-1</Label>
                    <Input id="Strata-1" type="text" placeholder="Sekolah Dasar" />
                </div>
                <div className="flex flex-col gap-3 w-40">
                    <Label htmlFor="smp">Tahun Lulus</Label>
                    <Input
                        type="number"
                        placeholder="2020"
                        />
                </div>
            </div>

            <div className="flex gap-5">
                <div className="flex flex-col gap-3 w-full">
                    <Label htmlFor="Strata-2">Strata-2</Label>
                    <Input id="Strata-2" type="text" placeholder="Sekolah Dasar" />
                </div>
                <div className="flex flex-col gap-3 w-40">
                    <Label htmlFor="smp">Tahun Lulus</Label>
                    <Input
                        type="number"
                        placeholder="2020"
                        />
                </div>
            </div>

            <div className="flex gap-5">
                <div className="flex flex-col gap-3 w-full">
                    <Label htmlFor="Strata-3">Strata-3</Label>
                    <Input id="Strata-3" type="text" placeholder="Sekolah Dasar" />
                </div>
                <div className="flex flex-col gap-3 w-40">
                    <Label htmlFor="smp">Tahun Lulus</Label>
                    <Input
                        type="number"
                        placeholder="2020"
                        />
                </div>
            </div>


            <span className="text-slate-500 mt-3">Riwayat Pekerjaan</span>
            <Separator className={""} />

            <div className="flex flex-col gap-5">
                {jobs.map((job, index) => (
                    <div key={job.id} className="flex gap-5 items-end">
                    <div className="flex flex-col gap-3 w-full">
                        <Label htmlFor={`kerja-${job.id}`}>Kerja {index + 1}</Label>
                        <Input
                        id={`kerja-${job.id}`}
                        type="text"
                        placeholder="Karir kerja"
                        value={job.kerja}
                        onChange={(e) => handleChange(job.id, "kerja", e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-3 w-40">
                        <Label htmlFor={`tahun-${job.id}`}>Tahun</Label>
                        <Input
                        id={`tahun-${job.id}`}
                        type="number"
                        placeholder="2020"
                        value={job.tahun}
                        onChange={(e) => handleChange(job.id, "tahun", e.target.value)}
                        />
                    </div>

                    {jobs.length > 1 && (
                        <Button
                        type="button"
                        variant="destructive"
                        onClick={() => handleRemove(job.id)}
                        >
                        Hapus
                        </Button>
                    )}
                    </div>
                ))}
            </div>

            <div className="w-full flex justify-end items-center">
                <Button className={""} type="button" onClick={handleAdd}>
                    Tambah Riwayat
                </Button>
            </div>

            <span className="text-slate-500 mt-3">Partai & jabatan</span>
            <Separator className={""} />

            <div className="w-full flex flex-col gap-5">
                <div className="flex flex-col gap-3 w-full">
                    <Label>Partai</Label>
                    <PartaiDropdown options={partaiList} onSelect={handleSelectPartai} placeholder={"Pilih partai"} />
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <Label>Jabatan Anggota Dewan</Label>
                    <JabatanAnggotaDewanDropdown options={listJabatanAnggotaDewan} onSelect={handleSelectJabatanAnggotaDewan} placeholder={"pilih jabatan anggota dewan"} />
                </div>
            </div>

            <span className="text-slate-500 mt-3">Jabatan Fraksi</span>
            <Separator className={""} />

            <div className="w-full flex flex-col gap-5">
                <div className="flex flex-col gap-3 w-full">
                    <Label>Jabatan Dalam Fraksi</Label>
                    <BadanDropdown options={listJabatanFraksi} onSelect={handleSelectPartai} placeholder={"Pilih jabatan fraksi"} />
                </div>
            </div>
            
            <span className="text-slate-500 mt-3">Badan</span>
            <Separator className={""} />

            <div className="w-full flex flex-col gap-5">
                <div className="flex flex-col gap-3 w-full">
                    <Label>Badan</Label>
                    <BadanDropdown options={badanList} onSelect={handleSelectPartai} placeholder={"Pilih badan"} />
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <Label>Jabatan Dalam Badan DPRK</Label>
                    <BadanDropdown options={listJabatanBadan} onSelect={handleSelectPartai} placeholder={"Pilih badan"} />
                </div>
            </div>

            <span className="text-slate-500 mt-3">Foto Anggota Dewan</span>
            <Separator className={""} />

            <div className='flex justify-center w-full mt-3'>
              <ImagePickerAnggotaDewan onChange={setImgFile} preview={preview} setPreview={setPreview} isPending={isPending}  />
            </div>


            <Separator className={""} />

            <div className="w-full flex flex-col items-center">
                <Button className={"cursor-pointer text-black bg-amber-400 hover:bg-amber-500"}>
                    <Save className="" />
                    <span>Simpan</span>
                </Button>
            </div>
            

        </div>
    )
}

export default FormAddAnggotaDewan