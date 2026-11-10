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
  Star,
  Phone,
  Mail,
  MapPin,
  Eye,
  Edit2,
  Trash2,
  Package,
} from "lucide-react";

interface Supplier {
  id: number;
  name: string;
  contact: string;
  email: string;
  address: string;
  rating: number;
  items: string;
  notes?: string;
}

export default function SuppliersPage() {
  const { success, error } = useToast();

  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: 1,
      name: "CV Bakery Prima Jaya",
      contact: "0812-3456-7890",
      email: "order@bakeryprimajaya.com",
      address: "Jl. Industri Roti No. 12, Bandung",
      rating: 4.8,
      items: "Roti Tawar, Roti Brioche",
      notes: "Penyedia roti tawar premium & gandum terpercaya sejak 2023.",
    },
    {
      id: 2,
      name: "PT Dairy Sejahtera",
      contact: "0813-9876-5432",
      email: "sales@dairysejahtera.id",
      address: "Kawasan Pergudangan Barat No. 88",
      rating: 4.5,
      items: "Keju Cheddar, Mozzarella, Butter",
      notes: "Distributor resmi keju slice dan butter impor grade A.",
    },
    {
      id: 3,
      name: "Toko Sayur Segar Berkah",
      contact: "0857-1122-3344",
      email: "berkahsayur@gmail.com",
      address: "Pasar Induk Blok B No. 4",
      rating: 4.2,
      items: "Selada Romaine, Tomat, Bawang Bombay",
      notes: "Pengiriman sayur segar rutin setiap pagi pukul 06.00 WIB.",
    },
    {
      id: 4,
      name: "Mitra Daging Mandiri",
      contact: "0818-4455-6677",
      email: "order@mitradaging.co.id",
      address: "Jl. Rumah Potong Hewan No. 5",
      rating: 4.9,
      items: "Smoked Beef, Patty Daging Sapi",
      notes: "Daging smoked beef halal kualitas hotel dan restoran.",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    address: "",
    rating: 5.0,
    items: "",
    notes: "",
  });

  const handleOpenAdd = () => {
    setFormData({
      name: "",
      contact: "",
      email: "",
      address: "",
      rating: 5.0,
      items: "",
      notes: "",
    });
    setIsAddOpen(true);
  };

  const handleOpenDetail = (sup: Supplier) => {
    setSelectedSupplier(sup);
    setIsDetailOpen(true);
  };

  const handleOpenEdit = (sup: Supplier) => {
    setSelectedSupplier(sup);
    setFormData({
      name: sup.name,
      contact: sup.contact,
      email: sup.email,
      address: sup.address,
      rating: sup.rating,
      items: sup.items,
      notes: sup.notes || "",
    });
    setIsEditOpen(true);
  };

  const handleOpenDelete = (sup: Supplier) => {
    setSelectedSupplier(sup);
    setIsDeleteOpen(true);
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      error("Gagal", "Nama supplier wajib diisi");
      return;
    }

    const newId = Math.max(0, ...suppliers.map((s) => s.id)) + 1;
    const newSupplier: Supplier = {
      id: newId,
      name: formData.name,
      contact: formData.contact,
      email: formData.email,
      address: formData.address,
      rating: Number(formData.rating) || 5.0,
      items: formData.items,
      notes: formData.notes,
    };

    setSuppliers([newSupplier, ...suppliers]);
    setIsAddOpen(false);
    success("Berhasil Menambahkan", `Supplier ${formData.name} berhasil disimpan.`);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSupplier) return;
    if (!formData.name.trim()) {
      error("Gagal", "Nama supplier wajib diisi");
      return;
    }

    setSuppliers((prev) =>
      prev.map((s) =>
        s.id === selectedSupplier.id
          ? {
              ...s,
              name: formData.name,
              contact: formData.contact,
              email: formData.email,
              address: formData.address,
              rating: Number(formData.rating) || 5.0,
              items: formData.items,
              notes: formData.notes,
            }
          : s
      )
    );
    setIsEditOpen(false);
    success("Berhasil Diperbarui", `Data ${formData.name} berhasil diperbarui.`);
  };

  const handleConfirmDelete = () => {
    if (!selectedSupplier) return;
    setSuppliers((prev) => prev.filter((s) => s.id !== selectedSupplier.id));
    setIsDeleteOpen(false);
    success("Berhasil Dihapus", `Supplier ${selectedSupplier.name} telah dihapus.`);
  };

  const filteredSuppliers = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.items.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header
        title="Manajemen Supplier"
        subtitle="Kelola data mitra penyedia bahan baku dan pantau tingkat keandalan supplier"
      />
      <div className="p-6 space-y-6 max-w-7xl">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
            <Input
              placeholder="Cari nama supplier / kontak..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          <Button onClick={handleOpenAdd} className="gap-2 bg-amber-600 hover:bg-amber-700 text-white shadow-sm">
            <Plus className="w-4 h-4" />
            Tambah Supplier
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">No</TableHead>
                  <TableHead>Nama Supplier</TableHead>
                  <TableHead>Kontak & Alamat</TableHead>
                  <TableHead>Bahan Dipasok</TableHead>
                  <TableHead>Rating Keandalan</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Tidak ada data supplier yang cocok.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSuppliers.map((supplier, idx) => (
                    <TableRow key={supplier.id}>
                      <TableCell className="font-medium text-muted-foreground">
                        {idx + 1}
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-foreground">
                          {supplier.name}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Mail className="w-3 h-3" /> {supplier.email || "-"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs flex items-center gap-1 text-foreground">
                          <Phone className="w-3 h-3 text-muted-foreground" />
                          {supplier.contact || "-"}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" /> {supplier.address || "-"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs text-muted-foreground">
                          {supplier.items}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="gap-1 font-semibold">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          {supplier.rating.toFixed(1)} / 5.0
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="inline-flex items-center justify-end gap-1.5">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenDetail(supplier)}
                            className="h-8 px-2.5 text-xs gap-1 border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                            title="Lihat Detail Supplier"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Detail
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenEdit(supplier)}
                            className="h-8 px-2.5 text-xs gap-1 border-amber-200 text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                            title="Edit Data Supplier"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            Edit
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenDelete(supplier)}
                            className="h-8 px-2.5 text-xs gap-1 border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                            title="Hapus Supplier"
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

      {/* Modal Detail Supplier */}
      <Modal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        title="Detail Mitra Supplier"
        description="Profil lengkap penyedia bahan baku dan catatan keandalan"
        maxWidth="md"
      >
        {selectedSupplier && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-base text-foreground">
                  {selectedSupplier.name}
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  ID Mitra: SUP-{String(selectedSupplier.id).padStart(3, "0")}
                </p>
              </div>
              <Badge variant="secondary" className="gap-1 font-bold text-sm px-3 py-1 bg-background">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                {selectedSupplier.rating.toFixed(1)} / 5.0
              </Badge>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2 p-2.5 bg-muted/40 rounded-lg">
                <Phone className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-muted-foreground">Telepon / WhatsApp:</span>
                  <p className="font-semibold text-foreground">{selectedSupplier.contact || "-"}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2.5 bg-muted/40 rounded-lg">
                <Mail className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-muted-foreground">Email Resmi:</span>
                  <p className="font-semibold text-foreground">{selectedSupplier.email || "-"}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2.5 bg-muted/40 rounded-lg">
                <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-muted-foreground">Alamat Gudang / Kantor:</span>
                  <p className="font-semibold text-foreground">{selectedSupplier.address || "-"}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2.5 bg-muted/40 rounded-lg">
                <Package className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-muted-foreground">Bahan Yang Dipasok:</span>
                  <p className="font-semibold text-foreground">{selectedSupplier.items || "-"}</p>
                </div>
              </div>

              {selectedSupplier.notes && (
                <div className="p-2.5 bg-muted/40 rounded-lg">
                  <span className="font-medium text-muted-foreground">Catatan Kemitraan:</span>
                  <p className="text-foreground mt-0.5">{selectedSupplier.notes}</p>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={() => setIsDetailOpen(false)}>Tutup</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Tambah Supplier */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Tambah Mitra Supplier Baru"
        description="Masukkan informasi penyedia bahan baku untuk TOAST,inc"
        maxWidth="lg"
      >
        <form onSubmit={handleSaveAdd} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="add-name">Nama Supplier *</Label>
            <Input
              id="add-name"
              required
              placeholder="Contoh: CV Roti Sejahtera"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="add-contact">Nomor Telepon / WhatsApp</Label>
              <Input
                id="add-contact"
                placeholder="Contoh: 0812-3456-7890"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="add-email">Email Bisnis</Label>
              <Input
                id="add-email"
                type="email"
                placeholder="order@supplier.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="add-address">Alamat Gudang / Kantor</Label>
            <Input
              id="add-address"
              placeholder="Jl. Perkantoran No. 10..."
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="add-items">Bahan Baku Dipasok</Label>
              <Input
                id="add-items"
                placeholder="Roti Tawar, Keju Slice, etc."
                value={formData.items}
                onChange={(e) => setFormData({ ...formData, items: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="add-rating">Rating Keandalan (1.0 - 5.0)</Label>
              <Input
                id="add-rating"
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 5 })}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="add-notes">Catatan Tambahan</Label>
            <Input
              id="add-notes"
              placeholder="Keterangan kontrak, pengiriman rutin..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
              Batal
            </Button>
            <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">
              Simpan Supplier
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Edit Supplier */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Data Supplier"
        description="Perbarui rincian kontak atau evaluasi rating supplier"
        maxWidth="lg"
      >
        <form onSubmit={handleSaveEdit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="edit-name">Nama Supplier *</Label>
            <Input
              id="edit-name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="edit-contact">Nomor Telepon / WhatsApp</Label>
              <Input
                id="edit-contact"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-email">Email Bisnis</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-address">Alamat Gudang / Kantor</Label>
            <Input
              id="edit-address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="edit-items">Bahan Baku Dipasok</Label>
              <Input
                id="edit-items"
                value={formData.items}
                onChange={(e) => setFormData({ ...formData, items: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-rating">Rating Keandalan (1.0 - 5.0)</Label>
              <Input
                id="edit-rating"
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 5 })}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-notes">Catatan Tambahan</Label>
            <Input
              id="edit-notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
              Batal
            </Button>
            <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white">
              Perbarui Data
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal Konfirmasi Hapus */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Konfirmasi Hapus Supplier"
        description="Apakah Anda yakin ingin menghapus data supplier ini? Tindakan ini tidak dapat dibatalkan."
        maxWidth="sm"
      >
        <div className="py-2">
          <p className="text-sm font-semibold text-foreground">
            {selectedSupplier?.name}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {selectedSupplier?.address}
          </p>
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
            Batal
          </Button>
          <Button variant="destructive" onClick={handleConfirmDelete}>
            Hapus Supplier
          </Button>
        </div>
      </Modal>
    </>
  );
}
