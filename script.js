let data = [
  {
    nama: "beras",
    qty: 10,
    harga: 10000,
    satuan: "kg",
    dibayar: 120000
  },
  {
    nama: "sabun",
    qty: 2,
    harga: 5000,
    satuan: "pcs",
    dibayar: 5000
  }
];

function hitung(row) {
  row.total = row.qty * row.harga;
  row.kembalian = row.dibayar >= row.total ? row.dibayar - row.total : "Uang kurang";
  return row;
}

function renderTable() {
  const tbody = document.getElementById("data-body");
  tbody.innerHTML = "";
  data.forEach((row, i) => {
    const hasil = hitung(row);
    const tr = document.createElement("tr");
    ["nama", "qty", "harga", "satuan", "total", "dibayar", "kembalian"].forEach(key => {
      const td = document.createElement("td");
      td.textContent = hasil[key];
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

function updateDashboard() {
  const totalTransaksi = data.length;
  const totalItem = data.reduce((sum, row) => sum + Number(row.qty || 0), 0);
  const totalOmset = data.reduce((sum, row) => sum + (row.qty * row.harga), 0);
  const uangKurang = data.filter(row => row.dibayar < row.qty * row.harga).length;

  document.getElementById("total-transaksi").textContent = totalTransaksi;
  document.getElementById("total-item").textContent = totalItem;
  document.getElementById("total-omset").textContent = totalOmset.toLocaleString("id-ID");
  document.getElementById("uang-kurang").textContent = uangKurang;
}

function simpanData() {
  const hasil = data.map(hitung);
  localStorage.setItem("excelProDB", JSON.stringify(hasil));
  const csv = convertToCSV(hasil);
  localStorage.setItem("excelProCSV", csv);

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  Swal.fire({
    title: "✅ Data Tersimpan",
    text: "transaksi.csv berhasil dibuat dan siap diunduh.",
    icon: "success",
    confirmButtonText: "📁 Download CSV"
  }).then(() => {
    const a = document.createElement("a");
    a.href = url;
    a.download = "transaksi.csv";
    a.click();
  });

  updateDashboard();
}

document.addEventListener("DOMContentLoaded", () => {
  renderTable();
  updateDashboard();
});


