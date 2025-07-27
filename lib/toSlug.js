export const toSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")    // hapus tanda baca kecuali huruf & angka
      .replace(/\s+/g, "-")           // ganti spasi jadi tanda minus
      .trim();
};