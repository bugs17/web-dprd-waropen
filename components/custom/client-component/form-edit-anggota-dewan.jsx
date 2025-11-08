"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar23 } from "./date-picker-add-anggota"
import { useEffect, useId, useRef, useState, useTransition } from "react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Save, X } from "lucide-react"
import ImagePickerAnggotaDewan from "./pilih-gambar-anggota-dewan"
import PartaiDropdown from "./dropdown-list-partai"
import JabatanAnggotaDewanDropdown from "./dropdown-list-jabatan-anggota-dewan"
import BadanDropdown from "./dropdown-badan"
import toast from "react-hot-toast"
import { addAnggotaDewan } from "@/action/add-anggota-dewan"
import { useRouter } from "next/navigation"
import { getPartaiList } from "@/action/get-partai-list"
import { getBadanList } from "@/action/get-badan-list"
import { getAnggotaDewanById } from "@/action/get-instance-dewan"
import { editAnggotaDewan } from "@/action/edit-anggota-dewan"
import Link from "next/link"


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
    { id: 1, nama: "KETUA FRAKSI" },
    { id: 2, nama: "WAKIL KETUA FRAKSI" },
    { id: 3, nama: "ANGGOTA FRAKSI" },
    
];


const FormEditAnggotaDewan = ({idDewan}) => {



    // state
    const [partaiList, setPartaiList] = useState([])
    const [badanList, setBadanList] = useState([])
    const [instanceDewan, setInstanceDewan] = useState({})


    const [nama, setNama] = useState("")
    const [tmptLahir, setTmptLahir] = useState("")
    
    
    const [partaiID, setPartaiID] = useState(null)
    const [jabatanAnggota, setJabatanAnggota] = useState("")
    const [jabatanFraksi, setJabatanFraksi] = useState("")
    const [badanID, setBadanID] = useState(null)
    const [jabatanBadan, setJabatanBadan] = useState("")



    const [date, setDate] = useState(undefined)
    const [imgFile, setImgFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [isPending, startTransition] = useTransition()
    const uid = useId()
    const [jobs, setJobs] = useState([
        { id: `${uid}-1`, kerja: "", tahun: "" },
    ])
    const [pendidikans, setPendidikans] = useState([
        { id: `${uid}-2`, nama: "", tahun: "" },
    ])
    
    // ref untuk track id input (ini tidak di gunakan pada element jsx)
    const counterRef = useRef(0)
    const router = useRouter()


    useEffect(() => {
        const fetchData = async () => {
            const partai = await getPartaiList()
            const badan = await getBadanList()
            const dewan = await getAnggotaDewanById(idDewan)

            setPartaiList(partai)
            setBadanList(badan)
            setInstanceDewan(dewan)

            // langsung isi field form-nya
            setNama(dewan.nama || "")
            setTmptLahir(dewan.tempatLahir || "")
            setDate(dewan.tanggalLahir ? new Date(dewan.tanggalLahir) : undefined)
            setPartaiID(dewan.partaiId || null)
            setJabatanAnggota(dewan.peranDewan || "")
            setJabatanFraksi(dewan.jabatanFraksi || "")
            setBadanID(dewan.badanId || null)
            setJabatanBadan(dewan.peranBadan || "")
            setPreview(`/api/anggota-dewan/image/${dewan.imageUrl}` || null)

            // state yang menampung data riwayat pendidikan dari DB
            setPendidikans((dewan.riwayatPendidikan || []).map((p, index) => ({
                id: `${uid}-pendidikan-${index}`,
                nama: p.namaSekolah,
                tahun: p.tahunLulus
            })) 
            || [{ id: `${uid}-2`, nama: "", tahun: "" }])

            // state yang menampung data riwayat pekerjaan dari DB
            setJobs((dewan.riwayatPekerjaan || []).map((j, index) => ({
                id: `${uid}-pekerjaan-${index}`,
                kerja: j.jabatanPekerjaan,
                tahun: j.tahunMenjabat
            })) 
            || [{ id: `${uid}-1`, kerja: "", tahun: "" }])
        }

        fetchData()
    }, [idDewan])

    // function generate ID for input kerja
    const generateId = () => {
        counterRef.current += 1
    return `${uid}-${counterRef.current}`
}

    // function handle change on job input
    const handleChange = (id, field, value) => {
        setJobs((prev) =>
        prev.map((job) =>
            job.id === id ? { ...job, [field]: value } : job
        )
        )
    }
    
    // function handle change on job input
    const handleChangePendidikans = (id, field, value) => {
        setPendidikans((prev) =>
        prev.map((pendidikan) =>
            pendidikan.id === id ? { ...pendidikan, [field]: value } : pendidikan
        )
        )
    }

    // handle add new job input
    const handleAdd = () => {
        setJobs((prev) => [...prev, { id: generateId(), kerja: "", tahun: "" }])
    }

    // handle add new pendidikan input
    const handleAddPendidikan = () => {
        setPendidikans((prev) => [...prev, { id: generateId(), nama: "", tahun: "" }])
    }

    // handle delete input job
    const handleRemove = (id) => {
        setJobs((prev) => prev.filter((job) => job.id !== id))
    }
    
    // handle delete input pendidikan
    const handleRemovePendidikan = (id) => {
        setPendidikans((prev) => prev.filter((pendidikan) => pendidikan.id !== id))
    }


    // handle on select paratai from dropdown
    const handleSelectPartai = (partai) => {
        setPartaiID(partai.id)
    };

    // handle select jabatan anggota dewan from dropdown menu
    const handleSelectJabatanAnggotaDewan = (jabatan) => {
        setJabatanAnggota(jabatan.nama);
    };
    
    // handle on select jabatan fraksi
    const handleSelectJabatanFraksi = (jabatanFraksi) => {
        setJabatanFraksi(jabatanFraksi.nama)
    };
    
    // handle on select badan
    const handleSelectBadan = (badan) => {
        setBadanID(badan.id)
    };
    
    // handle on select jabatan badan
    const handleSelectJabatanBadan = (jabatanBadan) => {
        setJabatanBadan(jabatanBadan.nama)
    };


    // handle submit all input here
    const handleSubmit = async () => {
        if (
            !nama ||
            !tmptLahir ||
            !date ||
            !partaiID ||
            !jabatanAnggota ||
            !jabatanFraksi ||
            !badanID ||
            !jabatanBadan
        ) {
            toast.error(
            <span>
                Lengkapi semua form yang bertanda <span style={{ color: "red" }}>*</span>
            </span>
            );
            return;
        }

        // tampilkan toast loading manual
        const loadingToast = toast.loading("Saving...");

        try {
            const result = await editAnggotaDewan(
            nama,
            tmptLahir,
            new Date(date).toISOString(),
            pendidikans,
            jobs,
            partaiID,
            jabatanAnggota,
            jabatanFraksi,
            badanID,
            jabatanBadan,
            imgFile,
            idDewan
            );

            if (result === true) {
            toast.success("Perubahan berhasil disimpan!");
            setTimeout(() => router.push("/dashboard/anggota-dewan"), 800);
            } else {
            toast.error("Gagal mengubah data");
            }
        } catch (err) {
            toast.error(err.message || "Terjadi kesalahan");
        } finally {
            toast.dismiss(loadingToast);
        }
        };

    
    

    return (
        <div className="flex flex-col gap-6 mt-8">

            <span className="text-slate-500">Data diri</span>
            <Separator className={""} />
            
            {/* nama & tempat lahir */}
            <div className="flex gap-5">
                <div className="flex flex-col gap-3 w-full">
                    <Label htmlFor="tanggal-lahir">Nama <span className="text-red-500"> *</span></Label>
                    <Input value={nama} disabled={isPending} onChange={(e) => setNama(e.target.value)} id="nama" type="text" placeholder="Nama anggota dewan" />
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <Label htmlFor="tempat-lahir">Tempat Lahir <span className="text-red-500"> *</span></Label>
                    <Input value={tmptLahir} disabled={isPending} onChange={(e) => setTmptLahir(e.target.value)} id="tempat-lahir" type="text" placeholder="Tempat Lahir" />
                </div>
            </div>

            {/* tanggal-lahir */}
            <div className="flex pr-[20px]">
                <div className="flex flex-col gap-3 w-[50%]">
                    <Label htmlFor="tgl-lahir">Tanggal Lahir <span className="text-red-500"> *</span></Label>
                    <Calendar23 disabled={isPending} date={date} setDate={setDate} />
                </div>
            </div>

            <span className="text-slate-500 mt-3">Riwayat Pendidikan</span>
            <Separator className={""} />

            {/* riwayat pendidikan */}
            <div className="flex flex-col gap-5">
                {pendidikans.map((pendidikan, index) => (
                    <div key={pendidikan.id} className="flex gap-5 items-end">
                    <div className="flex flex-col gap-3 w-full">
                        <Label htmlFor={`kerja-${pendidikan.id}`}>Pendidikan {index + 1}</Label>
                        <Input
                        disabled={isPending}
                        id={`pendidikan-${pendidikan.id}`}
                        type="text"
                        placeholder="Pendidikan / Gelar"
                        value={pendidikan.nama}
                        onChange={(e) => handleChangePendidikans(pendidikan.id, "nama", e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-3 w-40">
                        <Label htmlFor={`tahun-${pendidikan.id}`}>Tahun</Label>
                        <Input
                        disabled={isPending}
                        id={`tahun-${pendidikan.id}`}
                        type="text"
                        placeholder="2001"
                        value={pendidikan.tahun}
                        onChange={(e) => handleChangePendidikans(pendidikan.id, "tahun", e.target.value)}
                        />
                    </div>

                    {pendidikans.length > 0 && (
                        <Button
                        disabled={isPending}
                        type="button"
                        variant="destructive"
                        onClick={() => handleRemovePendidikan(pendidikan.id)}
                        >
                        Hapus
                        </Button>
                    )}
                    </div>
                ))}
            </div>

            {/* tambah riwayat pendidikan */}
            <div className="w-full flex justify-end items-center">
                <Button disabled={isPending} className={""} type="button" onClick={handleAddPendidikan}>
                    Tambah Riwayat
                </Button>
            </div>


            <span className="text-slate-500 mt-3">Riwayat Pekerjaan</span>
            <Separator className={""} />

            {/* riwayat kerja */}
            <div className="flex flex-col gap-5">
                {jobs.map((job, index) => (
                    <div key={job.id} className="flex gap-5 items-end">
                    <div className="flex flex-col gap-3 w-full">
                        <Label htmlFor={`kerja-${job.id}`}>Kerja {index + 1}</Label>
                        <Input
                        disabled={isPending}
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
                        disabled={isPending}
                        id={`tahun-${job.id}`}
                        type="text"
                        placeholder="2001-2007"
                        value={job.tahun}
                        onChange={(e) => handleChange(job.id, "tahun", e.target.value)}
                        />
                    </div>

                    {jobs.length > 0 && (
                        <Button
                        disabled={isPending}
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
              
            {/* tambah riwayat kerja */}
            <div className="w-full flex justify-end items-center">
                <Button disabled={isPending} className={""} type="button" onClick={handleAdd}>
                    Tambah Riwayat
                </Button>
            </div>

            <span className="text-slate-500 mt-3">Partai & jabatan</span>
            <Separator className={""} />
            
            {/* partai & jabatan */}
            <div className="w-full flex flex-col gap-5">
                <div className="flex flex-col gap-3 w-full">
                    <Label>Partai <span className="text-red-500"> *</span></Label>
                    <PartaiDropdown value={partaiList.find((p) => p.id === partaiID) || null} disabled={isPending} options={partaiList} onSelect={handleSelectPartai} placeholder={"Pilih partai"} />
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <Label>Jabatan Anggota Dewan <span className="text-red-500"> *</span></Label>
                    <JabatanAnggotaDewanDropdown value={listJabatanAnggotaDewan.find((p) => p.nama === jabatanAnggota || null)} disabled={isPending} options={listJabatanAnggotaDewan} onSelect={handleSelectJabatanAnggotaDewan} placeholder={"pilih jabatan anggota dewan"} />
                </div>
            </div>

            <span className="text-slate-500 mt-3">Jabatan Fraksi</span>
            <Separator className={""} />

            <div className="w-full flex flex-col gap-5">
                <div className="flex flex-col gap-3 w-full">
                    <Label>Jabatan Dalam Fraksi <span className="text-red-500"> *</span></Label>
                    <BadanDropdown value={listJabatanFraksi.find((p) => p.nama === jabatanFraksi || null)} disabled={isPending} options={listJabatanFraksi} onSelect={handleSelectJabatanFraksi} placeholder={"Pilih jabatan fraksi"} />
                </div>
            </div>
            
            <span className="text-slate-500 mt-3">Badan</span>
            <Separator className={""} />

            <div className="w-full flex flex-col gap-5">
                <div className="flex flex-col gap-3 w-full">
                    <Label>Badan <span className="text-red-500"> *</span></Label>
                    <BadanDropdown value={badanList.find((p) => p.id === badanID || null)} disabled={isPending} options={badanList} onSelect={handleSelectBadan} placeholder={"Pilih badan"} />
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <Label>Jabatan Dalam Badan DPRK <span className="text-red-500"> *</span></Label>
                    <BadanDropdown value={listJabatanBadan.find((p) => p.nama === jabatanBadan)} disabled={isPending} options={listJabatanBadan} onSelect={handleSelectJabatanBadan} placeholder={"Pilih Jabatan"} />
                </div>
            </div>

            <span className="text-slate-500 mt-3">Foto Anggota Dewan</span>
            <Separator className={""} />

            <div className='flex justify-center w-full mt-3'>
              <ImagePickerAnggotaDewan onChange={setImgFile} preview={preview} setPreview={setPreview} isPending={isPending}  />
            </div>


            <Separator className={""} />

            <div className="w-full flex flex-row gap-5 justify-center items-center">
                <Button disabled={isPending} onClick={handleSubmit} className={"cursor-pointer text-black bg-amber-400 hover:bg-amber-500"}>
                    <Save className="" />
                    <span>{isPending ? 'Menyimpan...' : 'Simpan'}</span>
                </Button>
                <Link href={"/dashboard/anggota-dewan"}>
                    <Button disabled={isPending} className={"cursor-pointer text-black bg-neutral-300"}>
                        <X className="" />
                        <span>{"Batal"}</span>
                    </Button>
                </Link>
            </div>
            

        </div>
    )
}

export default FormEditAnggotaDewan