let data = [
  {
    nama: "beras",
    qty: 10,
    harga: 10000,
    satuan: "kg",
    total: 100000,
    dibayar: 120000,
    kembalian: 20000
  },
  {
    nama: "sabun",
    qty: 2,
    harga: 5000,
    satuan: "pcs",
    total: 10000,
    dibayar: 5000,
    kembalian: "Uang kurang"
  }
];

function renderTable() {
  const tbody = document.getElementById("data-body");
  tbody.innerHTML = "";
  data.forEach(row => {
    const tr = document.createElement("tr");
    Object.values(row).forEach(val => {
      const td = document.createElement("td");
      td.textContent = val;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

function updateDashboard() {
  const totalTransaksi = data.length;
  const totalItem = data.reduce((sum, row) => sum + Number(row.qty || 0), 0);
  const totalOmset = data.reduce((sum, row) => sum + Number(row.total || 0), 0);
  const uangKurang = data.filter(row => String(row.kembalian).toLowerCase().includes("kurang")).length;

  document.getElementById("total-transaksi").textContent = totalTransaksi;
  document.getElementById("total-item").textContent = totalItem;
  document.getElementById("total-omset").textContent = totalOmset.toLocaleString("id-ID");
  document.getElementById("uang-kurang").textContent = uangKurang;
}

function simpanData() {
  localStorage.setItem("excelProDB", JSON.stringify(data));
  const csv = convertToCSV(data);
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
