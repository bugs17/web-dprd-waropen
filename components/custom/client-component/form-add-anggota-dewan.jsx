"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar23 } from "./date-picker-add-anggota"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


function PartaiDropdown({ options = [], onSelect, placeholder = "Pilih partai" }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (partai) => {
    setSelected(partai);
    if (onSelect) onSelect(partai);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-full px-3 py-2 border rounded-md bg-white text-left flex items-center justify-between">
          {selected ? (
            <div className="flex items-center gap-2">
              <img
                src={`/api/partai/image/${selected.imageUrl}`}
                alt={selected.nama}
                className="w-6 h-6 object-cover rounded-full"
              />
              <span>{selected.nama}</span>
            </div>
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-gray-500 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[240px]">
        {options.map((partai) => (
          <DropdownMenuItem
            key={partai.id}
            onSelect={() => handleSelect(partai)}
            className="flex items-center gap-3 px-3 py-2 hover:bg-accent/50 cursor-pointer"
          >
            <img
              src={`/api/partai/image/${partai.imageUrl}`}
              alt={partai.nama}
              className="w-6 h-6 object-cover rounded-full"
            />
            <span>{partai.nama}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const FormAddAnggotaDewan = ({partaiList}) => {
    const [date, setDate] = useState(undefined)

    const [jobs, setJobs] = useState([
        { id: Date.now(), kerja: "", tahun: "" },
    ])

    const handleChange = (id, field, value) => {
        setJobs((prev) =>
        prev.map((job) =>
            job.id === id ? { ...job, [field]: value } : job
        )
        )
    }

    const handleAdd = () => {
        setJobs((prev) => [...prev, { id: Date.now(), kerja: "", tahun: "" }])
    }

    const handleRemove = (id) => {
        setJobs((prev) => prev.filter((job) => job.id !== id))
    }

    const handleSubmit = () => {
        console.log("Riwayat kerja:", jobs)
    }

    const handleSelect = (partai) => {
    console.log("Partai terpilih:", partai);
  };

    return (
        <div className="flex flex-col gap-6 mt-8">

            <span className="text-slate-500">Data diri</span>
            <Separator className={""} />

            <div className="flex gap-5">
                <div className="flex flex-col gap-3 w-full">
                    <Label htmlFor="tanggal-lahir">Nama</Label>
                    <Input id="nama" type="text" placeholder="Nama anggota dewan" />
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <Label htmlFor="tempat-lahir">Tempat Lahir</Label>
                    <Input id="tempat-lahir" type="text" placeholder="Tempat Lahir" />
                </div>
            </div>

            <div className="flex pr-[20px]">
                <div className="flex flex-col gap-3 w-[50%]">
                    <Label htmlFor="tgl-lahir">Tanggal Lahir</Label>
                    <Calendar23 date={date} setDate={setDate} />
                </div>
                {/* <div className="flex flex-col gap-3 w-full">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="text" placeholder="Email" />
                </div> */}
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

            <span className="text-slate-500 mt-3">Partai</span>
            <Separator className={""} />

            <div className="w-full flex">
                <PartaiDropdown options={partaiList} onSelect={handleSelect} />
            </div>

        </div>
    )
}

export default FormAddAnggotaDewan