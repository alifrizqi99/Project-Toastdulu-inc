"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  CookingPot,
  Wallet,
  FileSpreadsheet,
  Settings,
  Sandwich,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Supplier", href: "/suppliers", icon: Users },
  { name: "Bahan Baku", href: "/ingredients", icon: Package },
  { name: "Pembelian", href: "/purchases", icon: ShoppingCart },
  { name: "Pemakaian", href: "/usages", icon: CookingPot },
  { name: "Keuangan", href: "/finance", icon: Wallet },
  { name: "Laporan", href: "/reports", icon: FileSpreadsheet },
  { name: "Pengaturan", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-card min-h-screen flex flex-col justify-between p-4 shadow-sm">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
            <Sandwich className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-tight text-foreground">
              TOAST<span className="text-amber-600">,inc</span>
            </h1>
            <p className="text-xs text-muted-foreground">Inventory & Finance</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href || pathname?.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                  isActive
                    ? "bg-amber-500 text-white shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-muted-foreground")} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / User Profile & Logout */}
      <div className="pt-4 border-t space-y-2">
        <div className="px-3 py-2 rounded-lg bg-muted/60 flex items-center justify-between">
          <div className="truncate">
            <p className="text-xs font-semibold text-foreground">Admin TOAST,inc</p>
            <p className="text-[11px] text-muted-foreground truncate">admin@toastinc.com</p>
          </div>
          <Link
            href="/login"
            title="Logout"
            className="p-1.5 rounded-md hover:bg-background text-muted-foreground hover:text-destructive transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}

