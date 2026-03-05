---
title: Setup shadcn-svelte di SvelteKit Monorepo Project
pubDate: "2025-02-26"
---

Saat mulai memecah aplikasi SvelteKit saya ke dalam struktur monorepo, satu hal yang terlihat sepele ternyata menjadi cukup krusial: di mana sebaiknya UI components diletakkan?

Awalnya saya berpikir sederhana. Setiap app bisa saja meng-install dan generate komponen shadcn-svelte masing-masing. Praktis, cepat, selesai.

Tapi seperti banyak keputusan arsitektur lainnya, yang terlihat mudah di awal seringkali menyimpan biaya tersembunyi.

Mari kita bahas kenapa pada akhirnya saya memilih meng-install **shadcn-svelte** di `packages/ui` dan menjadikannya sebagai shared design system untuk semua app dalam monorepo SvelteKit.

## Kenapa Tidak Install di Setiap App?

Struktur monorepo saya kurang lebih seperti ini:

- `apps/web`
- `apps/server`
- `apps/landing`
- `packages/db`
- `packages/api`
- `...`

Secara teori, `apps/web` dan `apps/landing` dapat berdiri sendiri. Jadi kenapa tidak dibiarkan masing-masing mengelola antar-mukanya sendiri?

Masalahnya bukan pada bisa atau tidak. Masalahnya ada pada skala dan konsistensi.

Jika setiap app:

- Generate komponen sendiri,
- Punya `tailwind.config.ts` sendiri,
- Punya token warna sendiri,

Maka cepat atau lambat akan terjadi perbedaan kecil yang tidak disadari. Spacing berbeda 2px. Radius berbeda sedikit. Hover state tidak konsisten.

Secara teknis mungkin tidak fatal.
Tetapi, antar-muka bukan hanya tampilan. Ia adalah kontrak visual antara sistem dan pengguna

## Memahami Peran shadcn-svelte

Perlu dipahami bahwa shadcn bukan library yang kita “pakai” seperti dependency biasa.

Ia menghasilkan komponen ke dalam project kita.

Artinya, ketika kita menjalankan generator, kita sedang membuat salinan komponen. Jika dilakukan di dua app berbeda, maka kita memiliki dua source of truth.

Di sinilah masalahnya.

Jika suatu hari saya memperbaiki `Button` di `apps/web`, `Button` pada `apps/landing` tidak ikut berubah.

Karena itu saya memilih pendekatan berikut:

- `packages/ui` menjadi boundary design system.
- Komponen di-generate di dalam package tersebut.
- Semua app mengimpor dari `packages/ui`.

Dengan begitu, apps tidak tahu tentang shadcn.
Apps hanya tahu tentang design system internal.

## Struktur yang Digunakan

Struktur finalnya kurang lebih akan terlihat seperti ini

```
.
├── apps/
│   ├── web/
│   └── server/
├── packages/
│   ├── api/
│   ├── db/
│   └── ui/
```

Langkah konseptualnya adalah:

1. Inisialisasi shadcn-svelte di `packages/ui`,

   > Untuk dokumentasi inisialisasi manual dapat dilihat [disini](https://www.shadcn-svelte.com/docs/installation/manual)

   > Atau jika ingin menggunakan utility CSS selain TailwindCSS, UnoCSS bisa jadi pilihan. Lihat dokumentasinya [disini](https://github.com/unocss-community/unocss-preset-shadcn)

2. Konfigurasi path aliases

   > Karena kita tidak akan menggunakan built-in `$lib`, maka kita harus memperbarui `svelte.config.js` agar mengenali alias yang baru

   ```js filename="svelte.config.js"
   const config = {
      // ... other config
      kit: {
        // .. other config
        alias: {
         // .. kita akan meggunakan $ui
          "$ui": "path/to/ui/"
          "$ui/*": "path/to/ui/*"
        }
      }
   }

   ```
