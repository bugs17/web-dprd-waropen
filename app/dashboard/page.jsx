"use client";

import React from "react";
import { Calendar, FileText, Users, DollarSign, Book, CalendarCheck } from "lucide-react";
import GetStartedButton from "@/components/custom/client-component/secondaryButton";

const DashboardPage = () => {
  // 🔹 Contoh data statistik, nanti bisa diganti dengan fetch dari backend
  const stats = [
    { label: "Berita", count: 23, icon: <FileText className="w-6 h-6" />, color: "text-amber-400" },
    { label: "Anggota Dewan", count: 12, icon: <Users className="w-6 h-6" />, color: "text-blue-400" },
    { label: "Produk Hukum", count: 15, icon: <Book className="w-6 h-6" />, color: "text-green-400" },
    { label: "Dokumen Keuangan", count: 8, icon: <DollarSign className="w-6 h-6" />, color: "text-red-400" },
    { label: "Dokumen Renstra", count: 5, icon: <Book className="w-6 h-6" />, color: "text-purple-400" },
    { label: "Agenda Sidang", count: 10, icon: <CalendarCheck className="w-6 h-6" />, color: "text-yellow-400" },
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
            <button
              key={idx}
              className="flex flex-col items-center justify-center bg-gray-800/30 hover:bg-gray-700/40 p-4 rounded-lg transition"
            >
              <div className={`${s.color} mb-2`}>{s.icon}</div>
              <span className="text-sm text-gray-200">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 🔹 Placeholder untuk konten tambahan */}
      <div className="bg-muted/50 min-h-[300px] rounded-xl flex items-center justify-center text-gray-500">
        <GetStartedButton>Tambah</GetStartedButton>
      </div>
    </div>
  );
};

export default DashboardPage;
