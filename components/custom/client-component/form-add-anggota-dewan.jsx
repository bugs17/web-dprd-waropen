"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar23 } from "./date-picker-add-anggota"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

const FormAddAnggotaDewan = () => {
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
                <div className="flex flex-col gap-3 w-full">
                    <Label htmlFor="smp">SMP</Label>
                    <Input id="smp" type="text" placeholder="Sekolah menengah pertama" />
                </div>
            </div>
            <div className="flex gap-5">
                <div className="flex flex-col gap-3 w-full">
                    <Label htmlFor="sma">SMA/SMK Sederajat</Label>
                    <Input id="sma" type="text" placeholder="Sekolah Menengah Atas Sederajat" />
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <Label htmlFor="s1">Strata-1</Label>
                    <Input id="s1" type="text" placeholder="Strata 1" />
                </div>
            </div>
            <div className="flex gap-5">
                <div className="flex flex-col gap-3 w-full">
                    <Label htmlFor="s2">Strata-2</Label>
                    <Input id="s2" type="text" placeholder="Strata-2" />
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <Label htmlFor="s3">Strata-3</Label>
                    <Input id="s3" type="text" placeholder="Strata-3" />
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

        </div>
    )
}

export default FormAddAnggotaDewan