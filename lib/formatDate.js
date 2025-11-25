export const formatDateCalander = (dateString) => {
  const date = new Date(dateString);

  const formattedDate =
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ` +
    `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

  return formattedDate;
};


export function formatTanggalIndo(dateInput) {
  // jika input adalah Date object biarkan; kalau string, tangani dua kemungkinan:
  // - "YYYY-MM-DD"  (date-only)
  // - ISO full datetime seperti "2025-11-17T00:00:00.000Z" atau "2025-11-17T00:00:00"
  let date;
  if (dateInput instanceof Date) {
    date = dateInput;
  } else if (typeof dateInput === "string") {
    const isoDateOnly = /^\d{4}-\d{2}-\d{2}$/;
    if (isoDateOnly.test(dateInput)) {
      // buat Date di UTC untuk mengunci tanggal tanpa efek timezone
      const [y, m, d] = dateInput.split("-").map(Number);
      date = new Date(Date.UTC(y, m - 1, d));
    } else {
      // string ISO/full datetime — buat Date biasa, tapi kita akan format dengan timeZone UTC
      date = new Date(dateInput);
    }
  } else {
    date = new Date(dateInput);
  }

  // opsi format pakai timeZone UTC agar tidak terpengaruh zona lokal client
  const locale = "id-ID";
  const tzOptions = { timeZone: "UTC" };

  const hari = date.toLocaleDateString(locale, { weekday: "long", ...tzOptions });
  const tanggalFormatted = date.toLocaleDateString(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
    ...tzOptions,
  });

  const [tgl, bln, thn] = tanggalFormatted.split(" ");
  return `${hari}, ${tgl}-${bln}-${thn}`;
}

