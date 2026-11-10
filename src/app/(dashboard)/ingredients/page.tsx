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
  AlertCircle,
  Layers,
  Eye,
  Edit2,
  Trash2,
  Tag,
  Scale,
  Coins,
  Package,
} from "lucide-react";

interface Ingredient {
  id: number;
  name: string;
  category: string;
  unit: string;
  stock: number;
  minStock: number;
  price: number;
}

export default function IngredientsPage() {
  const { success, error } = useToast();

  const [categories, setCategories] = useState<string[]>([
    "Bakery & Roti",
    "Dairy & Olahan",
    "Daging & Protein",
    "Sayuran Segar",
    "Saus & Bumbu",
    "Kemasan & Packaging",
  ]);

  const [units, setUnits] = useState<{ name: string; symbol: string }[]>([
    { name: "Pack", symbol: "pack" },
    { name: "Kilogram", symbol: "kg" },
    { name: "Gram", symbol: "g" },
    { name: "Liter", symbol: "L" },
    { name: "Botol", symbol: "btl" },
    { name: "Lembar", symbol: "lbr" },
    { name: "Pcs", symbol: "pcs" },
  ]);

  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {
      id: 1,
      name: "Roti Tawar Premium",
      category: "Bakery & Roti",
      unit: "Pack",
      stock: 45,
      minStock: 15,
      price: 18000,
    },
    {
      id: 2,
      name: "Roti Tawar Gandum",
      category: "Bakery & Roti",
      unit: "Pack",
      stock: 4,
      minStock: 10,
      price: 22000,
    },
    {
      id: 3,
      name: "Keju Cheddar Slice",
      category: "Dairy & Olahan",
      unit: "Pack",
      stock: 8,
      minStock: 20,
      price: 26000,
    },
    {
      id: 4,
      name: "Smoked Beef",
      category: "Daging & Protein",
      unit: "Kg",
      stock: 1.5,
      minStock: 5.0,
      price: 110000,
    },
    {
      id: 5,
      name: "Saus Barbeque Special",
      category: "Saus & Bumbu",
      unit: "Botol",
      stock: 12,
      minStock: 5,
      price: 32000,
    },
    {
      id: 6,
      name: "Selada Keriting",
      category: "Sayuran Segar",
      unit: "Kg",
      stock: 7.2,
      minStock: 3.0,
      price: 24000,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "Bakery & Roti",
    unit: "Pack",
    stock: 0,
    minStock: 5,
    price: 0,
  });

  // Category & Unit new inputs
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newUnitName, setNewUnitName] = useState("");
  const [newUnitSymbol, setNewUnitSymbol] = useState("");

  const handleOpenAdd = () => {
    setFormData({
      name: "",
      category: categories[0] || "Bakery & Roti",
      unit: units[0]?.name || "Pack",
      stock: 0,
      minStock: 5,
      price: 0,
    });
    setIsAddOpen(true);
  };

  const handleOpenDetail = (item: Ingredient) => {
    setSelectedIngredient(item);
    setIsDetailOpen(true);
  };

  const handleOpenEdit = (item: Ingredient) => {
    setSelectedIngredient(item);
    setFormData({
      name: item.name,
      category: item.category,
      unit: item.unit,
      stock: item.stock,
      minStock: item.minStock,
      price: item.price,
    });
    setIsEditOpen(true);
  };

  const handleOpenDelete = (item: Ingredient) => {
    setSelectedIngredient(item);
    setIsDeleteOpen(true);
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      error("Gagal", "Nama bahan baku wajib diisi");
      return;
    }

    const newId = Math.max(0, ...ingredients.map((i) => i.id)) + 1;
    const newItem: Ingredient = {
      id: newId,
      name: formData.name,
      category: formData.category,
      unit: formData.unit,
      stock: Number(formData.stock) || 0,
      minStock: Number(formData.minStock) || 0,
      price: Number(formData.price) || 0,
    };

    setIngredients([newItem, ...ingredients]);
    setIsAddOpen(false);
    success("Bahan Ditambahkan", `${formData.name} berhasil ditambahkan ke daftar stok.`);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIngredient) return;
    if (!formData.name.trim()) {
      error("Gagal", "Nama bahan baku wajib diisi");
      return;
    }

    setIngredients((prev) =>
      prev.map((i) =>
        i.id === selectedIngredient.id
          ? {
              ...i,
              name: formData.name,
              category: formData.category,
              unit: formData.unit,
              stock: Number(formData.stock) || 0,
              minStock: Number(formData.minStock) || 0,
              price: Number(formData.price) || 0,
            }
          : i
      )
    );
    setIsEditOpen(false);
    success("Bahan Diperbarui", `Data ${formData.name} berhasil diperbarui.`);
  };

  const handleConfirmDelete = () => {
    if (!selectedIngredient) return;
    setIngredients((prev) => prev.filter((i) => i.id !== selectedIngredient.id));
    setIsDeleteOpen(false);
    success("Bahan Dihapus", `${selectedIngredient.name} berhasil dihapus.`);
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    if (categories.includes(newCategoryName.trim())) {
      error("Perhatian", "Kategori tersebut sudah ada");
      return;
    }
    setCategories([...categories, newCategoryName.trim()]);
    setNewCategoryName("");
    success("Kategori Ditambahkan", "Kategori baru siap digunakan.");
  };

  const handleAddUnit = () => {
    if (!newUnitName.trim() || !newUnitSymbol.trim()) return;
    setUnits([...units, { name: newUnitName.trim(), symbol: newUnitSymbol.trim() }]);
    setNewUnitName("");
    setNewUnitSymbol("");
    success("Satuan Ditambahkan", "Satuan baru siap digunakan.");
  };

  const filteredIngredients = ingredients.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header
        title="Bahan Baku & Persediaan"
        subtitle="Kelola data bahan baku, kategori, satuan, dan pantau stok minimum"
      />
      <div className="p-6 space-y-6 max-w-7xl">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
              <Input
                placeholder="Cari nama bahan / kategori..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setIsCategoryModalOpen(true)}
              className="gap-2"
            >
              <Layers className="w-4 h-4" />
              Kategori & Satuan
            </Button>
            <Button
              onClick={handleOpenAdd}
              className="gap-2 bg-amber-600 hover:bg-amber-700 text-white shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Tambah Bahan
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">No</TableHead>
                  <TableHead>Nama Bahan</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Satuan</TableHead>
                  <TableHead>Stok Saat Ini</TableHead>
                  <TableHead>Batas Minimum</TableHead>
                  <TableHead>Harga Satuan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIngredients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      Tidak ada data bahan yang sesuai.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredIngredients.map((item, idx) => {
                    const isLow = item.stock <= item.minStock;
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium text-muted-foreground">
                          {idx + 1}
                        </TableCell>
                        <TableCell className="font-semibold text-foreground">
                          {item.name}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.category}</Badge>
                        </TableCell>
                        <TableCell>{item.unit}</TableCell>
                        <TableCell className="font-bold">
                          <span className={isLow ? "text-rose-600" : "text-foreground"}>
                            {item.stock} {item.unit}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {item.minStock} {item.unit}
                        </TableCell>
                        <TableCell>{formatRupiah(item.price)}</TableCell>
                        <TableCell>
                          {isLow ? (
                            <Badge variant="destructive" className="gap-1 text-[11px]">
                              <AlertCircle className="w-3 h-3" />
                              Stok Menipis
                            </Badge>
                          ) : (
                            <Badge variant="success" className="text-[11px]">
                              Aman
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="inline-flex items-center justify-end gap-1.5">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenDetail(item)}
                              className="h-8 px-2.5 text-xs gap-1 border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                              title="Lihat Detail Bahan"
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
                              title="Edit Bahan"
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
                              title="Hapus Bahan"
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

      {/* Modal Detail Bahan */}
      <Modal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        title="Detail Bahan Baku"
        description="Informasi stok, kategori, dan nilai valuasi aset bahan"
        maxWidth="md"
      >
        {selectedIngredient && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-base text-foreground">
                  {selectedIngredient.name}
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Kategori: {selectedIngredient.category}
                </p>
              </div>
              <Badge
                variant={selectedIngredient.stock <= selectedIngredient.minStock ? "destructive" : "success"}
                className="text-xs px-2.5 py-1"
              >
                {selectedIngredient.stock <= selectedIngredient.minStock ? "Stok Menipis" : "Stok Aman"}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-muted/40 rounded-lg">
                <span className="text-muted-foreground block">Stok Saat Ini:</span>
                <span className="font-bold text-sm text-foreground">
                  {selectedIngredient.stock} {selectedIngredient.unit}
                </span>
              </div>
              <div className="p-3 bg-muted/40 rounded-lg">
                <span className="text-muted-foreground block">Batas Minimum:</span>
                <span className="font-bold text-sm text-foreground">
                  {selectedIngredient.minStock} {selectedIngredient.unit}
                </span>
              </div>
              <div className="p-3 bg-muted/40 rounded-lg">
                <span className="text-muted-foreground block">Harga per Satuan:</span>
                <span className="font-bold text-sm text-foreground">
                  {formatRupiah(selectedIngredient.price)}
                </span>
              </div>
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                <span className="text-emerald-700 dark:text-emerald-300 block font-medium">Total Valuasi Stok:</span>
                <span className="font-bold text-sm text-emerald-600">
                  {formatRupiah(selectedIngredient.stock * selectedIngredient.price)}
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={() => setIsDetailOpen(false)}>Tutup</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Tambah Bahan */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Tambah Bahan Baku Baru"
        description="Masukkan rincian bahan baku ke dalam sistem inventaris"
        maxWidth="lg"
      >
        <form onSubmit={handleSaveAdd} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="add-ing-name">Nama Bahan Baku *</Label>
            <Input
              id="add-ing-name"
              required
              placeholder="Contoh: Roti Tawar Gandum"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="add-ing-category">Kategori Bahan</Label>
              <select
                id="add-ing-category"
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="add-ing-unit">Satuan Ukuran</Label>
              <select
                id="add-ing-unit"
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              >
                {units.map((u) => (
                  <option key={u.name} value={u.name}>
                    {u.name} ({u.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="add-ing-stock">Stok Awal</Label>
              <Input
                id="add-ing-stock"
                type="number"
                step="any"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="add-ing-minstock">Batas Minimum Stok</Label>
              <Input
                id="add-ing-minstock"
                type="number"
                step="any"
                min="0"
                value={formData.minStock}
                onChange={(e) => setFormData({ ...formData, minStock: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="add-ing-price">Harga per Satuan (Rp)</Label>
              <Input
                id="add-ing-price"
                type="number"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
              Batal
            </Button>
            <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">
              Simpan Bahan
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Edit Bahan */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Bahan Baku"
        description="Perbarui informasi stok atau harga bahan baku"
        maxWidth="lg"
      >
        <form onSubmit={handleSaveEdit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="edit-ing-name">Nama Bahan Baku *</Label>
            <Input
              id="edit-ing-name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="edit-ing-category">Kategori Bahan</Label>
              <select
                id="edit-ing-category"
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-ing-unit">Satuan Ukuran</Label>
              <select
                id="edit-ing-unit"
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              >
                {units.map((u) => (
                  <option key={u.name} value={u.name}>
                    {u.name} ({u.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="edit-ing-stock">Stok Saat Ini</Label>
              <Input
                id="edit-ing-stock"
                type="number"
                step="any"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-ing-minstock">Batas Minimum Stok</Label>
              <Input
                id="edit-ing-minstock"
                type="number"
                step="any"
                min="0"
                value={formData.minStock}
                onChange={(e) => setFormData({ ...formData, minStock: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-ing-price">Harga per Satuan (Rp)</Label>
              <Input
                id="edit-ing-price"
                type="number"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
              Batal
            </Button>
            <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">
              Perbarui Bahan
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Konfirmasi Hapus */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Konfirmasi Hapus Bahan Baku"
        description="Apakah Anda yakin ingin menghapus bahan baku ini dari sistem inventaris?"
        maxWidth="sm"
      >
        <div className="py-2">
          <p className="text-sm font-semibold text-foreground">
            {selectedIngredient?.name}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Kategori: {selectedIngredient?.category} • Stok: {selectedIngredient?.stock}{" "}
            {selectedIngredient?.unit}
          </p>
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
            Batal
          </Button>
          <Button variant="destructive" onClick={handleConfirmDelete}>
            Hapus Bahan
          </Button>
        </div>
      </Modal>

      {/* Modal Manajemen Kategori & Satuan */}
      <Modal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        title="Manajemen Kategori & Satuan Bahan"
        description="Atur daftar kategori produk dan satuan ukuran yang tersedia"
        maxWidth="2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Categories Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-1 border-b">
              <Tag className="w-4 h-4 text-amber-600" />
              <h4 className="font-semibold text-sm">Daftar Kategori</h4>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Tambah kategori..."
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="h-8 text-xs"
              />
              <Button size="sm" onClick={handleAddCategory} className="h-8 px-2 bg-amber-600">
                <Plus className="w-3.5 h-3.5" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pt-1">
              {categories.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center text-xs bg-muted px-2.5 py-1 rounded-md text-foreground font-medium"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Units Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-1 border-b">
              <Scale className="w-4 h-4 text-amber-600" />
              <h4 className="font-semibold text-sm">Daftar Satuan</h4>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Nama (e.g. Kotak)"
                value={newUnitName}
                onChange={(e) => setNewUnitName(e.target.value)}
                className="h-8 text-xs flex-1"
              />
              <Input
                placeholder="Simbol (ktk)"
                value={newUnitSymbol}
                onChange={(e) => setNewUnitSymbol(e.target.value)}
                className="h-8 text-xs w-24"
              />
              <Button size="sm" onClick={handleAddUnit} className="h-8 px-2 bg-amber-600">
                <Plus className="w-3.5 h-3.5" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pt-1">
              {units.map((u) => (
                <span
                  key={u.name}
                  className="inline-flex items-center text-xs bg-muted px-2.5 py-1 rounded-md text-foreground font-medium"
                >
                  {u.name} ({u.symbol})
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={() => setIsCategoryModalOpen(false)}>Selesai</Button>
        </div>
      </Modal>
    </>
  );
}
