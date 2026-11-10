"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatRupiah } from "@/lib/utils";
import {
  Plus,
  Search,
  TrendingUp,
  TrendingDown,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Edit2,
  Trash2,
  Receipt,
} from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  desc: string;
  category: string;
  type: "INCOME" | "EXPENSE";
  amount: number;
}

export default function FinancePage() {
  const { success, error } = useToast();

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "TRX-20261105-01",
      date: "05 Nov 2026",
      desc: "Penjualan Sandwich Reguler & Spesial",
      category: "PENJUALAN",
      type: "INCOME",
      amount: 450000,
    },
    {
      id: "TRX-20261105-02",
      date: "05 Nov 2026",
      desc: "Pembelian Bahan Roti Tawar & Gandum (PO-20261105-001)",
      category: "PEMBELIAN_BAHAN",
      type: "EXPENSE",
      amount: 450000,
    },
    {
      id: "TRX-20261104-03",
      date: "04 Nov 2026",
      desc: "Penjualan Catering Kantoran (30 Porsi)",
      category: "PENJUALAN",
      type: "INCOME",
      amount: 900000,
    },
    {
      id: "TRX-20261104-04",
      date: "04 Nov 2026",
      desc: "Listrik, Gas & Kebersihan Harian",
      category: "OPERASIONAL",
      type: "EXPENSE",
      amount: 85000,
    },
    {
      id: "TRX-20261103-05",
      date: "03 Nov 2026",
      desc: "Pembelian Keju & Dairy (PO-20261103-002)",
      category: "PEMBELIAN_BAHAN",
      type: "EXPENSE",
      amount: 850000,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"INCOME" | "EXPENSE">("INCOME");
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  // Form state
  const [trxId, setTrxId] = useState("");
  const [trxDate, setTrxDate] = useState("2026-11-05");
  const [trxCategory, setTrxCategory] = useState("PENJUALAN");
  const [trxDesc, setTrxDesc] = useState("");
  const [trxAmount, setTrxAmount] = useState<number | "">("");

  // Calculate live financial statistics
  const totalIncome = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((acc, curr) => acc + curr.amount, 7100000);
  const totalExpense = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((acc, curr) => acc + curr.amount, 3815000);
  const netProfit = totalIncome - totalExpense;
  const profitMargin =
    totalIncome > 0 ? ((netProfit / totalIncome) * 100).toFixed(1) : "0.0";

  const handleOpenAddModal = (type: "INCOME" | "EXPENSE") => {
    setModalType(type);
    const randomSuffix = Math.floor(10 + Math.random() * 90);
    setTrxId(`TRX-20261105-${randomSuffix}`);
    setTrxDate(new Date().toISOString().slice(0, 10));
    setTrxCategory(type === "INCOME" ? "PENJUALAN" : "OPERASIONAL");
    setTrxDesc("");
    setTrxAmount("");
    setIsAddModalOpen(true);
  };

  const handleOpenDetail = (trx: Transaction) => {
    setSelectedTransaction(trx);
    setIsDetailModalOpen(true);
  };

  const handleOpenEdit = (trx: Transaction) => {
    setSelectedTransaction(trx);
    setTrxId(trx.id);
    setTrxDate("2026-11-05");
    setTrxCategory(trx.category);
    setTrxDesc(trx.desc);
    setTrxAmount(trx.amount);
    setModalType(trx.type);
    setIsEditModalOpen(true);
  };

  const handleOpenDelete = (trx: Transaction) => {
    setSelectedTransaction(trx);
    setIsDeleteModalOpen(true);
  };

  const handleSaveTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trxId.trim()) {
      error("Gagal", "Nomor transaksi wajib diisi");
      return;
    }
    if (!trxDesc.trim()) {
      error("Gagal", "Keterangan transaksi wajib diisi");
      return;
    }
    const amountVal = Number(trxAmount);
    if (!amountVal || amountVal <= 0) {
      error("Gagal", "Nominal transaksi harus lebih dari 0");
      return;
    }

    const newTrx: Transaction = {
      id: trxId,
      date: new Date(trxDate).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      desc: trxDesc,
      category: trxCategory,
      type: modalType,
      amount: amountVal,
    };

    setTransactions([newTrx, ...transactions]);
    setIsAddModalOpen(false);
    success(
      modalType === "INCOME" ? "Pemasukan Dicatat" : "Pengeluaran Dicatat",
      `Transaksi ${trxId} senilai ${formatRupiah(amountVal)} berhasil tersimpan.`
    );
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTransaction) return;

    const amountVal = Number(trxAmount);
    if (!amountVal || amountVal <= 0) {
      error("Gagal", "Nominal transaksi harus lebih dari 0");
      return;
    }

    setTransactions((prev) =>
      prev.map((t) =>
        t.id === selectedTransaction.id
          ? {
              ...t,
              category: trxCategory,
              desc: trxDesc,
              type: modalType,
              amount: amountVal,
            }
          : t
      )
    );
    setIsEditModalOpen(false);
    success("Transaksi Diperbarui", `Data ${selectedTransaction.id} berhasil diperbarui.`);
  };

  const handleConfirmDelete = () => {
    if (!selectedTransaction) return;
    setTransactions((prev) => prev.filter((t) => t.id !== selectedTransaction.id));
    setIsDeleteModalOpen(false);
    success("Transaksi Dihapus", `Transaksi ${selectedTransaction.id} telah dihapus.`);
  };

  const filteredTransactions = transactions.filter(
    (trx) =>
      trx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trx.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trx.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header
        title="Manajemen Keuangan & Arus Kas"
        subtitle="Pantau pemasukan, pengeluaran operasional, integrasi pembelian bahan, dan perhitungan laba/rugi"
      />
      <div className="p-6 space-y-6 max-w-7xl">
        {/* Finance KPI cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-medium text-muted-foreground">
                Total Pemasukan
              </span>
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600">
                <TrendingUp className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">
                {formatRupiah(totalIncome)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Akumulasi penjualan sandwich
              </p>
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-medium text-muted-foreground">
                Total Pengeluaran
              </span>
              <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-600">
                <TrendingDown className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-rose-600">
                {formatRupiah(totalExpense)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Termasuk pembelian bahan & operasional
              </p>
            </CardContent>
          </Card>

          <Card className="border shadow-sm bg-gradient-to-br from-amber-500/10 via-card to-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-medium text-muted-foreground">
                Estimasi Laba Bersih
              </span>
              <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600">
                <Wallet className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">
                {formatRupiah(netProfit)}
              </div>
              <p className="text-xs text-emerald-600 font-medium mt-1">
                Margin Keuntungan: {profitMargin}%
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
            <Input
              placeholder="Cari transaksi / keterangan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => handleOpenAddModal("EXPENSE")}
              className="gap-2 text-rose-600 border-rose-200 hover:bg-rose-50 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Catat Pengeluaran
            </Button>
            <Button
              onClick={() => handleOpenAddModal("INCOME")}
              className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Catat Pemasukan
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">No</TableHead>
                  <TableHead>No. Transaksi</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead>Tipe</TableHead>
                  <TableHead className="text-right">Nominal</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      Tidak ada riwayat transaksi yang cocok.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((trx, idx) => {
                    const isIncome = trx.type === "INCOME";
                    return (
                      <TableRow key={trx.id}>
                        <TableCell className="font-medium text-muted-foreground">
                          {idx + 1}
                        </TableCell>
                        <TableCell className="font-mono text-xs font-semibold">
                          {trx.id}
                        </TableCell>
                        <TableCell className="text-xs">{trx.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[11px]">
                            {trx.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm font-medium">
                          {trx.desc}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                              isIncome
                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                                : "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
                            }`}
                          >
                            {isIncome ? (
                              <ArrowUpRight className="w-3 h-3" />
                            ) : (
                              <ArrowDownRight className="w-3 h-3" />
                            )}
                            {isIncome ? "Pemasukan" : "Pengeluaran"}
                          </span>
                        </TableCell>
                        <TableCell
                          className={`text-right font-bold ${
                            isIncome ? "text-emerald-600" : "text-rose-600"
                          }`}
                        >
                          {isIncome ? "+" : "-"} {formatRupiah(trx.amount)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="inline-flex items-center justify-end gap-1.5">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenDetail(trx)}
                              className="h-8 px-2.5 text-xs gap-1 border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                              title="Lihat Bukti Transaksi"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              Detail
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenEdit(trx)}
                              className="h-8 px-2.5 text-xs gap-1 border-amber-200 text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                              title="Edit Transaksi"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                              Edit
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenDelete(trx)}
                              className="h-8 px-2.5 text-xs gap-1 border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                              title="Hapus Transaksi"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Hapus
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Modal Detail Transaksi */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title={`Bukti Transaksi: ${selectedTransaction?.id}`}
        description="Rincian resmi pencatatan arus kas sistem TOAST,inc"
        maxWidth="md"
      >
        {selectedTransaction && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-muted/50 border flex items-center justify-between">
              <div>
                <span className="text-xs text-muted-foreground block">Tipe Arus Kas:</span>
                <span
                  className={`text-sm font-bold ${
                    selectedTransaction.type === "INCOME"
                      ? "text-emerald-600"
                      : "text-rose-600"
                  }`}
                >
                  {selectedTransaction.type === "INCOME"
                    ? "PEMASUKAN KAS"
                    : "PENGELUARAN KAS"}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-muted-foreground block">Nominal:</span>
                <span
                  className={`text-lg font-bold ${
                    selectedTransaction.type === "INCOME"
                      ? "text-emerald-600"
                      : "text-rose-600"
                  }`}
                >
                  {formatRupiah(selectedTransaction.amount)}
                </span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between p-2.5 bg-muted/40 rounded-lg">
                <span className="text-muted-foreground">Nomor Transaksi:</span>
                <span className="font-mono font-bold text-foreground">
                  {selectedTransaction.id}
                </span>
              </div>
              <div className="flex justify-between p-2.5 bg-muted/40 rounded-lg">
                <span className="text-muted-foreground">Tanggal Pencatatan:</span>
                <span className="font-semibold text-foreground">
                  {selectedTransaction.date}
                </span>
              </div>
              <div className="flex justify-between p-2.5 bg-muted/40 rounded-lg">
                <span className="text-muted-foreground">Kategori:</span>
                <Badge variant="outline">{selectedTransaction.category}</Badge>
              </div>
              <div className="p-2.5 bg-muted/40 rounded-lg space-y-1">
                <span className="text-muted-foreground block">Deskripsi / Keterangan:</span>
                <p className="font-medium text-foreground text-xs leading-relaxed">
                  {selectedTransaction.desc}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={() => setIsDetailModalOpen(false)}>Tutup</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Tambah Transaksi */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={
          modalType === "INCOME"
            ? "Catat Transaksi Pemasukan"
            : "Catat Transaksi Pengeluaran"
        }
        description={
          modalType === "INCOME"
            ? "Masukkan pemasukan hasil penjualan sandwich atau order catering"
            : "Masukkan pengeluaran operasional, bahan baku, atau biaya usaha lainnya"
        }
        maxWidth="lg"
      >
        <form onSubmit={handleSaveTransaction} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="trx-id">No. Transaksi *</Label>
              <Input
                id="trx-id"
                required
                value={trxId}
                onChange={(e) => setTrxId(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="trx-date">Tanggal Transaksi</Label>
              <Input
                id="trx-date"
                type="date"
                required
                value={trxDate}
                onChange={(e) => setTrxDate(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="trx-cat">Kategori Transaksi</Label>
              <select
                id="trx-cat"
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={trxCategory}
                onChange={(e) => setTrxCategory(e.target.value)}
              >
                {modalType === "INCOME" ? (
                  <>
                    <option value="PENJUALAN">Penjualan Harian Gerai</option>
                    <option value="CATERING">Pesanan Catering Kantoran</option>
                    <option value="EVENT">Event / Bazaar Kuliner</option>
                    <option value="LAINNYA">Pemasukan Lain-lain</option>
                  </>
                ) : (
                  <>
                    <option value="PEMBELIAN_BAHAN">Pembelian Bahan Baku</option>
                    <option value="OPERASIONAL">Operasional (Gas, Listrik, Air)</option>
                    <option value="KEMASAN">Kemasan & Packaging</option>
                    <option value="GAJI">Gaji & Upah Karyawan</option>
                    <option value="LAINNYA">Pengeluaran Lain-lain</option>
                  </>
                )}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="trx-amount">Nominal Transaksi (Rp) *</Label>
              <Input
                id="trx-amount"
                type="number"
                required
                min="1000"
                placeholder="Contoh: 250000"
                value={trxAmount}
                onChange={(e) =>
                  setTrxAmount(e.target.value ? parseFloat(e.target.value) : "")
                }
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="trx-desc">Keterangan / Deskripsi *</Label>
            <Input
              id="trx-desc"
              required
              placeholder={
                modalType === "INCOME"
                  ? "Contoh: Penjualan 20 sandwich reguler shift siang"
                  : "Contoh: Beli tabung gas LPG 3kg & sabun cuci"
              }
              value={trxDesc}
              onChange={(e) => setTrxDesc(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddModalOpen(false)}
            >
              Batal
            </Button>
            <Button
              type="submit"
              className={
                modalType === "INCOME"
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-rose-600 hover:bg-rose-700 text-white"
              }
            >
              {modalType === "INCOME" ? "Simpan Pemasukan" : "Simpan Pengeluaran"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Edit Transaksi */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Edit Transaksi: ${selectedTransaction?.id}`}
        description="Perbarui nominal, kategori, atau keterangan transaksi"
        maxWidth="lg"
      >
        <form onSubmit={handleSaveEdit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="edit-trx-cat">Kategori Transaksi</Label>
              <select
                id="edit-trx-cat"
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={trxCategory}
                onChange={(e) => setTrxCategory(e.target.value)}
              >
                {modalType === "INCOME" ? (
                  <>
                    <option value="PENJUALAN">Penjualan Harian Gerai</option>
                    <option value="CATERING">Pesanan Catering Kantoran</option>
                    <option value="EVENT">Event / Bazaar Kuliner</option>
                    <option value="LAINNYA">Pemasukan Lain-lain</option>
                  </>
                ) : (
                  <>
                    <option value="PEMBELIAN_BAHAN">Pembelian Bahan Baku</option>
                    <option value="OPERASIONAL">Operasional (Gas, Listrik, Air)</option>
                    <option value="KEMASAN">Kemasan & Packaging</option>
                    <option value="GAJI">Gaji & Upah Karyawan</option>
                    <option value="LAINNYA">Pengeluaran Lain-lain</option>
                  </>
                )}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-trx-amount">Nominal (Rp) *</Label>
              <Input
                id="edit-trx-amount"
                type="number"
                required
                min="1000"
                value={trxAmount}
                onChange={(e) =>
                  setTrxAmount(e.target.value ? parseFloat(e.target.value) : "")
                }
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-trx-desc">Keterangan / Deskripsi *</Label>
            <Input
              id="edit-trx-desc"
              required
              value={trxDesc}
              onChange={(e) => setTrxDesc(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              Perbarui Transaksi
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Hapus Transaksi */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Hapus Catatan Transaksi"
        description="Apakah Anda yakin ingin menghapus transaksi ini? Total keuangan akan disesuaikan otomatis."
        maxWidth="sm"
      >
        <div className="py-2 text-xs space-y-1">
          <p className="font-semibold text-sm text-foreground">
            {selectedTransaction?.id}
          </p>
          <p className="text-muted-foreground">
            {selectedTransaction?.desc} • {selectedTransaction && formatRupiah(selectedTransaction.amount)}
          </p>
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
            Batal
          </Button>
          <Button variant="destructive" onClick={handleConfirmDelete}>
            Hapus Transaksi
          </Button>
        </div>
      </Modal>
    </>
  );
}
