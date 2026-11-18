# Project Context — DPR Waropen

## Identitas project

| Item | Hasil audit |
|---|---|
| Package name | `dpr-waropen` |
| Package version | `0.1.0` |
| Repository remote | `git@github.com:bugs17/web-dprd-waropen.git` |
| Branch saat audit | `main` |
| Framework | Next.js `15.5.12` terpasang |
| React | `19.2.3` |
| Bahasa source | JavaScript / JSX |
| ORM | Prisma `6.13.0` |
| Database provider | SQLite |
| Styling | Tailwind CSS `4.1.8` |
| UI primitives | Radix UI |
| Package manager | npm |
| Alias import | `@/*` mengarah ke root project |

Project ini merupakan aplikasi DPR Waropen yang sudah memiliki halaman publik dan dashboard administrasi. Pertahankan implementasi yang ada; jangan memperlakukannya sebagai starter project.

## Lingkungan audit

Audit dilakukan dari:
- macOS 13.5.2, Intel x86_64
- Node.js `v23.7.0`
- npm `10.9.2`
- Git `2.46.0`

Lokasi project saat audit:
`/Users/bugs/Documents/Projects/web-dpr-waropen/dpr-waropen`

Versi di atas adalah environment saat audit, bukan persyaratan bahwa semua developer harus memakai versi yang sama.

## Gambaran fitur dari struktur route

### Halaman publik

- Beranda: `app/page.jsx`
- Berita dan detail berita: `app/berita`
- Dokumen publik: `app/dokumen`
  - Dokumen publikasi
  - Laporan keuangan
  - Produk hukum
  - Rencana strategis
- Galeri: `app/galery`
- Kontak: `app/kontak`
- Pengaduan DPRK: `app/pengaduan-dprk`
- Pengaduan Pemda: `app/pengaduan-pemda`
- Tentang DPRD: `app/tentang-dprd`
  - Badan
  - Detail anggota DPRK
  - Fraksi
  - Informasi anggota DPRD
  - Komisi
- Tentang Setwan: `app/tentang-setwan`
  - Profil sekretariat
  - Struktur organisasi
  - Visi dan misi

### Dashboard

Route dashboard terdeteksi di `app/dashboard`:
- Ringkasan dashboard
- Anggota dewan
- Badan
- Berita
- Dokumen
- Fraksi
- Galeri
- Hero settings
- Jadwal
- Kartu ucapan
- Kontak dan alamat
- Partai
- Struktur Setwan

### Backend dan operasi data

- `action/` berisi modul-modul operasi data yang penamaannya menunjukkan operasi tambah, edit, hapus, ambil data, login, dan logout.
- `app/api/` berisi route API untuk gambar/asset dan download.
- `lib/db.js` merupakan lokasi yang perlu diperiksa untuk mengetahui konfigurasi Prisma Client aktual.
- `lib/auth.js` dan `middleware.js` perlu diperiksa untuk memahami autentikasi dan proteksi route.

Catatan: daftar di atas disimpulkan dari nama dan lokasi file. Detail implementasi, otorisasi, alur request, serta hubungan antarmodul harus diverifikasi dengan membaca source.

## Library utama yang terdeteksi

- `next`, `react`, `react-dom`
- `@prisma/client`, `prisma`
- `@clerk/nextjs`
- `jotai`
- Radix UI packages dan `radix-ui`
- Tailwind CSS 4
- `framer-motion`
- `lucide-react`
- `@schedule-x/*`
- `@tiptap/*`
- `swiper`
- `lightgallery`
- `axios`
- `date-fns`
- `react-hot-toast`
- `react-day-picker`
- `nprogress`, `next-nprogress-bar`

Periksa `package.json` sebelum menambahkan atau mengganti library. Jangan mengasumsikan semua library di atas dipakai di setiap bagian aplikasi.

## Status Git saat audit

- Branch: `main`
- HEAD: `bce6aaa`
- HEAD dan `origin/main` terlihat sejajar pada output audit.
- Commit terakhir: `bce6aaa update compose agar tidak expose port ke public`
- Commit sebelumnya yang terlihat:
  - `59ed193 .`
  - `4f2b0ad ganti image dari alphine ke image standard`
  - `c1c395d update base image nodejs dari 22 alphine ke node:22.23.4-alpine karna ada cve rentan.`
  - `1bcda42 merubah aturan penambahan anggota badan`

Output `git status --short --branch` tidak menampilkan file modified/untracked pada saat audit. Selalu cek ulang status Git sebelum melakukan perubahan; kondisi dapat berubah setelah audit.

## Data dan file runtime

Audit menemukan:
- `prisma/dev.db`
- `realDb/prod.db`
- `uploads/` dengan subfolder dokumen, galeri, hero, gambar berita, kartu ucapan, logo partai, profile dewan, dan struktur.
- `public/uploads/` juga memiliki asset.

Database dan folder upload berpotensi berisi data penting. Jangan menghapus, memindahkan, menimpa, atau menganggapnya sebagai file sementara.

## Batas pengetahuan audit

Audit terminal memberikan inventaris direktori, package, Prisma schema, konfigurasi Next.js, nama environment variable, Git, dan daftar source file. Audit tidak melakukan code review mendalam terhadap seluruh source. Jangan menyimpulkan bahwa autentikasi menggunakan Clerk atau sistem lokal hanya dari dependency/nama file; periksa implementasi aktual terlebih dahulu.
