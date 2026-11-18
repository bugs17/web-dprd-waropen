
"use client"
import { Facebook, Headset, Instagram, Mail, MapPin, Pin, Twitter } from "lucide-react";
import { animate, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getKontak } from "@/action/get-kontak";
import Link from "next/link";


const KontakOnNavbar = () => {
  const [kontaks, setKontak] =  useState(null)

  useEffect(() => {
    const getData = async () => {
      const data = await getKontak()
      setKontak(data)
    }
    getData()
  },[])

  return (
    <motion.div
    initial={{opacity:0, y:-50}}
    animate={{opacity:1, y:0}}
    transition={{
        type:'spring',
        stiffness:100,
        damping:25,
        delay:0.3,
        duration:1.2
    }}
    className="py-1.5 px-1.5 rounded-bl-lg bg-app-navstrip border border-app-line flex flex-row gap-4">
        <Link href={kontaks?.facebook || "#"} target='_blank'>
          <Facebook size={20} className="text-app-gold cursor-pointer" />
        </Link>
        <Link href={kontaks?.instagram  || "#"}>
          <Instagram size={20} className="text-app-gold cursor-pointer" />
        </Link>
        <Link href={kontaks?.twitter  || "#"}>
          <Twitter size={20} className="text-app-gold cursor-pointer" />
        </Link>
        <Link href={`mailto:${kontaks?.email  || "#"}`}>
          <Mail size={20} className="text-app-gold cursor-pointer" />
        </Link>
        <div className="ml-3 border-l-[1px] border-r-[1px] border-app-line flex items-center pl-3 pr-3">
            <MapPin size={18} className="text-app-ink mr-3" />
            <p className="text-xs text-app-ink italic">{kontaks?.alamat || "-"}</p>
        </div>
        <div className="flex items-center pl-3 pr-3">
            <Headset size={18} className="text-app-ink mr-3" />
            <p className="text-xs text-app-ink italic">{kontaks?.telp || "-"}</p>
        </div>
    </motion.div>
  )
}

export default KontakOnNavbar