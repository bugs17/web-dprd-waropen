import React from "react";
import {  FileText, Users, DollarSign, Book, CalendarCheck } from "lucide-react";
import { prisma } from "@/lib/db";
import Link from "next/link";



export const revalidate = 0;


const DashboardPage = async () => {
  let jumlahBerita;
  let jumlahAnggotaDewan;
  let docs = [];
  let agenda;
  
  try {
    jumlahBerita =  (await prisma.berita.findMany()).length
  } catch (error) {
  }

  try {
    jumlahAnggotaDewan =  (await prisma.anggotaDewan.findMany()).length
  } catch (error) {
  }
  try {
    docs =  await prisma.dokumen.findMany()
  } catch (error) {
  }

  let produkHukum = 0
  let dokumenKeuangan = 0
  let renstra = 0

  if (docs.length > 0) {
    produkHukum = docs.filter((p) => p.jenisDokumen === "Produk Hukum").length
    dokumenKeuangan = docs.filter((p) => p.jenisDokumen === "Laporan Keuangan DPRK").length
    renstra = docs.filter((p) => p.jenisDokumen === "Rencana Strategis DPRK").length
  }


  try {
    agenda = (await prisma.jadwalSidang.findMany()).length
  } catch (error) {
  }

  // 🔹 Contoh data statistik, nanti bisa diganti dengan fetch dari backend
  const stats = [
    { label: "Berita", count: jumlahBerita, icon: <FileText className="w-6 h-6" />, color: "text-amber-400", url: "/dashboard/berita" },
    { label: "Anggota Dewan", count: jumlahAnggotaDewan, icon: <Users className="w-6 h-6" />, color: "text-blue-400", url: "/dashboard/anggota-dewan" },
    { label: "Produk Hukum", count: produkHukum, icon: <Book className="w-6 h-6" />, color: "text-green-400", url: "/dashboard/docs" },
    { label: "Dokumen Keuangan", count: dokumenKeuangan, icon: <DollarSign className="w-6 h-6" />, color: "text-red-400", url: "/dashboard/docs" },
    { label: "Dokumen Renstra", count: renstra, icon: <Book className="w-6 h-6" />, color: "text-purple-400", url: "/dashboard/docs" },
    { label: "Agenda", count: agenda, icon: <CalendarCheck className="w-6 h-6" />, color: "text-yellow-400", url: "/dashboard/jadwal" },
  ];


  

  return (
    <div className="space-y-6 p-4">
      {/* 🔹 Greeting */}
      <div className="bg-muted/50 rounded-xl flex flex-col items-center justify-center p-6">
        <span className="font-bold text-3xl">😊👋</span>
        <span className="text-white mt-2 text-lg text-center">Hallo Admin, selamat datang!</span>
      </div>

      {/* 🔹 Statistik Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {stats.map((s, idx) => (
          <div
            key={idx}
            className="bg-muted/50 aspect-video rounded-xl p-4 flex flex-col justify-between shadow-md hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4">
              <div className={`${s.color} bg-white/10 p-2 rounded-md`}>
                {s.icon}
              </div>
              <div>
                <span className="font-bold text-4xl">{s.count}</span>
              </div>
            </div>
            <div className="mt-4 text-gray-400 font-mono">{s.label}</div>
          </div>
        ))}
      </div>

      {/* 🔹 Quick Access / Shortcut */}
      <div className="bg-muted/50 rounded-xl p-4 shadow-md">
        <h3 className="text-xl font-semibold mb-4">Akses Cepat</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {stats.map((s, idx) => (
            <Link key={idx} href={s.url} className="flex flex-col items-center justify-center bg-gray-800/30 hover:bg-gray-700/40 p-4 rounded-lg transition">
              <div className={`${s.color} mb-2`}>{s.icon}</div>
              <span className="text-sm text-gray-200">{s.label}</span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
};

export default DashboardPage;
