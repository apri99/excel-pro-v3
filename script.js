let db = JSON.parse(localStorage.getItem("excelProDB")) || {
  transaksi: [
    { nama: "beras", qty: 10, harga: 10000, satuan: "kg", dibayar: 120000 },
    { nama: "mie instan", qty: 5, harga: 3000, satuan: "bungkus", dibayar: 15000 },
    { nama: "sabun", qty: 2, harga: 5000, satuan: "pcs", dibayar: 5000 }
  ]
};

function renderGrid() {
  const grid = document.getElementById("kasir-grid");
  grid.innerHTML = "";

  db.transaksi.forEach((item, i) => {
    const total = item.qty * item.harga;
    const kembali = item.dibayar - total;
    grid.innerHTML += `
      <div class="row">
        <input type="checkbox" data-index="${i}" />
        <div>${item.nama}</div>
        <div>${item.qty}</div>
        <div>${item.harga}</div>
        <div>${item.satuan}</div>
        <div>${total}</div>
        <input type="number" value="${item.dibayar}" onchange="updateBayar(${i}, this.value)" />
        <div>${kembali >= 0 ? kembali : "Uang kurang!"}</div>
      </div>
    `;
  });

  autoExportCSV();
}

function updateBayar(index, val) {
  db.transaksi[index].dibayar = parseInt(val);
  localStorage.setItem("excelProDB", JSON.stringify(db));
  renderGrid();
}

function addRow() {
  const nama = prompt("Nama barang:");
  const qty = parseInt(prompt("Qty:"));
  const harga = parseInt(prompt("Harga:"));
  const satuan = prompt("Satuan (kg/pcs/bungkus):");
  const dibayar = parseInt(prompt("Uang dibayar:"));
  if (!nama || isNaN(qty) || isNaN(harga) || !satuan || isNaN(dibayar)) {
    alert("Data tidak valid.");
    return;
  }
  db.transaksi.push({ nama, qty, harga, satuan, dibayar });
  localStorage.setItem("excelProDB", JSON.stringify(db));
  renderGrid();
}

function deleteSelected() {
  const checks = document.querySelectorAll("input[type=checkbox]:checked");
  const indexes = Array.from(checks).map(c => parseInt(c.dataset.index));
  db.transaksi = db.transaksi.filter((_, i) => !indexes.includes(i));
  localStorage.setItem("excelProDB", JSON.stringify(db));
  renderGrid();
}

function autoExportCSV() {
  let csv = "Nama,Qty,Harga,Satuan,Total,Dibayar,Kembalian\n";
  db.transaksi.forEach(t => {
    const total = t.qty * t.harga;
    const kembali = t.dibayar - total;
    csv += `${t.nama},${t.qty},${t.harga},${t.satuan},${total},${t.dibayar},${kembali >= 0 ? kembali : "Uang kurang"}\n`;
  });
  localStorage.setItem("excelProCSV", csv);
}

function downloadBackup() {
  const csv = localStorage.getItem("excelProCSV");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "transaksi.csv";
  a.click();
}

renderGrid();
