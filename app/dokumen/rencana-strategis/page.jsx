"use client";

import HeaderPages from '@/components/custom/header-pages'
import { FileText, Search } from 'lucide-react'
import Link from 'next/link'

import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react';
import { getDok } from '@/action/get-dok';
import TabelListDok from '@/components/custom/client-component/tabel-laporan-keuangan-home';


const leftMenu = [
    {
        title: "Laporan Keuangan DPRK",
        path: "/dokumen/laporan-keuangan",
        isActive: false
    },
    {
        title: "Rencana Strategis DPRK",
        path: "/dokumen/rencana-strategis",
        isActive: true
    },
    {
        title: "Dokumen Publikasi",
        path: "/dokumen/dokumen-publikasi",
        isActive: false
    },
    {
        title: "Produk Hukum",
        path: "/dokumen/produk-hukum",
        isActive: false
    },
]



const LaporanKeuanganPage = () => {
  const [docs, setDocs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Rencana Strategis DPRK | DPRK WAROPEN";
    const getData = async () => {
      const data = await getDok("renstra");
      if (data) setDocs(data);
    };
    getData();
  }, []);

  // Filter docs realtime
  const filteredDocs = docs.filter((item) =>
    item.namaDokumen.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <HeaderPages title={"Rencana Strategis DPRK"} />

      <div className="flex w-full lg:p-20 p-5 gap-6">
        {/* Sidebar */}
        <div className="w-[25%] hidden h-full bg-[#231c26] lg:flex flex-col py-4">
          {leftMenu.map((item, index) => (
            <Link
              href={item.path}
              key={index}
              className={`flex flex-row gap-3 ${
                item.isActive && "bg-amber-100"
              } py-4 pl-4 items-center hover:bg-amber-100 group`}
            >
              <FileText
                className={`text-black ${
                  item.isActive ? "text-black" : "text-white"
                } group-hover:text-black`}
              />
              <span
                className={`${
                  item.isActive ? "text-black" : "text-white"
                } group-hover:text-black`}
              >
                {item.title}
              </span>
            </Link>
          ))}
        </div>

        {/* Content */}
        <div className="lg:w-[75%] w-full">
          <div className="relative w-full max-w-sm mb-5">
            <Input
              type="text"
              placeholder="Cari renstra"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-10 text-white"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 h-5 w-5 pointer-events-none" />
          </div>

          {/* Kirim filteredDocs ke tabel */}
          <TabelListDok docs={filteredDocs} />
        </div>
      </div>
    </>
  );
};


export default LaporanKeuanganPage