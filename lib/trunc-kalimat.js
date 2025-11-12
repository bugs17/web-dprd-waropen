

export const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength
    ? text.substring(0, maxLength) + '...'
    : text;
};

export const truncateHtml = (html, wordLimit) => {
  // Hapus semua tag HTML
  const plainText = html.replace(/<[^>]+>/g, '');

  // Pecah jadi kata dan potong
  const words = plainText.split(/\s+/);
  const truncated =
    words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '...'
      : plainText;

  // Bungkus lagi ke HTML aman
  return truncated;
}
