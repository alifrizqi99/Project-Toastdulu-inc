# TOAST,inc — Inventory & Finance Management System

Sistem Informasi Pengelolaan Stok Bahan dan Keuangan TOAST,inc merupakan aplikasi berbasis web yang dikembangkan untuk membantu UMKM TOAST,inc dalam mengelola persediaan bahan baku, supplier, pembelian, pemakaian bahan, serta pencatatan keuangan secara terstruktur.

## 📌 Project Overview

TOAST,inc merupakan UMKM yang bergerak di bidang penjualan sandwich. Sebelumnya, pencatatan persediaan bahan baku dan keuangan masih dilakukan secara manual menggunakan Microsoft Excel.

Sistem ini dikembangkan untuk menggantikan proses pencatatan tersebut melalui sebuah website internal yang dapat digunakan oleh admin untuk mengelola seluruh aktivitas operasional usaha.

## 🎯 Project Objectives

- Mempermudah pengelolaan data supplier.
- Mengelola data bahan baku berdasarkan kategori dan satuan.
- Mencatat pembelian dan pemakaian bahan.
- Memantau persediaan bahan secara otomatis.
- Memberikan peringatan ketika stok bahan menipis.
- Mengelola pemasukan dan pengeluaran usaha.
- Mengintegrasikan pembelian bahan dengan pencatatan pengeluaran.
- Menyediakan dashboard dan laporan keuangan.
- Meningkatkan akurasi dan efisiensi pengelolaan data.

## 🛠️ Technology Stack

| Technology | Description |
|---|---|
| Next.js | Full Stack Framework |
| React.js | Frontend Library |
| TypeScript | Programming Language |
| Tailwind CSS | Styling Framework |
| shadcn/ui | UI Components |
| MySQL | Database |
| Prisma ORM | Database ORM |
| DBeaver | Database Management |
| Zod | Data Validation |
| React Hook Form | Form Management |
| Recharts | Data Visualization |
| ExcelJS | Excel Export |
| jsPDF | PDF Export |
| Auth.js / Secure Session | Authentication |

## 📦 Main Features

### 1. Authentication
- Admin login.
- Session management.
- Logout.
- Protected routes.

### 2. Dashboard
- Total jenis bahan.
- Ringkasan persediaan.
- Informasi stok menipis.
- Total pemasukan.
- Total pengeluaran.
- Ringkasan laba/rugi.
- Grafik keuangan.
- Riwayat transaksi terbaru.

### 3. Supplier Management
- Tambah supplier.
- Edit supplier.
- Hapus supplier.
- Detail supplier.
- Penilaian tingkat keandalan supplier.

### 4. Ingredient Management
- Tambah bahan.
- Edit bahan.
- Hapus bahan.
- Kategori bahan.
- Satuan bahan.
- Stok tersedia.
- Batas minimum stok.

### 5. Purchase Management
- Pencatatan pembelian.
- Pemilihan supplier.
- Pemilihan bahan.
- Input jumlah pembelian.
- Input harga per satuan.
- Perhitungan subtotal dan total otomatis.
- Penambahan stok otomatis.
- Pencatatan pengeluaran otomatis.

### 6. Usage Management
- Pencatatan pemakaian bahan.
- Input jumlah pemakaian.
- Pengurangan stok otomatis.
- Validasi ketersediaan stok.
- Riwayat pemakaian.

### 7. Finance Management
- Pencatatan pemasukan.
- Pencatatan pengeluaran.
- Pengeluaran otomatis dari pembelian.
- Riwayat transaksi.
- Ringkasan keuangan.
- Perhitungan laba/rugi.

### 8. Reports
- Laporan stok bahan.
- Laporan pembelian.
- Laporan pemakaian.
- Laporan supplier.
- Laporan pemasukan.
- Laporan pengeluaran.
- Laporan laba/rugi.
- Export Excel.
- Export PDF.

### 9. Settings
- Pengaturan profil usaha.
- Pengaturan akun admin.
- Pengubahan password.
- Konfigurasi sistem.

## 🗂️ Project Structure

```text
toast-inc/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── public/
│   ├── images/
│   └── logo/
│
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── login/
│   │   │
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   ├── suppliers/
│   │   │   ├── ingredients/
│   │   │   ├── purchases/
│   │   │   ├── usages/
│   │   │   ├── finance/
│   │   │   ├── reports/
│   │   │   └── settings/
│   │   │
│   │   ├── api/
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── dashboard/
│   │   └── forms/
│   │
│   ├── actions/
│   ├── services/
│   ├── schemas/
│   ├── lib/
│   └── types/
│
├── .env
├── package.json
└── tsconfig.json
```

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd toast-inc
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Buat file `.env` pada root project.

```env
DATABASE_URL="mysql://username:password@localhost:3306/toast_inc"
```

Sesuaikan username, password, dan database MySQL dengan konfigurasi lokal.

Tambahkan environment variable lain sesuai kebutuhan autentikasi dan aplikasi.

### 4. Setup Prisma

```bash
npx prisma generate
```

Untuk membuat database migration:

```bash
npx prisma migrate dev --name init
```

### 5. Run Development Server

```bash
npm run dev
```

Buka browser:

```text
http://localhost:3000
```

## 🗄️ Database

Database menggunakan MySQL dengan Prisma ORM.

Rancangan entitas utama:

- User
- Supplier
- Category
- Unit
- Ingredient
- Purchase
- PurchaseDetail
- Usage
- UsageDetail
- Transaction

## 📊 Business Logic

### Stock Calculation

Stok akhir dihitung berdasarkan seluruh transaksi pembelian dan pemakaian yang valid.

```text
Stok Akhir = Total Pembelian - Total Pemakaian
```

### Purchase Calculation

```text
Subtotal = Jumlah × Harga Satuan

Total Pembelian = Total Seluruh Subtotal
```

### Finance Calculation

```text
Laba/Rugi Sederhana = Total Pemasukan - Total Pengeluaran
```

Catatan: Laporan laba/rugi akuntansi perlu memperhitungkan persediaan dan harga pokok penjualan secara terpisah dari arus kas.

## 🔐 Security

- Password disimpan menggunakan hashing.
- Validasi input pada frontend dan backend.
- Proteksi halaman internal.
- Environment variables tidak boleh dimasukkan ke repository.
- Gunakan transaksi database untuk operasi stok dan keuangan.
- Batasi akses database dan API sesuai kebutuhan autentikasi.

## 🚀 Development Status

Project masih dalam tahap pengembangan.

Lihat file [TODO.md](./TODO.md) untuk mengetahui daftar pekerjaan dan progres pengembangan.

## 👨‍💻 Project Information

**Project Name:** TOAST,inc

**Project Type:** Internal Web-Based Information System

**Category:** Inventory & Finance Management

**Framework:** Full Stack Next.js

**Database:** MySQL

**Access:** Internal Admin

---

*TOAST,inc — Inventory & Finance Management System.*