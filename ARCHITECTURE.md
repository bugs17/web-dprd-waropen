# Architecture — DPR Waropen

## Struktur tingkat atas

```text
.
├── action/
├── app/
│   ├── api/
│   ├── berita/
│   ├── dashboard/
│   ├── dokumen/
│   ├── galery/
│   ├── kontak/
│   ├── pengaduan-dprk/
│   ├── pengaduan-pemda/
│   ├── tentang-dprd/
│   └── tentang-setwan/
├── components/
│   ├── custom/
│   │   └── client-component/
│   └── ui/
├── context/
├── hooks/
├── lib/
│   └── generated/prisma/
├── prisma/
├── public/
├── realDb/
└── uploads/
```

## Tanggung jawab direktori berdasarkan inventaris

| Direktori/file | Peran yang terlihat dari struktur |
|---|---|
| `app/` | Next.js App Router: halaman, layout, dan route handlers |
| `app/api/` | Route API, termasuk penyajian gambar dan download |
| `app/dashboard/` | Halaman administrasi |
| `action/` | Modul operasi data dan autentikasi; verifikasi directive dan implementasi setiap file |
| `components/` | Komponen UI bersama |
| `components/custom/` | Komponen khusus aplikasi |
| `components/custom/client-component/` | Komponen yang dipisahkan sebagai client-side berdasarkan penamaan |
| `components/ui/` | Komponen UI berbasis Radix/shadcn-style |
| `context/` | React context providers |
| `hooks/` | Custom React hooks |
| `lib/` | Utilitas, autentikasi, koneksi database, state/helper |
| `lib/generated/prisma/` | Prisma Client hasil generate |
| `prisma/` | Prisma schema dan database development |
| `realDb/` | Database bernama `prod.db`; perlakukan sebagai data penting |
| `public/` | Asset statis yang disajikan Next.js |
| `uploads/` | File upload runtime |

## Route groups yang terdeteksi

### API routes

- `app/api/anggota-dewan/image/[imageName]/route.js`
- `app/api/berita/image/[imageName]/route.js`
- `app/api/download/[fileName]/route.js`
- `app/api/galery/image/[imageName]/route.js`
- `app/api/hero/image/[imageName]/route.js`
- `app/api/kartu-ucapan/image/[imageName]/route.js`
- `app/api/partai/image/[imageName]/route.js`
- `app/api/struktur/image/[imageName]/route.js`

Periksa setiap route handler sebelum mengubah mekanisme file access. Pastikan validasi nama file, pembatasan path, autentikasi, dan response tetap aman.

### Modul action

`action/` memiliki modul untuk:
- Anggota dewan dan anggota badan
- Badan, fraksi, partai, dan struktur organisasi
- Dokumen
- Berita
- Galeri
- Jadwal sidang dan agenda
- Hero
- Kartu ucapan
- Kontak/alamat
- Login/logout dan pengambilan data

Nama file bukan jaminan kontrak atau implementasi. Baca isi action serta semua pemanggilnya sebelum mengubah parameter atau response.

## Integrasi dan pola yang harus diverifikasi

Sebelum membuat perubahan lintas lapisan, telusuri alur berikut di source:
1. Halaman atau komponen yang memicu operasi.
2. Server action atau API route yang dipanggil.
3. Validasi input dan pemeriksaan autentikasi/otorisasi.
4. Query Prisma dan relasi yang digunakan.
5. Lokasi penyimpanan file bila ada upload.
6. Bentuk data yang dikembalikan dan cara UI mengonsumsinya.

Jangan mengasumsikan semua modul memakai pola yang sama.

## Konfigurasi yang diketahui

- Next.js config: `next.config.mjs`
- Path alias: `@/*` → `./*` pada `jsconfig.json`
- CSS utama: `app/globals.css`
- Root layout: `app/layout.jsx`
- Middleware: `middleware.js`
- Prisma schema: `prisma/schema.prisma`
- Prisma generated client: `lib/generated/prisma/`

`next.config.mjs` mengatur `experimental.serverActions.bodySizeLimit` dan `middlewareClientMaxBodySize` ke `1GB`. Jangan mengubah batas ini tanpa memahami kebutuhan upload dan implikasi keamanan/memori.

## Catatan arsitektur yang belum dipastikan

Audit belum memeriksa isi `lib/db.js`, `lib/auth.js`, middleware, provider, layout, dan action. Karena itu:
- Jangan menulis diagram alur autentikasi berdasarkan tebakan.
- Jangan menganggap Clerk sebagai satu-satunya autentikasi karena ada dependency Clerk sekaligus `action/login.js`, `action/logout.js`, `lib/auth.js`, serta model `User`/`Session`.
- Jangan mengubah Context/Jotai/state global sebelum menelusuri penggunaannya.
- Jangan menganggap komponen yang belum terlihat dipakai sebagai komponen mati.
