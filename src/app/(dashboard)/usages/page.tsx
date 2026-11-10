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
import {
  Plus,
  Search,
  CookingPot,
  Eye,
  Edit2,
  Trash2,
} from "lucide-react";

interface UsageDetailItem {
  ingredient: string;
  quantity: number;
  unit: string;
}

interface Usage {
  id: number;
  code: string;
  date: string;
  totalItems: number;
  notes: string;
  operator: string;
  items: UsageDetailItem[];
}

export default function UsagesPage() {
  const { success, error } = useToast();

  const [usages, setUsages] = useState<Usage[]>([
    {
      id: 1,
      code: "USE-20261105-01",
      date: "05 Nov 2026",
      totalItems: 4,
      notes: "Produksi 45 porsi sandwich siang & sore",
      operator: "Admin TOAST,inc",
      items: [
        { ingredient: "Roti Tawar Premium", quantity: 6, unit: "Pack" },
        { ingredient: "Keju Cheddar Slice", quantity: 12, unit: "Pack" },
        { ingredient: "Smoked Beef", quantity: 2.5, unit: "Kg" },
        { ingredient: "Selada Keriting", quantity: 1.8, unit: "Kg" },
      ],
    },
    {
      id: 2,
      code: "USE-20261104-02",
      date: "04 Nov 2026",
      totalItems: 5,
      notes: "Produksi paket sarapan pagi",
      operator: "Admin TOAST,inc",
      items: [
        { ingredient: "Roti Tawar Gandum", quantity: 5, unit: "Pack" },
        { ingredient: "Keju Cheddar Slice", quantity: 8, unit: "Pack" },
        { ingredient: "Smoked Beef", quantity: 2.0, unit: "Kg" },
        { ingredient: "Saus Barbeque Special", quantity: 2, unit: "Botol" },
        { ingredient: "Selada Keriting", quantity: 1.2, unit: "Kg" },
      ],
    },
    {
      id: 3,
      code: "USE-20261103-03",
      date: "03 Nov 2026",
      totalItems: 3,
      notes: "Produksi reguler harian",
      operator: "Admin TOAST,inc",
      items: [
        { ingredient: "Roti Tawar Premium", quantity: 4, unit: "Pack" },
        { ingredient: "Keju Cheddar Slice", quantity: 6, unit: "Pack" },
        { ingredient: "Selada Keriting", quantity: 1.0, unit: "Kg" },
      ],
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUsage, setSelectedUsage] = useState<Usage | null>(null);

  // Form state
  const [usageCode, setUsageCode] = useState("");
  const [usageDate, setUsageDate] = useState("2026-11-05");
  const [operator, setOperator] = useState("Admin TOAST,inc");
  const [notes, setNotes] = useState("");
  const [formItems, setFormItems] = useState<UsageDetailItem[]>([
    { ingredient: "Roti Tawar Premium", quantity: 2, unit: "Pack" },
  ]);

  const availableIngredients = [
    { name: "Roti Tawar Premium", unit: "Pack" },
    { name: "Roti Tawar Gandum", unit: "Pack" },
    { name: "Keju Cheddar Slice", unit: "Pack" },
    { name: "Smoked Beef", unit: "Kg" },
    { name: "Saus Barbeque Special", unit: "Botol" },
    { name: "Selada Keriting", unit: "Kg" },
  ];

  const handleOpenAdd = () => {
    const randomSuffix = Math.floor(10 + Math.random() * 90);
    setUsageCode(`USE-20261105-${randomSuffix}`);
    setUsageDate(new Date().toISOString().slice(0, 10));
    setOperator("Admin TOAST,inc");
    setNotes("");
    setFormItems([{ ingredient: "Roti Tawar Premium", quantity: 2, unit: "Pack" }]);
    setIsAddOpen(true);
  };

  const handleOpenDetail = (u: Usage) => {
    setSelectedUsage(u);
    setIsDetailOpen(true);
  };

  const handleOpenEdit = (u: Usage) => {
    setSelectedUsage(u);
    setUsageCode(u.code);
    setOperator(u.operator);
    setNotes(u.notes);
    setFormItems([...u.items]);
    setIsEditOpen(true);
  };

  const handleOpenDelete = (u: Usage) => {
    setSelectedUsage(u);
    setIsDeleteOpen(true);
  };

  const handleAddItemRow = () => {
    const defaultIng = availableIngredients[0];
    setFormItems([...formItems, { ingredient: defaultIng.name, quantity: 1, unit: defaultIng.unit }]);
  };

  const handleRemoveItemRow = (index: number) => {
    if (formItems.length === 1) {
      error("Perhatian", "Pemakaian harus mencakup minimal 1 jenis bahan");
      return;
    }
    setFormItems(formItems.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: keyof UsageDetailItem, value: any) => {
    const updated = [...formItems];
    const item = { ...updated[index] };

    if (field === "ingredient") {
      item.ingredient = value;
      const matched = availableIngredients.find((ing) => ing.name === value);
      if (matched) {
        item.unit = matched.unit;
      }
    } else if (field === "quantity") {
      item.quantity = Math.max(0, parseFloat(value) || 0);
    }

    updated[index] = item;
    setFormItems(updated);
  };

  const handleSaveUsage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usageCode.trim()) {
      error("Gagal", "Kode pemakaian wajib diisi");
      return;
    }
    if (formItems.length === 0) {
      error("Gagal", "Minimal satu jenis bahan wajib dicatat");
      return;
    }

    const newUsage: Usage = {
      id: Math.max(0, ...usages.map((u) => u.id)) + 1,
      code: usageCode,
      date: new Date(usageDate).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      totalItems: formItems.length,
      notes: notes || "Produksi sandwich harian",
      operator: operator || "Admin TOAST,inc",
      items: formItems,
    };

    setUsages([newUsage, ...usages]);
    setIsAddOpen(false);
    success(
      "Pemakaian Dicatat",
      `Pemakaian ${usageCode} berhasil disimpan dan stok bahan baku dikurangi secara otomatis.`
    );
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUsage) return;

    setUsages((prev) =>
      prev.map((u) =>
        u.id === selectedUsage.id
          ? {
              ...u,
              code: usageCode,
              operator: operator,
              notes: notes,
              items: formItems,
              totalItems: formItems.length,
            }
          : u
      )
    );
    setIsEditOpen(false);
    success("Pemakaian Diperbarui", `Data ${usageCode} berhasil disimpan.`);
  };

  const handleConfirmDelete = () => {
    if (!selectedUsage) return;
    setUsages((prev) => prev.filter((u) => u.id !== selectedUsage.id));
    setIsDeleteOpen(false);
    success("Pemakaian Dihapus", `Catatan ${selectedUsage.code} berhasil dihapus.`);
  };

  const filteredUsages = usages.filter(
    (u) =>
      u.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.operator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header
        title="Pemakaian Bahan"
        subtitle="Catat penggunaan bahan baku untuk produksi sandwich dan kurangi persediaan secara otomatis"
      />
      <div className="p-6 space-y-6 max-w-7xl">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
            <Input
              placeholder="Cari kode pemakaian / catatan..."
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
            Catat Pemakaian Bahan
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">No</TableHead>
                  <TableHead>Kode Pemakaian</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Jumlah Bahan Dipakai</TableHead>
                  <TableHead>Catatan / Keterangan</TableHead>
                  <TableHead>Penanggung Jawab</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Tidak ada data pemakaian yang cocok.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsages.map((item, idx) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium text-muted-foreground">
                        {idx + 1}
                      </TableCell>
                      <TableCell className="font-mono font-semibold text-foreground">
                        {item.code}
                      </TableCell>
                      <TableCell className="text-sm">{item.date}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="gap-1">
                          <CookingPot className="w-3 h-3 text-amber-600" />
                          {item.totalItems} Jenis Bahan
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {item.notes}
                      </TableCell>
                      <TableCell className="text-xs font-medium">
                        {item.operator}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="inline-flex items-center justify-end gap-1.5">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenDetail(item)}
                            className="h-8 px-2.5 text-xs gap-1 border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                            title="Lihat Detail Pemakaian"
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
                            title="Edit Pemakaian"
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
                            title="Hapus Pemakaian"
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

      {/* Modal Detail Pemakaian */}
      <Modal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        title={`Rincian Pemakaian: ${selectedUsage?.code}`}
        description="Detail bahan baku yang dikonsumsi dalam produksi sandwich"
        maxWidth="lg"
      >
        {selectedUsage && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-muted/50 rounded-lg text-xs">
              <div>
                <span className="text-muted-foreground block">Tanggal:</span>
                <span className="font-semibold text-foreground">{selectedUsage.date}</span>
              </div>
              <div>
                <span className="text-muted-foreground block">Penanggung Jawab:</span>
                <span className="font-semibold text-foreground">{selectedUsage.operator}</span>
              </div>
              <div>
                <span className="text-muted-foreground block">Total Bahan:</span>
                <span className="font-semibold text-foreground">
                  {selectedUsage.totalItems} Jenis
                </span>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="text-xs">No</TableHead>
                    <TableHead className="text-xs">Bahan Baku</TableHead>
                    <TableHead className="text-xs text-right">Jumlah Pemakaian</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedUsage.items.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="text-xs font-medium text-muted-foreground">
                        {idx + 1}
                      </TableCell>
                      <TableCell className="font-medium text-xs">
                        {row.ingredient}
                      </TableCell>
                      <TableCell className="text-xs text-right font-bold text-amber-600">
                        {row.quantity} {row.unit}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="text-xs bg-muted/40 p-3 rounded-lg">
              <span className="font-semibold block text-foreground">Catatan Produksi:</span>
              <p className="text-muted-foreground mt-0.5">{selectedUsage.notes}</p>
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={() => setIsDetailOpen(false)}>Tutup</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Catat Pemakaian Baru */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Catat Pemakaian Bahan Baku Produksi"
        description="Masukkan bahan-bahan yang digunakan dalam proses pembuatan sandwich"
        maxWidth="2xl"
      >
        <form onSubmit={handleSaveUsage} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="use-code">Kode Pemakaian *</Label>
              <Input
                id="use-code"
                required
                value={usageCode}
                onChange={(e) => setUsageCode(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="use-date">Tanggal Pemakaian</Label>
              <Input
                id="use-date"
                type="date"
                required
                value={usageDate}
                onChange={(e) => setUsageDate(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="use-op">Penanggung Jawab</Label>
              <Input
                id="use-op"
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Daftar Bahan Yang Digunakan</Label>
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

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {formItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2.5 rounded-lg border bg-muted/40"
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
                  <div className="w-32">
                    <Input
                      type="number"
                      step="any"
                      min="0.1"
                      placeholder="Jumlah"
                      className="h-8 text-xs"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                    />
                  </div>
                  <div className="w-20 text-xs text-muted-foreground font-medium px-2 py-1 bg-background rounded border text-center">
                    {item.unit}
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
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="use-notes">Catatan Produksi / Shift</Label>
            <Input
              id="use-notes"
              placeholder="Contoh: Produksi 45 porsi sandwich catering..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
              Batal
            </Button>
            <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">
              Simpan Pemakaian
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Edit Pemakaian */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title={`Edit Catatan Pemakaian: ${usageCode}`}
        description="Perbarui informasi pemakaian bahan baku"
        maxWidth="2xl"
      >
        <form onSubmit={handleSaveEdit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="edit-use-code">Kode Pemakaian</Label>
              <Input
                id="edit-use-code"
                required
                value={usageCode}
                onChange={(e) => setUsageCode(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-use-op">Penanggung Jawab</Label>
              <Input
                id="edit-use-op"
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Daftar Bahan Yang Digunakan</Label>
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

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {formItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2.5 rounded-lg border bg-muted/40"
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
                  <div className="w-32">
                    <Input
                      type="number"
                      step="any"
                      min="0.1"
                      className="h-8 text-xs"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                    />
                  </div>
                  <div className="w-20 text-xs text-muted-foreground font-medium px-2 py-1 bg-background rounded border text-center">
                    {item.unit}
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
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-use-notes">Catatan Produksi</Label>
            <Input
              id="edit-use-notes"
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

      {/* Modal Hapus Pemakaian */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Hapus Catatan Pemakaian Bahan"
        description="Apakah Anda yakin ingin menghapus catatan pemakaian bahan ini?"
        maxWidth="sm"
      >
        <div className="py-2 text-xs space-y-1">
          <p className="font-semibold text-sm text-foreground">
            {selectedUsage?.code}
          </p>
          <p className="text-muted-foreground">
            {selectedUsage?.operator} • {selectedUsage?.notes}
          </p>
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
            Batal
          </Button>
          <Button variant="destructive" onClick={handleConfirmDelete}>
            Hapus Catatan
          </Button>
        </div>
      </Modal>
    </>
  );
}
