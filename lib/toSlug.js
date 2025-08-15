export const toSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")    // hapus tanda baca kecuali huruf & angka
      .replace(/\s+/g, "-")           // ganti spasi jadi tanda minus
      .trim();
};

export const createSlug = (title) => {
    return title
      .toLowerCase() // Mengubah semua huruf menjadi lowercase
      .replace(/\s+/g, '-') // Mengganti semua spasi dengan -
      .replace(/[^\w-]+/g, '') // Menghapus karakter non-alfanumerik (selain - dan _)
      .replace(/--+/g, '-') // Mengganti beberapa tanda - yang berurutan menjadi satu
      .trim('-'); // Menghapus tanda - yang ada di awal atau akhir string
  };


 export function slugToText(slug) {
    return slug.replace(/-/g, ' ');
  }