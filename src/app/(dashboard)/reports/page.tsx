"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { exportToExcel, exportToPDF, reportSampleData } from "@/lib/export-utils";
import {
  FileSpreadsheet,
  FileText,
  Package,
  ShoppingCart,
  CookingPot,
  TrendingUp,
  TrendingDown,
  Scale,
  Loader2,
} from "lucide-react";

export default function ReportsPage() {
  const { success, error } = useToast();
  const [downloading, setDownloading] = useState<string | null>(null);

  const reportCards = [
    {
      title: "Laporan Persediaan & Nilai Stok",
      desc: "Rekapitulasi sisa persediaan seluruh bahan, status minimum stok, dan total valuasi aset stok.",
      icon: Package,
      type: "inventory" as keyof typeof reportSampleData,
    },
    {
      title: "Laporan Pengadaan / Pembelian",
      desc: "Riwayat pengadaan bahan baku berdasarkan rentang waktu, supplier, dan rincian harga beli.",
      icon: ShoppingCart,
      type: "purchases" as keyof typeof reportSampleData,
    },
    {
      title: "Laporan Pemakaian Bahan",
      desc: "Rincian konsumsi bahan baku per shift / hari untuk memantau efisiensi operasional.",
      icon: CookingPot,
      type: "usages" as keyof typeof reportSampleData,
    },
    {
      title: "Laporan Arus Kas & Pemasukan",
      desc: "Total pemasukan dari penjualan sandwich harian dan transaksi catering usaha.",
      icon: TrendingUp,
      type: "income" as keyof typeof reportSampleData,
    },
    {
      title: "Laporan Rekapitulasi Pengeluaran",
      desc: "Total biaya operasional, pembelian bahan dari supplier, dan beban usaha lainnya.",
      icon: TrendingDown,
      type: "expense" as keyof typeof reportSampleData,
    },
    {
      title: "Laporan Laba / Rugi Sederhana",
      desc: "Perbandingan pemasukan vs pengeluaran kotor untuk mengevaluasi profitabilitas usaha.",
      icon: Scale,
      type: "profit-loss" as keyof typeof reportSampleData,
    },
  ];

  const handleExportExcel = async (type: keyof typeof reportSampleData, title: string) => {
    try {
      setDownloading(`${type}-excel`);
      await exportToExcel(type);
      success("Export Excel Berhasil", `${title} telah diunduh dalam format .xlsx`);
    } catch (err) {
      console.error(err);
      error("Export Gagal", "Terjadi kesalahan saat mengekspor data Excel");
    } finally {
      setDownloading(null);
    }
  };

  const handleExportPDF = (type: keyof typeof reportSampleData, title: string) => {
    try {
      setDownloading(`${type}-pdf`);
      exportToPDF(type);
      success("Export PDF Berhasil", `${title} telah diunduh dalam format .pdf`);
    } catch (err) {
      console.error(err);
      error("Export Gagal", "Terjadi kesalahan saat membuat file PDF");
    } finally {
      setDownloading(null);
    }
  };

  return (
    <>
      <Header
        title="Laporan & Ekspor Data"
        subtitle="Unduh dan cetak laporan stok, pengadaan, pemakaian, dan keuangan dalam format Excel & PDF"
      />
      <div className="p-6 space-y-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportCards.map((card, idx) => {
            const Icon = card.icon;
            const isExcelLoading = downloading === `${card.type}-excel`;
            const isPdfLoading = downloading === `${card.type}-pdf`;

            return (
              <Card
                key={idx}
                className="flex flex-col justify-between hover:shadow-md transition-shadow border"
              >
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center mb-2">
                    <Icon className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-base">{card.title}</CardTitle>
                  <CardDescription className="text-xs leading-relaxed mt-1">
                    {card.desc}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-2 pt-2 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isExcelLoading}
                      onClick={() => handleExportExcel(card.type, card.title)}
                      className="flex-1 gap-1.5 text-xs hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300"
                    >
                      {isExcelLoading ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                      ) : (
                        <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                      Export Excel
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isPdfLoading}
                      onClick={() => handleExportPDF(card.type, card.title)}
                      className="flex-1 gap-1.5 text-xs hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300"
                    >
                      {isPdfLoading ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-rose-600" />
                      ) : (
                        <FileText className="w-3.5 h-3.5 text-rose-600" />
                      )}
                      Export PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
