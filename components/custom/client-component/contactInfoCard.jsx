"use client"
import { useState, useEffect, useTransition } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader, Edit, Ban, ThumbsUp } from "lucide-react"
import toast from "react-hot-toast"
import { saveContactInfo } from "@/action/add-kontak-alamat"
import { getContactInfo } from "@/action/get-info-kontak"

// import action kamu di sini
// import { saveContactInfo, getContactInfo } from "@/action/contact"

const ContactInfoCard = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [contact, setContact] = useState(null)
    const [isPending, startTransition] = useTransition()

    // form state
    const [email, setEmail] = useState("")
    const [telp, setTelp] = useState("")
    const [alamat, setAlamat] = useState("")
    const [instagram, setInstagram] = useState("")
    const [facebook, setFacebook] = useState("")
    const [twitter, setTwitter] = useState("")
    const [youtube, setYoutube] = useState("")

    // ambil data dari backend
    useEffect(() => {
        const fetchData = async () => {
        const data = await getContactInfo()
        if (data) {
            setContact(data)
            setEmail(data.email)
            setTelp(data.telp)
            setAlamat(data.alamat)
            setInstagram(data.instagram)
            setFacebook(data.facebook)
            setTwitter(data.twitter)
            setYoutube(data.youtube)
        }
        }
        fetchData()
    }, [])

    const handleSave = async () => {
        if (!email.trim() || !telp.trim() || !alamat.trim()) {
            toast('Email, Telepon, dan Alamat wajib diisi.',
                    {
                        icon: <Ban className="text-red-500" />,
                        style: {
                            borderRadius: "12px",
                            background: "linear-gradient(135deg, #1a1a1a, #2a2a2a)",
                            color: "#f5f5f5",
                            border: "1px solid #3a3a3a",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                            padding: "14px 18px",
                            fontSize: "14px",
                            fontWeight: 500,
                            },
                        duration: 3500,
                    }
                );
            return;
        }

        startTransition(async () => {
            const newData = { email, telp, alamat, instagram, facebook, twitter, youtube }
            await saveContactInfo(newData)
            toast('Data berhasil ditambahkan',
                    {
                        icon: <ThumbsUp className="text-green-500" />,
                        style: {
                            borderRadius: "12px",
                            background: "linear-gradient(135deg, #1a1a1a, #2a2a2a)",
                            color: "#f5f5f5",
                            border: "1px solid #3a3a3a",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                            padding: "14px 18px",
                            fontSize: "14px",
                            fontWeight: 500,
                            },
                        duration: 3500,
                    }
                );
            setContact(newData)
            setIsEditing(false)
        })
    }

    if (isEditing || !contact) {
        // Form Input / Edit
        return (
            <Card className="max-w-2xl mx-auto p-6">
                <CardHeader>
                <CardTitle>{contact ? "Edit Kontak" : "Tambah Kontak"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="flex gap-2 flex-col">
                    <Label>Email</Label>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} disabled={isPending} />
                </div>
                <div className="flex gap-2 flex-col">
                    <Label>Telepon</Label>
                    <Input value={telp} onChange={(e) => setTelp(e.target.value)} disabled={isPending} />
                </div>
                <div className="flex gap-2 flex-col">
                    <Label>Alamat</Label>
                    <Input value={alamat} onChange={(e) => setAlamat(e.target.value)} disabled={isPending} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="flex gap-2 flex-col">
                        <Label>Instagram</Label>
                        <Input value={instagram} onChange={(e) => setInstagram(e.target.value)} disabled={isPending} placeholder="https://instagram.com/..." />
                    </div>
                    <div className="flex gap-2 flex-col">
                        <Label>Facebook</Label>
                        <Input value={facebook} onChange={(e) => setFacebook(e.target.value)} disabled={isPending} placeholder="https://facebook.com/..." />
                    </div>
                    <div className="flex gap-2 flex-col">
                        <Label>Twitter / X</Label>
                        <Input value={twitter} onChange={(e) => setTwitter(e.target.value)} disabled={isPending} placeholder="https://twitter.com/..." />
                    </div>
                    <div className="flex gap-2 flex-col">
                        <Label>YouTube</Label>
                        <Input value={youtube} onChange={(e) => setYoutube(e.target.value)} disabled={isPending} placeholder="https://youtube.com/..." />
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <Button className={"cursor-pointer"} variant="outline" onClick={() => setIsEditing(false)} disabled={isPending}>
                    Batal
                    </Button>
                    <Button onClick={handleSave} className="bg-amber-400 cursor-pointer hover:bg-amber-500" disabled={isPending}>
                    {isPending ? <Loader className="w-4 h-4 animate-spin" /> : "Simpan"}
                    </Button>
                </div>
                </CardContent>
            </Card>
        )
    }

    // Tampilan data
    return (
        <Card className="max-w-2xl mx-auto p-6">
            <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>Informasi Kontak</CardTitle>
                <Button className={"cursor-pointer"} variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit className="w-4 h-4 mr-1" /> Edit
                </Button>
            </CardHeader>
            <CardContent className="space-y-3">
                <div><b>Email:</b> {contact.email}</div>
                <div><b>Telepon:</b> {contact.telp}</div>
                <div><b>Alamat:</b> {contact.alamat}</div>

                <div className="mt-4">
                <b>Media Sosial:</b>
                <ul className="list-disc list-inside text-blue-500">
                    {contact.instagram && <li><a href={contact.instagram} target="_blank">Instagram</a></li>}
                    {contact.facebook && <li><a href={contact.facebook} target="_blank">Facebook</a></li>}
                    {contact.twitter && <li><a href={contact.twitter} target="_blank">Twitter</a></li>}
                    {contact.youtube && <li><a href={contact.youtube} target="_blank">YouTube</a></li>}
                </ul>
                </div>
            </CardContent>
        </Card>
    )
}

export default ContactInfoCard
