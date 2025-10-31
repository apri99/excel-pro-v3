excel-pro v3: Aplikasi Kasir Modular ala Excel
==============================================

📦 Struktur Folder
------------------
excel-pro-v3/
├── index.html             → Tampilan utama aplikasi
├── style.css              → Styling responsif untuk Windows & tablet
├── script.js              → Logika kasir: tambah, hapus, simpan, validasi
├── manifest.json          → Konfigurasi PWA
├── service-worker.js      → Cache & offline mode
├── assets/
│   ├── logo.png           → Branding toko
│   └── favicon.ico        → Ikon browser
├── utils/
│   ├── export-csv.js      → Export transaksi ke CSV
│   └── sync-wa.js         → Kirim data ke WhatsApp
└── README.txt             → Dokumentasi & SOP tim

🧩 Fitur Utama
--------------
- Grid 8 kolom: ✔ Nama, Qty, Harga, Satuan, Total, Dibayar, Kembalian
- Validasi otomatis per baris
- LocalStorage modular
- Sync ke WhatsApp (nomor editable)
- Export CSV
- PWA stabil & offline-ready
- Branding kanan atas: 4pri@disamsu

🛠️ Cara Pakai
-------------
1. Salin semua file ke Notepad++
2. Simpan dalam folder bernama `excel-pro-v3`
3. Zip folder tersebut
4. Upload ke Netlify
5. Buka di browser dan install sebagai PWA

🔄 SOP Reset & Backup
---------------------
- Reset data transaksi:
  Buka console browser dan jalankan:
  `localStorage.removeItem("excelProDB")`

- Backup transaksi:
  Klik tombol "📄 CSV" untuk unduh file `transaksi.csv`

📤 WhatsApp Sync
----------------
- Klik tombol "📤 WA"
- Masukkan nomor tujuan (tanpa +62)
- Pesan akan terbuka di tab baru

🧼 Prinsip Modular
------------------
- Semua file terpisah dan inheritable
- Tidak ada library eksternal
- Siap diaudit, diajarkan, dan diwariskan ke tim
