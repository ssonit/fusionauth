export function formatDate(dateString: string) {
  const date = new Date(dateString);

  const day = date.getDate();

  const month = date.getMonth() + 1; // Lưu ý: tháng trong JavaScript bắt đầu từ 0, nên cần cộng thêm 1

  const year = date.getFullYear();

  const formattedDate = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
  return formattedDate;
}
