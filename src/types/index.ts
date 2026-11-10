export type Role = "ADMIN" | "STAFF";

export type TransactionType = "INCOME" | "EXPENSE";

export interface UserSession {
  id: number;
  name: string;
  email: string;
  role: Role;
}

export interface SupplierItem {
  id: number;
  name: string;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  rating: number;
  notes?: string | null;
}

export interface IngredientItem {
  id: number;
  name: string;
  categoryId: number;
  unitId: number;
  currentStock: number;
  minStock: number;
  pricePerUnit: number;
  category?: { id: number; name: string };
  unit?: { id: number; name: string; symbol: string };
}

