import { z } from "zod";

// Auth Schema
export const loginSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

// Supplier Schema
export const supplierSchema = z.object({
  name: z.string().min(2, "Nama supplier minimal 2 karakter"),
  phone: z.string().optional(),
  email: z.string().email("Format email tidak valid").optional().or(z.literal("")),
  address: z.string().optional(),
  rating: z.number().min(1).max(5).default(5),
  notes: z.string().optional(),
});

// Category & Unit Schema
export const categorySchema = z.object({
  name: z.string().min(2, "Nama kategori minimal 2 karakter"),
  description: z.string().optional(),
});

export const unitSchema = z.object({
  name: z.string().min(1, "Nama satuan wajib diisi"),
  symbol: z.string().min(1, "Simbol satuan wajib diisi"),
});

// Ingredient Schema
export const ingredientSchema = z.object({
  name: z.string().min(2, "Nama bahan minimal 2 karakter"),
  categoryId: z.number().int().positive("Kategori wajib dipilih"),
  unitId: z.number().int().positive("Satuan wajib dipilih"),
  currentStock: z.number().min(0, "Stok tidak boleh negatif").default(0),
  minStock: z.number().min(0, "Batas minimum stok tidak boleh negatif").default(0),
  pricePerUnit: z.number().min(0, "Harga satuan tidak boleh negatif").default(0),
});

// Purchase Schema
export const purchaseItemSchema = z.object({
  ingredientId: z.number().int().positive("Bahan wajib dipilih"),
  quantity: z.number().positive("Jumlah pembelian harus lebih dari 0"),
  unitPrice: z.number().min(0, "Harga satuan tidak boleh negatif"),
  subtotal: z.number().min(0),
});

export const purchaseSchema = z.object({
  invoiceNumber: z.string().min(3, "Nomor invoice wajib diisi"),
  purchaseDate: z.date().default(() => new Date()),
  supplierId: z.number().int().positive("Supplier wajib dipilih"),
  items: z.array(purchaseItemSchema).min(1, "Minimal satu item pembelian"),
  notes: z.string().optional(),
});

// Usage Schema
export const usageItemSchema = z.object({
  ingredientId: z.number().int().positive("Bahan wajib dipilih"),
  quantity: z.number().positive("Jumlah pemakaian harus lebih dari 0"),
});

export const usageSchema = z.object({
  usageNumber: z.string().min(3, "Nomor pemakaian wajib diisi"),
  usageDate: z.date().default(() => new Date()),
  items: z.array(usageItemSchema).min(1, "Minimal satu item pemakaian"),
  notes: z.string().optional(),
});

// Transaction Schema
export const transactionSchema = z.object({
  transactionNumber: z.string().min(3, "Nomor transaksi wajib diisi"),
  type: z.enum(["INCOME", "EXPENSE"]),
  category: z.string().min(2, "Kategori wajib diisi"),
  amount: z.number().positive("Nominal harus lebih dari 0"),
  transactionDate: z.date().default(() => new Date()),
  description: z.string().optional(),
});

