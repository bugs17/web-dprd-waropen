export const formatDateCalander = (dateString) => {
    const date = new Date(dateString);
  
    // Format tanggal ke 'yyyy-MM-dd HH:mm' dalam UTC
    const formattedDate = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')} ${String(date.getUTCHours()).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')}`;
  
    return formattedDate;
  };

export function formatTanggalIndo(dateInput) {
  // pastikan bentuknya Date object
  const date = new Date(dateInput)

  // nama hari (Senin, Selasa, dll.)
  const hari = date.toLocaleDateString("id-ID", { weekday: "long" })

  // ambil tanggal, bulan, tahun
  const tanggalFormatted = date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  // pisahkan jadi [12, Juni, 2025]
  const [tgl, bln, thn] = tanggalFormatted.split(" ")

  // gabungkan sesuai format yang diminta
  return `${hari}, ${tgl}-${bln}-${thn}`
}
