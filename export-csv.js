function exportCSV() {
  let csv = "Nama,Qty,Harga,Satuan,Total,Dibayar,Kembalian\n";
  db.transaksi.forEach(t => {
    const total = t.qty * t.harga;
    const kembali = t.dibayar - total;
    csv += `${t.nama},${t.qty},${t.harga},${t.satuan},${total},${t.dibayar},${kembali >= 0 ? kembali : "Uang kurang"}\n`;
  });
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "transaksi.csv";
  a.click();
}
