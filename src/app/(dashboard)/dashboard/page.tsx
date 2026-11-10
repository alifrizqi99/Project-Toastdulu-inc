"use client";

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatRupiah } from "@/lib/utils";
import {
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  CookingPot,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  ArrowRight,
} from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Bahan Baku",
      value: "24 Jenis",
      description: "Terdaftar dalam sistem",
      icon: Package,
      color: "text-blue-600 bg-blue-50 dark:bg-blue-950/50",
    },
    {
      title: "Stok Menipis",
      value: "3 Bahan",
      description: "Perlu segera restock",
      icon: AlertTriangle,
      color: "text-amber-600 bg-amber-50 dark:bg-amber-950/50",
      badge: "Perhatian",
    },
    {
      title: "Total Pemasukan",
      value: formatRupiah(8450000),
      description: "+12.5% dari bulan lalu",
      icon: TrendingUp,
      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50",
    },
    {
      title: "Total Pengeluaran",
      value: formatRupiah(5200000),
      description: "Termasuk pembelian bahan",
      icon: TrendingDown,
      color: "text-rose-600 bg-rose-50 dark:bg-rose-950/50",
    },
  ];

  const lowStockItems = [
    { name: "Roti Tawar Gandum", current: 4, min: 10, unit: "pack" },
    { name: "Keju Cheddar Slice", current: 8, min: 20, unit: "pack" },
    { name: "Smoked Beef", current: 1.5, min: 5, unit: "kg" },
  ];

  const recentTransactions = [
    {
      id: "TRX-001",
      date: "05 Nov 2026",
      desc: "Penjualan Sandwich Siang",
      type: "INCOME",
      amount: 450000,
    },
    {
      id: "TRX-002",
      date: "05 Nov 2026",
      desc: "Pembelian Bahan Roti & Keju (Supplier A)",
      type: "EXPENSE",
      amount: 620000,
    },
    {
      id: "TRX-003",
      date: "04 Nov 2026",
      desc: "Penjualan Paket Toast Pagi",
      type: "INCOME",
      amount: 780000,
    },
    {
      id: "TRX-004",
      date: "04 Nov 2026",
      desc: "Biaya Gas & Operasional",
      type: "EXPENSE",
      amount: 150000,
    },
  ];

  const netProfit = 8450000 - 5200000;

  return (
    <>
      <Header
        title="Ringkasan Operasional"
        subtitle="Pantau stok bahan, pengeluaran, dan penjualan TOAST,inc secara real-time"
      />
      <div className="p-6 space-y-6 max-w-7xl">
        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-muted/40 rounded-xl border">
          <div className="text-sm font-medium text-foreground">Aksi Cepat Sistem:</div>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/purchases">
              <Button size="sm" className="gap-1.5 bg-amber-600 hover:bg-amber-700 text-white">
                <ShoppingCart className="w-3.5 h-3.5" />
                Catat Pembelian
              </Button>
            </Link>
            <Link href="/usages">
              <Button size="sm" variant="outline" className="gap-1.5 border-amber-600 text-amber-700 hover:bg-amber-50">
                <CookingPot className="w-3.5 h-3.5" />
                Catat Pemakaian
              </Button>
            </Link>
            <Link href="/finance">
              <Button size="sm" variant="outline" className="gap-1.5 border-emerald-600 text-emerald-700 hover:bg-emerald-50">
                <Plus className="w-3.5 h-3.5" />
                Catat Transaksi
              </Button>
            </Link>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="border shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    {item.title}
                  </span>
                  <div className={`p-2 rounded-lg ${item.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline justify-between">
                    <div className="text-2xl font-bold tracking-tight text-foreground">
                      {item.value}
                    </div>
                    {item.badge && (
                      <Badge variant="warning" className="text-[10px]">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Profit / Loss Banner */}
        <Card className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/20">
          <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-amber-600" />
                <h3 className="font-semibold text-foreground">
                  Estimasi Laba Bersih Bulan Ini
                </h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Perhitungan Laba Sederhana = Total Pemasukan ({formatRupiah(8450000)}) - Total Pengeluaran ({formatRupiah(5200000)})
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-extrabold text-amber-600">
                {formatRupiah(netProfit)}
              </div>
              <span className="text-xs text-emerald-600 font-medium">
                Kondisi Keuangan Sehat (+38.4%)
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Grid Section: Low Stock Warning & Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Low Stock Items */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    Peringatan Stok Menipis
                  </CardTitle>
                  <CardDescription className="text-xs mt-1">
                    Bahan dengan persediaan di bawah batas minimum
                  </CardDescription>
                </div>
                <Badge variant="destructive" className="text-xs">
                  {lowStockItems.length} Bahan
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="divide-y">
                {lowStockItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="py-3 flex items-center justify-between first:pt-0 last:pb-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Min. Stok: {item.min} {item.unit}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-rose-600">
                        {item.current} {item.unit}
                      </p>
                      <span className="text-[11px] text-amber-600 font-medium">
                        Kritis
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t flex justify-end">
                <Link href="/purchases">
                  <Button variant="ghost" size="sm" className="gap-1 text-xs text-amber-600 hover:text-amber-700">
                    Restock Bahan Segera
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Aktivitas Transaksi Terbaru</CardTitle>
                  <CardDescription className="text-xs mt-1">
                    Arus kas pemasukan dan pengeluaran terbaru
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="divide-y">
                {recentTransactions.map((trx) => {
                  const isIncome = trx.type === "INCOME";
                  return (
                    <div
                      key={trx.id}
                      className="py-3 flex items-center justify-between first:pt-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-full ${
                            isIncome
                              ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40"
                              : "bg-rose-50 text-rose-600 dark:bg-rose-950/40"
                          }`}
                        >
                          {isIncome ? (
                            <ArrowUpRight className="w-4 h-4" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{trx.desc}</p>
                          <p className="text-xs text-muted-foreground">
                            {trx.id} • {trx.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-sm font-semibold ${
                            isIncome ? "text-emerald-600" : "text-rose-600"
                          }`}
                        >
                          {isIncome ? "+" : "-"} {formatRupiah(trx.amount)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="pt-2 border-t flex justify-end">
                <Link href="/finance">
                  <Button variant="ghost" size="sm" className="gap-1 text-xs text-amber-600 hover:text-amber-700">
                    Buka Riwayat Keuangan
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
