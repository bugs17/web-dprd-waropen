"use client";

import { useState, useEffect } from "react";
import BadanTables from "@/components/custom/client-component/tabel-badan";

// import server action
import { listAnggotaBadan } from "@/action/get-list-anggota-badan";
import { getBadanList } from "@/action/get-badan-list";

export default function Page() {
  const [badans, setBadans] = useState([]);
  const [anggotaAvailable, setAnggotaAvailable] = useState([]);

  // fetch list anggota (dewan + setwan, exclude ketua/wakil)
  const refreshAnggota = async () => {
    const data = await listAnggotaBadan();
    setAnggotaAvailable(data || []);
    console.log("Data baru: ", data)
  };

    // mengambil data badan dan anggotanya
    const fetchBadanAndAnggota = async () => {
        const dataBadan = await getBadanList()
        if (dataBadan) {
            setBadans(dataBadan);
        }
    }

  // contoh data badan & anggota awal
  useEffect(() => {
    fetchBadanAndAnggota()
    refreshAnggota();
  }, []);

  

  return (
    <div className="p-8 space-y-10">
      {badans.map((b) => (
        <BadanTables
          key={b.id}
          badanId={b.id}
          namaBadan={b.nama}
          badanAnggota={b.anggota}
          anggotaAll={anggotaAvailable}
          onDialogOpen={refreshAnggota} // fetch ulang saat dialog terbuka
          onSubmitedCompleted={fetchBadanAndAnggota}
        />
      ))}
    </div>
  );
}
