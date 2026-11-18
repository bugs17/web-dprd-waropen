# Project Notes / TODO

Dokumen ini mencatat hal-hal yang perlu diverifikasi. Ini bukan daftar bug yang sudah terbukti.

## Pemeriksaan lanjutan yang disarankan

- [ ] Baca `lib/db.js` untuk memastikan bagaimana Prisma Client diinisialisasi dan bagaimana generated client diimpor.
- [ ] Baca `lib/auth.js`, `middleware.js`, `action/login.js`, dan `action/logout.js` untuk memetakan autentikasi serta proteksi route.
- [ ] Periksa `context/AuthProvider.jsx` dan `context/ProgresBarProvider.jsx`.
- [ ] Petakan server actions di `action/` ke halaman dan komponen pemanggilnya.
- [ ] Periksa seluruh API route pada `app/api/`, khususnya validasi akses file dan download.
- [ ] Dokumentasikan alur upload dan penyimpanan file pada `uploads/` dan `public/uploads/`.
- [ ] Verifikasi database yang digunakan runtime tanpa menampilkan nilai rahasia `DATABASE_URL`.
- [ ] Periksa apakah `prisma/dev.db` dan `realDb/prod.db` memiliki fungsi/environment berbeda; jangan mengubah atau menghapus keduanya.
- [ ] Petakan halaman dashboard ke operasi data yang terkait.
- [ ] Periksa validasi input dan error handling pada operasi create/update/delete.
- [ ] Periksa konsistensi asset path dan mekanisme penyajian file upload.
- [ ] Periksa apakah README yang saat audit hanya berukuran 8 byte perlu dilengkapi.

## Fakta audit yang perlu diingat

- Audit menemukan 386 file total dan 243 file source JS/JSX/TS/TSX menurut perintah inventaris.
- Struktur menggunakan Next.js App Router.
- Source yang terinventarisasi didominasi `.js` dan `.jsx`.
- Prisma memakai SQLite pada schema yang diperiksa.
- Terdapat dua file database: `prisma/dev.db` dan `realDb/prod.db`.
- Terdapat folder upload dengan beberapa kategori file.
- Git branch saat audit adalah `main`, HEAD `bce6aaa`.
- Audit tidak membaca seluruh isi source code dan tidak menguji aplikasi.

## Catatan untuk setiap pekerjaan baru

Sebelum mengerjakan fitur:
1. Temukan halaman/route yang relevan.
2. Temukan komponen dan action/API yang dipanggil.
3. Temukan model Prisma yang terkait.
4. Pahami autentikasi dan validasi yang berlaku.
5. Identifikasi file upload/asset jika fitur menggunakannya.
6. Buat perubahan minimal dan laporkan cara verifikasi manual.

## Batasan tetap

Cursor tidak boleh menjalankan development server, Prisma Studio, perintah Prisma, migrasi, atau membuka internal preview. Pemilik project menjalankan proses tersebut sendiri dan memeriksa hasil melalui browser eksternal.
