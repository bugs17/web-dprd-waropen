# Database — Prisma dan SQLite

## Konfigurasi yang terdeteksi

File schema utama: `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

Versi package pada audit:
- `prisma`: `6.13.0`
- `@prisma/client`: `6.13.0`

Prisma Client generated berada di `lib/generated/prisma/`. Jangan mengedit file generated secara manual.

## Database files yang ditemukan

| Path | Catatan |
|---|---|
| `prisma/dev.db` | Database pada direktori Prisma; jangan menganggap aman untuk dihapus |
| `realDb/prod.db` | Database bernama produksi; perlakukan sebagai data sangat penting |

Audit hanya menemukan nama/path file. Audit tidak memeriksa isi database dan tidak membuktikan database mana yang sedang dipakai oleh runtime.

`DATABASE_URL` disamarkan dalam output audit. Jangan menampilkan atau menyalin nilai aslinya ke dokumentasi, chat, atau log.

## Model Prisma yang terdeteksi

Schema memuat model berikut:

1. `PejabatSetwan`
2. `AnggotaDewan`
3. `BadanAnggota`
4. `Badan`
5. `RiwayatPendidikan`
6. `RiwayatPekerjaan`
7. `Partai`
8. `Fraksi`
9. `Komisi`
10. `Setwan`
11. `Dokumen`
12. `Berita`
13. `Galery`
14. `JadwalSidang`
15. `Agenda`
16. `Kontak`
17. `Hero`
18. `User`
19. `Session`
20. `KartuUcapan`

## Relasi utama yang tampak dari schema

- `PejabatSetwan` memiliki relasi one-to-many ke `BadanAnggota`.
- `AnggotaDewan` memiliki relasi ke `Partai`, `Komisi`, `BadanAnggota`, `RiwayatPendidikan`, dan `RiwayatPekerjaan`.
- `BadanAnggota` dapat merujuk ke `AnggotaDewan` atau `PejabatSetwan`, memiliki `nama` dan `namaManual` opsional, serta wajib terhubung ke `Badan`.
- `Badan` memiliki daftar `BadanAnggota`.
- `RiwayatPendidikan` dan `RiwayatPekerjaan` terhubung ke `AnggotaDewan` dengan `onDelete: Cascade`.
- `Partai` dapat terhubung ke `Fraksi`; `Fraksi` memiliki daftar `Partai`.
- `Komisi` memiliki daftar `AnggotaDewan`.
- `User` memiliki daftar `Session`; `Session` terhubung ke `User` dengan `onDelete: Cascade`.

Jangan mengubah relasi, optionality, default, atau aturan cascade tanpa menelusuri seluruh pemakaian pada source dan memahami dampaknya terhadap data yang sudah ada.

## Aturan wajib untuk AI Agent

**Agent tidak boleh menjalankan Prisma CLI atau mengoperasikan database.**

Dilarang menjalankan, termasuk melalui `npx`, `npm exec`, shell script, task runner, atau terminal terintegrasi:
- `prisma studio`
- `prisma generate`
- `prisma migrate dev`
- `prisma migrate deploy`
- `prisma migrate reset`
- `prisma db push`
- `prisma db pull`
- `prisma db seed`
- perintah Prisma lain yang dapat membaca/menulis/mengubah database atau generated client tanpa persetujuan eksplisit.

Agent boleh membaca `prisma/schema.prisma` dan source code untuk analisis. Jangan membuka database untuk eksperimen, menjalankan query tulis, atau mengubah file `.db`.

Jika perubahan schema membutuhkan tindakan Prisma:
1. Tampilkan perubahan schema yang diusulkan.
2. Jelaskan konsekuensi dan potensi dampak pada data.
3. Berikan perintah manual yang perlu dijalankan pemilik project.
4. Jangan menjalankan perintah tersebut.
5. Jangan menyatakan perubahan database sudah diterapkan sebelum pemilik project mengonfirmasi.

## Prosedur aman saat mengubah model

- Cari semua referensi model dan field di `action/`, `app/`, serta `lib/`.
- Periksa relasi `include`, `select`, `where`, `orderBy`, nested writes, dan pemrosesan hasil query.
- Periksa form, komponen, dan API yang mengirim atau membaca field terkait.
- Pertahankan kompatibilitas data lama.
- Jangan mengganti nama field hanya untuk alasan kosmetik.
- Jangan membuat asumsi database aktif dari nama file. Verifikasi cara `DATABASE_URL` dibaca oleh `lib/db.js` tanpa mencetak secret.
