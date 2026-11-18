# Instruksi Agent — DPR Waropen

Dokumen ini adalah aturan kerja utama untuk AI coding agent (Cursor) pada repository ini. Baca sebelum melakukan perubahan.

## 1. Konteks dan prinsip kerja

- Ini adalah project yang sudah berjalan dan dikembangkan cukup jauh, bukan project baru.
- Nama package/repository pada audit: `dpr-waropen` / `web-dprd-waropen`.
- Stack terdeteksi: Next.js 15 (App Router), React 19, JavaScript/JSX, Prisma ORM 6, SQLite, Tailwind CSS 4, Radix UI, dan beberapa library UI lain.
- Pertahankan arsitektur, pola implementasi, struktur folder, dependensi, dan perilaku fitur yang sudah ada.
- Jangan melakukan refactor besar, mengganti library, mengubah arsitektur, atau merapikan banyak file sekaligus kecuali diminta secara eksplisit.
- Jangan menganggap file tidak digunakan hanya karena namanya tidak jelas. Telusuri import, route, server action, dan pemanggilnya sebelum menyimpulkan.
- Jangan membuat asumsi tentang perilaku aplikasi yang belum diverifikasi dari source code. Jika belum jelas, jelaskan bagian yang belum diketahui.

## 2. Batasan operasi — WAJIB DIPATUHI

### Jangan menjalankan server atau preview

Agent DILARANG menjalankan perintah yang menyalakan server aplikasi, termasuk tetapi tidak terbatas pada:

- `npm run dev`
- `npm run dev-default`
- `npm start`
- `npm run start`
- `next dev`
- `next start`
- perintah server lain yang setara.

Pemilik project menjalankan development server sendiri di terminal terpisah.

Agent juga DILARANG membuka, membuat, atau menggunakan browser/window preview internal Cursor untuk menampilkan aplikasi. Pemilik project memeriksa hasil perubahan melalui browser terpisah (misalnya Chrome). Jangan mencoba mengambil alih browser tersebut.

Jika perubahan perlu diuji secara visual, berikan instruksi singkat kepada pemilik project untuk memeriksanya di browser eksternal setelah ia menjalankan server sendiri.

### Jangan menjalankan Prisma Studio atau perintah database

Agent DILARANG menjalankan Prisma Studio, termasuk:

- `npx prisma studio`
- `npm exec prisma studio`
- perintah lain yang membuka Prisma Studio.

Agent DILARANG menjalankan perintah Prisma yang mengubah, membuat, menyinkronkan, atau memigrasikan database, termasuk tetapi tidak terbatas pada:

- `prisma migrate dev`
- `prisma migrate deploy`
- `prisma migrate reset`
- `prisma db push`
- `prisma db pull`
- `prisma generate`
- `prisma db seed`
- `prisma studio`
- `npx prisma ...` atau `npm exec prisma ...` tanpa persetujuan eksplisit pemilik project.

Jangan menjalankan query tulis, menghapus database, membuat database baru, mengganti `DATABASE_URL`, atau mengubah data SQLite. Database lokal dan produksi harus diperlakukan sebagai data penting.

Jika suatu pekerjaan memerlukan Prisma Studio, generate client, migrasi, sinkronisasi schema, seed, atau tindakan database lainnya:
1. Berhenti sebelum menjalankan perintah tersebut.
2. Jelaskan alasan dan risiko singkat.
3. Berikan perintah yang tepat kepada pemilik project untuk dijalankan sendiri di terminal.
4. Tunggu konfirmasi/hasil dari pemilik project sebelum mengasumsikan tindakan tersebut sudah dilakukan.

### Jangan mengubah environment atau dependency secara sepihak

- Jangan membaca atau menampilkan nilai rahasia dari `.env`.
- Jangan menyalin secret, token, password, connection string, atau credential ke dokumentasi, log, komentar, maupun output.
- Jangan mengubah `.env` atau konfigurasi deployment tanpa permintaan eksplisit.
- Jangan menjalankan `npm install`, `npm update`, `npm audit fix`, atau mengubah dependency/lockfile tanpa persetujuan.
- Jangan menghapus file, asset, folder upload, database, atau file yang tampak tidak terpakai tanpa penelusuran dan persetujuan.
- Jangan menjalankan perintah Git yang mengubah riwayat atau membuang perubahan, seperti `reset --hard`, `clean`, `checkout` untuk membuang perubahan, force push, atau commit/push tanpa instruksi.

## 3. Cara bekerja pada setiap tugas

1. Pahami permintaan dan identifikasi file yang relevan sebelum mengedit.
2. Baca implementasi terkait beserta dependency/import/call-site yang memengaruhinya.
3. Periksa apakah ada perubahan lokal pengguna. Jangan menimpa perubahan yang tidak terkait.
4. Buat perubahan sekecil mungkin dan tetap konsisten dengan pola project yang ada.
5. Jangan mengubah kontrak data, nama field Prisma, relasi, API, props, atau bentuk response tanpa memahami seluruh pemakainya.
6. Setelah mengedit, lakukan pemeriksaan statis yang aman bila tersedia (misalnya membaca diff dan meninjau kode). Jangan menyalakan server, membuka preview, menjalankan Prisma, atau memodifikasi database.
7. Laporkan file yang diubah, ringkasan perubahan, asumsi, risiko, dan langkah manual yang perlu dilakukan pemilik project.

## 4. Gaya implementasi

- Gunakan JavaScript/JSX. Jangan mengonversi file ke TypeScript kecuali diminta.
- Pertahankan penggunaan alias `@/` yang dikonfigurasi di `jsconfig.json`.
- Pertahankan Next.js App Router dan pola Server/Client Component yang sudah digunakan.
- Perhatikan batas `"use client"` dan jangan memindahkan akses server/database ke Client Component.
- Ikuti pola autentikasi, server action, API route, validasi, upload, dan error handling yang sudah ada setelah memeriksa implementasinya.
- Gunakan komponen UI dan library yang sudah tersedia sebelum menambah dependency baru.
- Pertahankan kompatibilitas dengan versi dependency yang tercatat di `package.json` dan `package-lock.json`.
- Jangan mengubah format atau isi data yang sudah tersimpan tanpa kebutuhan yang jelas.

## 5. Database dan Prisma

- Prisma schema utama yang terdeteksi: `prisma/schema.prisma`.
- Provider datasource pada schema: `sqlite`.
- URL database berasal dari environment variable `DATABASE_URL`.
- Audit menemukan file `prisma/dev.db` dan `realDb/prod.db`. Keduanya harus dianggap penting; jangan mengasumsikan salah satunya boleh dihapus atau ditimpa.
- Client hasil generate juga ada di `lib/generated/prisma`. Jangan mengedit file generated secara manual.
- Sebelum mengusulkan perubahan schema, telusuri seluruh pemakaian model/field/relasi pada source code.
- Setiap perubahan schema/database harus disampaikan sebagai rencana dan instruksi manual. Agent tidak mengeksekusinya.

## 6. Verifikasi dan komunikasi

- Jangan mengatakan aplikasi sudah berhasil dijalankan atau diuji di browser jika agent tidak menjalankannya.
- Jangan mengklaim database sudah tersinkron, Prisma Client sudah diperbarui, atau migrasi sudah diterapkan tanpa konfirmasi pemilik project.
- Untuk pemeriksaan visual, minta pemilik project membuka URL aplikasi di Chrome/browser eksternal miliknya.
- Untuk tindakan manual, berikan perintah terminal yang siap disalin, idealnya satu perintah per blok dan jelaskan kapan harus dijalankan.
- Jika suatu langkah berisiko terhadap data, jelaskan risikonya sebelum memberi perintah.
- Komunikasikan secara ringkas, jelas, langsung, dan dalam Bahasa Indonesia kecuali diminta lain.

## 7. Status dokumentasi

Dokumentasi pendamping:
- `PROJECT_CONTEXT.md`
- `ARCHITECTURE.md`
- `DATABASE.md`
- `DEVELOPMENT.md`
- `TODO.md`

Dokumentasi ini dibuat dari audit terminal tanggal 18 November 2026. Audit tersebut mengumpulkan inventaris dan konfigurasi, tetapi tidak membaca seluruh implementasi 243 file source. Karena itu, agent harus memverifikasi detail perilaku dari source code sebelum mengubahnya.
