# TOAST,inc — Development TODO

Daftar pekerjaan pengembangan website TOAST,inc menggunakan Full Stack Next.js, TypeScript, Prisma, dan MySQL.

Status awal seluruh pekerjaan: Not Started.

## Phase 1 — System Analysis & Planning

- [ ] Analisis kebutuhan fungsional.
- [ ] Analisis kebutuhan nonfungsional.
- [ ] Identifikasi aktor dan hak akses.
- [ ] Membuat Use Case Diagram.
- [ ] Membuat Activity Diagram.
- [ ] Membuat Flowchart Sistem.
- [ ] Membuat Entity Relationship Diagram (ERD).
- [ ] Merancang struktur database.
- [ ] Menentukan business logic setiap modul.

## Phase 2 — Project Setup

- [x] Membuat project Next.js.
- [x] Mengaktifkan TypeScript.
- [x] Mengonfigurasi App Router.
- [x] Mengonfigurasi Tailwind CSS.
- [x] Instalasi shadcn/ui.
- [x] Instalasi Prisma ORM.
- [x] Instalasi Zod.
- [x] Instalasi React Hook Form.
- [x] Konfigurasi MySQL.
- [x] Menghubungkan Prisma dengan MySQL.
- [x] Membuat struktur folder project.
- [x] Memastikan project berjalan.

## Phase 3 — Database Development

- [x] Membuat model User.
- [x] Membuat model Supplier.
- [x] Membuat model Category.
- [x] Membuat model Unit.
- [x] Membuat model Ingredient.
- [x] Membuat model Purchase.
- [x] Membuat model PurchaseDetail.
- [x] Membuat model Usage.
- [x] Membuat model UsageDetail.
- [x] Membuat model Transaction.
- [x] Menentukan seluruh relasi database.
- [ ] Membuat migration.
- [ ] Memeriksa database menggunakan DBeaver.
- [x] Membuat seed data awal.

## Phase 4 — UI/UX Development

- [x] Membuat desain halaman Login.
- [x] Membuat layout Dashboard.
- [x] Membuat Sidebar.
- [x] Membuat Header.
- [x] Membuat navigasi halaman.
- [x] Membuat reusable DataTable.
- [x] Membuat reusable Form.
- [x] Membuat reusable Modal.
- [x] Membuat komponen Alert dan Badge.
- [x] Membuat desain responsif.
- [x] Menyesuaikan konsistensi desain seluruh halaman.

## Phase 5 — Authentication

- [ ] Membuat halaman Login.
- [ ] Membuat validasi form login.
- [ ] Mengintegrasikan autentikasi dengan database.
- [ ] Mengimplementasikan password hashing.
- [ ] Mengimplementasikan session.
- [ ] Membuat fungsi Logout.
- [ ] Melindungi halaman internal.
- [ ] Menguji autentikasi.

## Phase 6 — Dashboard Module

- [ ] Menampilkan total jenis bahan.
- [ ] Menampilkan ringkasan stok.
- [ ] Menampilkan stok menipis.
- [ ] Menampilkan total pemasukan.
- [ ] Menampilkan total pengeluaran.
- [ ] Menampilkan ringkasan laba/rugi.
- [ ] Membuat grafik keuangan.
- [ ] Menampilkan riwayat pembelian.
- [ ] Menampilkan riwayat pemakaian.
- [ ] Mengintegrasikan seluruh data dengan database.

## Phase 7 — Supplier Module

- [x] Membuat halaman daftar supplier.
- [x] Membuat form tambah supplier.
- [x] Membuat fitur edit supplier.
- [x] Membuat fitur hapus supplier.
- [x] Membuat halaman detail supplier.
- [x] Membuat fitur tingkat keandalan supplier.
- [x] Membuat pencarian supplier.
- [x] Membuat filter supplier.
- [ ] Mengintegrasikan CRUD dengan database.

## Phase 8 — Ingredient Module

- [x] Membuat halaman daftar bahan.
- [x] Membuat form tambah bahan.
- [x] Membuat fitur edit bahan.
- [x] Membuat fitur hapus bahan.
- [x] Membuat manajemen kategori.
- [x] Membuat manajemen satuan.
- [x] Menentukan stok minimum.
- [x] Menampilkan stok tersedia.
- [x] Menampilkan nilai stok.
- [x] Membuat pencarian dan filter.
- [ ] Mengintegrasikan dengan database.

## Phase 9 — Purchase Module

- [x] Membuat halaman daftar pembelian.
- [x] Membuat form pembelian.
- [x] Membuat pemilihan supplier.
- [x] Membuat pemilihan bahan.
- [x] Mendukung beberapa bahan dalam satu transaksi.
- [x] Membuat input jumlah pembelian.
- [x] Membuat input harga per satuan.
- [x] Membuat perhitungan subtotal otomatis.
- [x] Membuat perhitungan total otomatis.
- [x] Menyimpan riwayat pembelian.
- [ ] Mengintegrasikan pembelian dengan stok.
- [ ] Mengintegrasikan pembelian dengan keuangan.
- [ ] Mencegah pencatatan pengeluaran ganda.
- [ ] Menguji transaksi database.

## Phase 10 — Usage Module

- [x] Membuat halaman daftar pemakaian.
- [x] Membuat form pemakaian.
- [x] Membuat pemilihan bahan.
- [x] Membuat input jumlah pemakaian.
- [x] Membuat input tanggal.
- [x] Membuat input keterangan.
- [x] Membuat validasi ketersediaan stok.
- [ ] Mengurangi stok secara otomatis.
- [ ] Mencegah stok negatif.
- [x] Membuat riwayat pemakaian.
- [x] Membuat peringatan stok minimum.

## Phase 11 — Finance Module

- [x] Membuat halaman keuangan.
- [x] Membuat pencatatan pemasukan.
- [x] Membuat pencatatan pengeluaran.
- [x] Membuat kategori transaksi.
- [ ] Mengintegrasikan pembelian sebagai pengeluaran otomatis.
- [x] Membuat riwayat transaksi.
- [x] Membuat filter transaksi.
- [x] Menghitung total pemasukan.
- [x] Menghitung total pengeluaran.
- [x] Membuat ringkasan arus kas.
- [x] Membuat perhitungan laba/rugi.
- [ ] Memastikan tidak ada transaksi ganda.

## Phase 12 — Report Module

- [ ] Membuat laporan stok.
- [ ] Membuat laporan pembelian.
- [ ] Membuat laporan pemakaian.
- [ ] Membuat laporan supplier.
- [ ] Membuat laporan pemasukan.
- [ ] Membuat laporan pengeluaran.
- [ ] Membuat laporan laba/rugi.
- [ ] Membuat filter periode.
- [ ] Membuat filter kategori.
- [ ] Membuat filter supplier.
- [x] Implementasi ekspor Excel menggunakan ExcelJS.
- [x] Implementasi ekspor PDF menggunakan jsPDF.
- [x] Menguji hasil ekspor.

## Phase 13 — Settings Module

- [ ] Membuat halaman pengaturan.
- [ ] Membuat pengaturan profil usaha.
- [ ] Membuat pengaturan akun admin.
- [ ] Membuat fitur ubah password.
- [ ] Membuat konfigurasi sistem.
- [ ] Mengintegrasikan pengaturan dengan database.

## Phase 14 — Integration & Testing

- [ ] Menguji seluruh modul.
- [ ] Menguji seluruh CRUD.
- [ ] Menguji autentikasi.
- [ ] Menguji integrasi pembelian dan stok.
- [ ] Menguji integrasi pemakaian dan stok.
- [ ] Menguji integrasi pembelian dan keuangan.
- [ ] Menguji perhitungan nilai stok.
- [ ] Menguji peringatan stok minimum.
- [ ] Menguji dashboard.
- [ ] Menguji laporan.
- [ ] Menguji ekspor Excel.
- [ ] Menguji ekspor PDF.
- [ ] Menguji validasi input.
- [ ] Menguji keamanan akses.
- [ ] Melakukan Black Box Testing.
- [ ] Memperbaiki bug.
- [ ] Melakukan pengujian ulang.

## Phase 15 — Deployment

- [ ] Menyiapkan server production.
- [ ] Mengonfigurasi environment production.
- [ ] Menyiapkan database production.
- [ ] Melakukan database migration.
- [ ] Melakukan build Next.js.
- [ ] Mengonfigurasi domain.
- [ ] Mengaktifkan SSL/HTTPS.
- [ ] Melakukan pengujian production.
- [ ] Menyiapkan backup database.
- [ ] Membuat dokumentasi penggunaan.
- [ ] Melakukan implementasi kepada admin TOAST,inc.

---

## Development Notes

**Development Rules:**

1. Kerjakan setiap phase secara berurutan.
2. Pastikan setiap fitur berjalan sebelum berpindah ke phase berikutnya.
3. Jangan menghapus fitur yang telah selesai.
4. Gunakan TypeScript secara konsisten.
5. Gunakan Prisma untuk pengelolaan database.
6. Gunakan Zod untuk validasi input.
7. Gunakan database transaction untuk proses yang melibatkan beberapa perubahan data.
8. Hindari penggunaan dummy data pada fitur final.
9. Perbarui checklist setelah setiap pekerjaan selesai.
10. Catat setiap perubahan penting pada project.

**Project Status:** In Development

**Framework:** Next.js Full Stack

**Database:** MySQL

**ORM:** Prisma