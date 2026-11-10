"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
  Eye,
  Edit2,
  Trash2,
  ShoppingBag,
  Calendar,
  UserCheck,
} from "lucide-react";

interface PurchaseItemDetail {
  ingredient: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  subtotal: number;
}

interface Purchase {
  id: number;
  invoice: string;
  date: string;
  supplier: string;
  totalItems: number;
  totalAmount: number;
  status: string;
  notes: string;
  items: PurchaseItemDetail[];
}

export default function PurchasesPage() {
  const { success, error } = useToast();

  const [purchases, setPurchases] = useState<Purchase[]>([
    {
      id: 1,
      invoice: "PO-20261105-001",
      date: "05 Nov 2026",
      supplier: "CV Bakery Prima Jaya",
      totalItems: 2,
      totalAmount: 450000,
      status: "SELESAI",
      notes: "Restock roti tawar & gandum untuk akhir pekan",
      items: [
        { ingredient: "Roti Tawar Premium", quantity: 15, unit: "Pack", unitPrice: 18000, subtotal: 270000 },
        { ingredient: "Roti Tawar Gandum", quantity: 8, unit: "Pack", unitPrice: 22500, subtotal: 180000 },
      ],
    },
    {
      id: 2,
      invoice: "PO-20261103-002",
      date: "03 Nov 2026",
      supplier: "PT Dairy Sejahtera",
      totalItems: 3,
      totalAmount: 850000,
      status: "SELESAI",
      notes: "Keju slice dan mozzarella",
      items: [
        { ingredient: "Keju Cheddar Slice", quantity: 20, unit: "Pack", unitPrice: 26000, subtotal: 520000 },
        { ingredient: "Keju Mozzarella Grated", quantity: 3, unit: "Kg", unitPrice: 95000, subtotal: 285000 },
        { ingredient: "Salted Butter Premium", quantity: 1, unit: "Pack", unitPrice: 45000, subtotal: 45000 },
      ],
    },
    {
      id: 3,
      invoice: "PO-20261101-003",
      date: "01 Nov 2026",
      supplier: "Mitra Daging Mandiri",
      totalItems: 1,
      totalAmount: 1100000,
      status: "SELESAI",
      notes: "Daging smoked beef 10 kg",
      items: [
        { ingredient: "Smoked Beef", quantity: 10, unit: "Kg", unitPrice: 110000, subtotal: 1100000 },
      ],
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);

  // Form state
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("2026-11-05");
  const [supplierName, setSupplierName] = useState("CV Bakery Prima Jaya");
  const [notes, setNotes] = useState("");
  const [formItems, setFormItems] = useState<PurchaseItemDetail[]>([
    { ingredient: "Roti Tawar Premium", quantity: 10, unit: "Pack", unitPrice: 18000, subtotal: 180000 },
  ]);

  const suppliersList = [
    "CV Bakery Prima Jaya",
    "PT Dairy Sejahtera",
    "Toko Sayur Segar Berkah",
    "Mitra Daging Mandiri",
  ];

  const availableIngredients = [
    { name: "Roti Tawar Premium", unit: "Pack", defaultPrice: 18000 },
    { name: "Roti Tawar Gandum", unit: "Pack", defaultPrice: 22000 },
    { name: "Keju Cheddar Slice", unit: "Pack", defaultPrice: 26000 },
    { name: "Smoked Beef", unit: "Kg", defaultPrice: 110000 },
    { name: "Saus Barbeque Special", unit: "Botol", defaultPrice: 32000 },
    { name: "Selada Keriting", unit: "Kg", defaultPrice: 24000 },
  ];

  const handleOpenAdd = () => {
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    setInvoiceNumber(`PO-20261105-${randomSuffix}`);
    setPurchaseDate(new Date().toISOString().slice(0, 10));
    setSupplierName(suppliersList[0]);
    setNotes("");
    setFormItems([
      { ingredient: "Roti Tawar Premium", quantity: 10, unit: "Pack", unitPrice: 18000, subtotal: 180000 },
    ]);
    setIsAddOpen(true);
  };

  const handleOpenDetail = (p: Purchase) => {
    setSelectedPurchase(p);
    setIsDetailOpen(true);
  };

  const handleOpenEdit = (p: Purchase) => {
    setSelectedPurchase(p);
    setInvoiceNumber(p.invoice);
    setSupplierName(p.supplier);
    setNotes(p.notes);
    setFormItems([...p.items]);
    setIsEditOpen(true);
  };

  const handleOpenDelete = (p: Purchase) => {
    setSelectedPurchase(p);
    setIsDeleteOpen(true);
  };

  const handleAddItemRow = () => {
    const defaultIng = availableIngredients[0];
    setFormItems([
      ...formItems,
      {
        ingredient: defaultIng.name,
        quantity: 1,
        unit: defaultIng.unit,
        unitPrice: defaultIng.defaultPrice,
        subtotal: defaultIng.defaultPrice * 1,
      },
    ]);
  };

  const handleRemoveItemRow = (index: number) => {
    if (formItems.length === 1) {
      error("Perhatian", "Pembelian harus memiliki minimal 1 item");
      return;
    }
    setFormItems(formItems.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: keyof PurchaseItemDetail, value: any) => {
    const updated = [...formItems];
    const item = { ...updated[index] };

    if (field === "ingredient") {
      item.ingredient = value;
      const matched = availableIngredients.find((ing) => ing.name === value);
      if (matched) {
        item.unit = matched.unit;
        item.unitPrice = matched.defaultPrice;
        item.subtotal = item.quantity * matched.defaultPrice;
      }
    } else if (field === "quantity") {
      item.quantity = Math.max(0, parseFloat(value) || 0);
      item.subtotal = item.quantity * item.unitPrice;
    } else if (field === "unitPrice") {
      item.unitPrice = Math.max(0, parseFloat(value) || 0);
      item.subtotal = item.quantity * item.unitPrice;
    }

    updated[index] = item;
    setFormItems(updated);
  };

  const totalCalculatedAmount = formItems.reduce((acc, curr) => acc + curr.subtotal, 0);

  const handleSavePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invoiceNumber.trim()) {
      error("Gagal", "Nomor invoice wajib diisi");
      return;
    }
    if (formItems.length === 0) {
      error("Gagal", "Minimal harus ada satu item pembelian");
      return;
    }

    const newPurchase: Purchase = {
      id: Math.max(0, ...purchases.map((p) => p.id)) + 1,
      invoice: invoiceNumber,
      date: new Date(purchaseDate).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      supplier: supplierName,
      totalItems: formItems.length,
      totalAmount: totalCalculatedAmount,
      status: "SELESAI",
      notes: notes || "Restock pembelian bahan baku",
      items: formItems,
    };

    setPurchases([newPurchase, ...purchases]);
    setIsAddOpen(false);
    success(
      "Pembelian Berhasil Dicatat",
      `Invoice ${invoiceNumber} dengan total ${formatRupiah(totalCalculatedAmount)} tersimpan.`
    );
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPurchase) return;

    setPurchases((prev) =>
      prev.map((p) =>
        p.id === selectedPurchase.id
          ? {
              ...p,
              invoice: invoiceNumber,
              supplier: supplierName,
              notes: notes,
              items: formItems,
              totalItems: formItems.length,
              totalAmount: totalCalculatedAmount,
            }
          : p
      )
    );
    setIsEditOpen(false);
    success("Pembelian Diperbarui", `Invoice ${invoiceNumber} berhasil diperbarui.`);
  };

  const handleConfirmDelete = () => {
    if (!selectedPurchase) return;
    setPurchases((prev) => prev.filter((p) => p.id !== selectedPurchase.id));
    setIsDeleteOpen(false);
    success("Pembelian Dihapus", `Invoice ${selectedPurchase.invoice} berhasil dibatalkan.`);
  };

  const filteredPurchases = purchases.filter(
    (p) =>
      p.invoice.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.notes.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header
        title="Pembelian Bahan Baku"
        subtitle="Catat pengadaan bahan, penambahan stok otomatis, dan integrasi pengeluaran keuangan"
      />
      <div className="p-6 space-y-6 max-w-7xl">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
            <Input
              placeholder="Cari nomor invoice / supplier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          <Button
            onClick={handleOpenAdd}
            className="gap-2 bg-amber-600 hover:bg-amber-700 text-white shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Catat Pembelian Baru
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">No</TableHead>
                  <TableHead>No. Invoice</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Jumlah Item</TableHead>
                  <TableHead>Total Pembelian</TableHead>
                  <TableHead>Status Stok & Biaya</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPurchases.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      Tidak ada riwayat pembelian yang sesuai.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPurchases.map((item, idx) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium text-muted-foreground">
                        {idx + 1}
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-foreground font-mono">
                          {item.invoice}
                        </span>
                        <p className="text-xs text-muted-foreground truncate max-w-xs mt-0.5">
                          {item.notes}
                        </p>
                      </TableCell>
                      <TableCell className="text-sm">{item.date}</TableCell>
                      <TableCell className="font-medium">{item.supplier}</TableCell>
                      <TableCell>
                        <span className="text-xs font-semibold bg-muted px-2 py-1 rounded">
                          {item.totalItems} Bahan
                        </span>
                      </TableCell>
                      <TableCell className="font-bold text-foreground">
                        {formatRupiah(item.totalAmount)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="success" className="text-[11px]">
                          Stok + Pengeluaran Terhubung
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="inline-flex items-center justify-end gap-1.5">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenDetail(item)}
                            className="h-8 px-2.5 text-xs gap-1 border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                            title="Lihat Rincian Invoice"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Detail
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenEdit(item)}
                            className="h-8 px-2.5 text-xs gap-1 border-amber-200 text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                            title="Edit Invoice"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            Edit
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenDelete(item)}
                            className="h-8 px-2.5 text-xs gap-1 border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                            title="Batalkan / Hapus Transaksi"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Hapus
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Modal Detail Pembelian */}
      <Modal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        title={`Rincian Invoice: ${selectedPurchase?.invoice}`}
        description="Detail daftar bahan, harga satuan, dan supplier pengadaan"
        maxWidth="2xl"
      >
        {selectedPurchase && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-muted/50 rounded-lg text-xs">
              <div>
                <span className="text-muted-foreground block">Tanggal:</span>
                <span className="font-semibold text-foreground">{selectedPurchase.date}</span>
              </div>
              <div>
                <span className="text-muted-foreground block">Supplier:</span>
                <span className="font-semibold text-foreground">{selectedPurchase.supplier}</span>
              </div>
              <div>
                <span className="text-muted-foreground block">Jumlah Item:</span>
                <span className="font-semibold text-foreground">
                  {selectedPurchase.totalItems} Bahan
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block">Status:</span>
                <Badge variant="success" className="text-[10px] mt-0.5">
                  {selectedPurchase.status}
                </Badge>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="text-xs">Bahan Baku</TableHead>
                    <TableHead className="text-xs text-center">Jumlah</TableHead>
                    <TableHead className="text-xs text-right">Harga Satuan</TableHead>
                    <TableHead className="text-xs text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedPurchase.items.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium text-xs">
                        {row.ingredient}
                      </TableCell>
                      <TableCell className="text-xs text-center">
                        {row.quantity} {row.unit}
                      </TableCell>
                      <TableCell className="text-xs text-right">
                        {formatRupiah(row.unitPrice)}
                      </TableCell>
                      <TableCell className="text-xs text-right font-bold">
                        {formatRupiah(row.subtotal)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-amber-500/5 font-bold">
                    <TableCell colSpan={3} className="text-right text-xs">
                      Total Pembelian:
                    </TableCell>
                    <TableCell className="text-right text-sm text-amber-600">
                      {formatRupiah(selectedPurchase.totalAmount)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="text-xs bg-muted/40 p-3 rounded-lg">
              <span className="font-semibold block text-foreground">Catatan / Keterangan:</span>
              <p className="text-muted-foreground mt-0.5">{selectedPurchase.notes}</p>
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={() => setIsDetailOpen(false)}>Tutup</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Catat Pembelian Baru */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Catat Transaksi Pembelian Bahan Baku"
        description="Pilih supplier, masukkan daftar bahan, jumlah pembelian, dan harga per satuan"
        maxWidth="3xl"
      >
        <form onSubmit={handleSavePurchase} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="inv-no">Nomor Invoice *</Label>
              <Input
                id="inv-no"
                required
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="inv-date">Tanggal Transaksi</Label>
              <Input
                id="inv-date"
                type="date"
                required
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="inv-sup">Supplier Mitra</Label>
              <select
                id="inv-sup"
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
              >
                {suppliersList.map((sup) => (
                  <option key={sup} value={sup}>
                    {sup}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Daftar Bahan Yang Dibeli</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddItemRow}
                className="gap-1 h-7 text-xs"
              >
                <Plus className="w-3 h-3" />
                Tambah Bahan
              </Button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {formItems.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2.5 rounded-lg border bg-muted/40"
                >
                  <div className="flex-1">
                    <select
                      className="w-full h-8 rounded-md border border-input bg-background px-2 text-xs"
                      value={item.ingredient}
                      onChange={(e) => handleItemChange(index, "ingredient", e.target.value)}
                    >
                      {availableIngredients.map((ing) => (
                        <option key={ing.name} value={ing.name}>
                          {ing.name} ({ing.unit})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-24">
                    <Input
                      type="number"
                      step="any"
                      min="0.1"
                      placeholder="Qty"
                      className="h-8 text-xs"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                    />
                  </div>
                  <div className="w-32">
                    <Input
                      type="number"
                      min="0"
                      placeholder="Harga"
                      className="h-8 text-xs"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(index, "unitPrice", e.target.value)}
                    />
                  </div>
                  <div className="w-32 text-right font-semibold text-xs py-1.5 px-2 bg-background rounded border">
                    {formatRupiah(item.subtotal)}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveItemRow(index)}
                    className="p-1.5 text-muted-foreground hover:text-rose-600 rounded"
                    title="Hapus baris"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <span className="text-sm font-semibold text-amber-900 dark:text-amber-300">
                Total Nilai Pembelian:
              </span>
              <span className="text-lg font-bold text-amber-600">
                {formatRupiah(totalCalculatedAmount)}
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="inv-notes">Catatan Pembelian</Label>
            <Input
              id="inv-notes"
              placeholder="Contoh: Pembelian rutin stok mingguan..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
              Batal
            </Button>
            <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">
              Simpan Pembelian
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Edit Pembelian */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title={`Edit Invoice Pembelian: ${invoiceNumber}`}
        description="Perbarui informasi supplier, catatan, atau rincian item pembelian"
        maxWidth="3xl"
      >
        <form onSubmit={handleSaveEdit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="edit-inv-no">Nomor Invoice</Label>
              <Input
                id="edit-inv-no"
                required
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-inv-sup">Supplier Mitra</Label>
              <select
                id="edit-inv-sup"
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
              >
                {suppliersList.map((sup) => (
                  <option key={sup} value={sup}>
                    {sup}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Daftar Bahan Yang Dibeli</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddItemRow}
                className="gap-1 h-7 text-xs"
              >
                <Plus className="w-3 h-3" />
                Tambah Bahan
              </Button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {formItems.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2.5 rounded-lg border bg-muted/40"
                >
                  <div className="flex-1">
                    <select
                      className="w-full h-8 rounded-md border border-input bg-background px-2 text-xs"
                      value={item.ingredient}
                      onChange={(e) => handleItemChange(index, "ingredient", e.target.value)}
                    >
                      {availableIngredients.map((ing) => (
                        <option key={ing.name} value={ing.name}>
                          {ing.name} ({ing.unit})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-24">
                    <Input
                      type="number"
                      step="any"
                      min="0.1"
                      className="h-8 text-xs"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                    />
                  </div>
                  <div className="w-32">
                    <Input
                      type="number"
                      min="0"
                      className="h-8 text-xs"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(index, "unitPrice", e.target.value)}
                    />
                  </div>
                  <div className="w-32 text-right font-semibold text-xs py-1.5 px-2 bg-background rounded border">
                    {formatRupiah(item.subtotal)}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveItemRow(index)}
                    className="p-1.5 text-muted-foreground hover:text-rose-600 rounded"
                    title="Hapus baris"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <span className="text-sm font-semibold text-amber-900 dark:text-amber-300">
                Total Nilai Pembelian:
              </span>
              <span className="text-lg font-bold text-amber-600">
                {formatRupiah(totalCalculatedAmount)}
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-inv-notes">Catatan Pembelian</Label>
            <Input
              id="edit-inv-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
              Batal
            </Button>
            <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">
              Simpan Perubahan
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Hapus Pembelian */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Batalkan & Hapus Transaksi Pembelian"
        description="Apakah Anda yakin ingin membatalkan transaksi pembelian ini? Penambahan stok yang terkait akan ditarik kembali."
        maxWidth="sm"
      >
        <div className="py-2 text-xs space-y-1">
          <p className="font-semibold text-sm text-foreground">
            {selectedPurchase?.invoice}
          </p>
          <p className="text-muted-foreground">
            Supplier: {selectedPurchase?.supplier} • Total: {selectedPurchase && formatRupiah(selectedPurchase.totalAmount)}
          </p>
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
            Batal
          </Button>
          <Button variant="destructive" onClick={handleConfirmDelete}>
            Hapus Pembelian
          </Button>
        </div>
      </Modal>
    </>
  );
}
