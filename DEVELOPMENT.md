# Development Workflow — DPR Waropen

## Environment saat audit

- macOS `13.5.2`
- Intel x86_64
- Node.js `v23.7.0`
- npm `10.9.2`
- Git `2.46.0`

## Package scripts

Dari `package.json`:

| Script | Perintah |
|---|---|
| `dev` | `next dev -H 0.0.0.0 -p 3000` |
| `dev-default` | `next dev` |
| `build` | `next build` |
| `start` | `next start` |
| `lint` | `next lint` |

Informasi ini dicatat sebagai referensi. **AI Agent tidak diizinkan menjalankan script server** (`dev`, `dev-default`, `start`) atau perintah Next.js server yang setara.

## Workflow yang diinginkan pemilik project

1. Pemilik project mengelola development server secara manual melalui terminal miliknya.
2. Cursor/AI Agent hanya membaca dan mengubah source code sesuai permintaan.
3. Pemilik project melihat hasil melalui browser eksternal, misalnya Google Chrome.
4. Jangan membuka atau membuat internal preview/browser window di Cursor.
5. Jika perlu pemeriksaan visual, Agent menyebutkan bahwa pemilik project perlu melakukan pengecekan sendiri di browser eksternal.
6. Jika diperlukan Prisma Studio, generate client, migrasi, atau tindakan database, Agent memberikan perintah dan menunggu pemilik project menjalankannya sendiri.

## Larangan operasional

Jangan jalankan:
- `npm run dev`
- `npm run dev-default`
- `npm start`
- `npm run start`
- `next dev`
- `next start`
- Prisma Studio
- Prisma generate, migrate, db push, db pull, seed, reset, atau perintah database lain.

Jangan menjalankan instalasi/update dependency, audit fix, atau mengubah lockfile tanpa persetujuan.

## Pemeriksaan yang dapat dilakukan Agent

Agent dapat melakukan review statis tanpa menyalakan aplikasi:
- Membaca source code dan konfigurasi.
- Menelusuri import, pemanggil fungsi, route, dan dependensi.
- Memeriksa diff perubahan.
- Mencari referensi nama model/field.
- Memeriksa konsistensi JSX/JavaScript secara manual.
- Menjelaskan kemungkinan error berdasarkan source yang dibaca.

Untuk setiap test atau command yang mungkin mengubah data, menghasilkan file, atau menjalankan server, Agent harus meminta izin terlebih dahulu dan tidak boleh mengeksekusinya sendiri.

## Konfigurasi

- Next config: `next.config.mjs`
- PostCSS config: `postcss.config.mjs`
- Tailwind CSS 4
- JS path alias: `@/*` → root
- Environment variables dibaca dari `.env`; jangan pernah menampilkan nilai rahasia.
- `next.config.mjs` menetapkan batas body server actions/middleware ke `1GB`. Jangan mengubahnya tanpa alasan teknis dan persetujuan.

## Git

Repository saat audit:
- Branch `main`
- Remote `origin`: `git@github.com:bugs17/web-dprd-waropen.git`
- HEAD saat audit: `bce6aaa`

Selalu periksa status Git terbaru sebelum mengedit. Jangan melakukan commit, push, reset, clean, atau operasi destruktif tanpa instruksi eksplisit.
