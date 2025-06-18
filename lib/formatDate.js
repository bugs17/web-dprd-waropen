export const formatDateCalander = (dateString) => {
    const date = new Date(dateString);
  
    // Format tanggal ke 'yyyy-MM-dd HH:mm' dalam UTC
    const formattedDate = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')} ${String(date.getUTCHours()).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')}`;
  
    return formattedDate;
  };