function syncToWA() {
  const nomor = prompt("Masukkan nomor WhatsApp tujuan (tanpa +62):");
  if (!nomor || isNaN(nomor)) {
    alert("Nomor tidak valid.");
    return;
  }

  const lines = db.transaksi.map(t => {
    const total = t.qty * t.harga;
    const kembali = t.dibayar - total;
    return `${t.nama} x${t.qty} ${t.satuan} = Rp${total}, Dibayar: Rp${t.dibayar}, Kembali: ${kembali >= 0 ? "Rp" + kembali : "❌"}`;
  }).join("\n");

  const pesan = encodeURIComponent(`Transaksi excel-pro v3:\n${lines}`);
  window.open(`https://wa.me/62${nomor}?text=${pesan}`, "_blank");
}
