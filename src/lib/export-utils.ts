import ExcelJS from "exceljs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Data sources for reports
export const reportSampleData = {
  inventory: {
    title: "Laporan Persediaan & Nilai Stok Bahan Baku",
    columns: ["No", "Nama Bahan", "Kategori", "Satuan", "Stok Tersedia", "Batas Min.", "Harga Satuan (Rp)", "Total Valuasi (Rp)", "Status"],
    rows: [
      [1, "Roti Tawar Premium", "Bakery & Roti", "Pack", 45, 15, 18000, 810000, "Aman"],
      [2, "Roti Tawar Gandum", "Bakery & Roti", "Pack", 4, 10, 22000, 88000, "Stok Menipis"],
      [3, "Keju Cheddar Slice", "Dairy & Olahan", "Pack", 8, 20, 26000, 208000, "Stok Menipis"],
      [4, "Smoked Beef", "Daging & Protein", "Kg", 1.5, 5.0, 110000, 165000, "Stok Menipis"],
      [5, "Saus Barbeque Special", "Saus & Bumbu", "Botol", 12, 5, 32000, 384000, "Aman"],
      [6, "Selada Keriting", "Sayuran Segar", "Kg", 7.2, 3.0, 24000, 172800, "Aman"],
    ],
  },
  purchases: {
    title: "Laporan Riwayat Pengadaan & Pembelian Bahan",
    columns: ["No", "No. Invoice", "Tanggal", "Supplier", "Jumlah Item", "Total Biaya (Rp)", "Status"],
    rows: [
      [1, "PO-20261105-001", "05/11/2026", "CV Bakery Prima Jaya", "2 Bahan", 450000, "Selesai"],
      [2, "PO-20261103-002", "03/11/2026", "PT Dairy Sejahtera", "3 Bahan", 850000, "Selesai"],
      [3, "PO-20261101-003", "01/11/2026", "Mitra Daging Mandiri", "1 Bahan", 1100000, "Selesai"],
    ],
  },
  usages: {
    title: "Laporan Pemakaian Bahan Baku Produksi",
    columns: ["No", "Kode Pemakaian", "Tanggal", "Bahan Dipakai", "Penanggung Jawab", "Catatan Produksi"],
    rows: [
      [1, "USE-20261105-01", "05/11/2026", "4 Jenis Bahan", "Admin TOAST,inc", "Produksi 45 porsi sandwich siang & sore"],
      [2, "USE-20261104-02", "04/11/2026", "5 Jenis Bahan", "Admin TOAST,inc", "Produksi paket sarapan pagi kantoran"],
      [3, "USE-20261103-03", "03/11/2026", "3 Jenis Bahan", "Admin TOAST,inc", "Produksi reguler harian gerai"],
    ],
  },
  income: {
    title: "Laporan Arus Kas Pemasukan & Penjualan",
    columns: ["No", "No. Transaksi", "Tanggal", "Kategori", "Deskripsi Penjualan", "Nominal (Rp)"],
    rows: [
      [1, "TRX-20261105-01", "05/11/2026", "PENJUALAN", "Penjualan Sandwich Reguler & Spesial", 450000],
      [2, "TRX-20261104-03", "04/11/2026", "PENJUALAN", "Penjualan Catering Kantoran (30 Porsi)", 900000],
      [3, "TRX-20261102-06", "02/11/2026", "PENJUALAN", "Penjualan Event Bazaar Kuliner", 1250000],
    ],
  },
  expense: {
    title: "Laporan Rekapitulasi Pengeluaran Operasional",
    columns: ["No", "No. Transaksi", "Tanggal", "Kategori", "Keterangan Beban", "Nominal (Rp)"],
    rows: [
      [1, "TRX-20261105-02", "05/11/2026", "PEMBELIAN_BAHAN", "Pembelian Bahan Roti Tawar & Gandum", 450000],
      [2, "TRX-20261104-04", "04/11/2026", "OPERASIONAL", "Listrik, Gas & Kebersihan Harian", 85000],
      [3, "TRX-20261103-05", "03/11/2026", "PEMBELIAN_BAHAN", "Pembelian Keju & Dairy", 850000],
    ],
  },
  "profit-loss": {
    title: "Laporan Perhitungan Laba & Rugi Usaha",
    columns: ["Komponen Keuangan", "Keterangan", "Total Nominal (Rp)"],
    rows: [
      ["Total Pemasukan (Gross Sales)", "Akumulasi penjualan sandwich & catering", 8450000],
      ["Biaya Bahan Baku (HPP)", "Total pembelian bahan baku dari supplier", 4250000],
      ["Biaya Operasional & Umum", "Beban utilitas, gas, kemasan & operasional", 950000],
      ["Total Pengeluaran", "Total biaya HPP + Operasional", 5200000],
      ["Estimasi Laba Bersih (Net Profit)", "Laba sebelum pajak (Margin: 38.4%)", 3250000],
    ],
  },
};

export async function exportToExcel(reportKey: keyof typeof reportSampleData) {
  const data = reportSampleData[reportKey];
  if (!data) return;

  const workbook = new ExcelJS.Workbook();
  workbook.creator = "TOAST,inc System";
  workbook.created = new Date();

  const worksheet = workbook.addWorksheet("Laporan");

  // Title Row
  worksheet.mergeCells("A1", `${String.fromCharCode(64 + data.columns.length)}1`);
  const titleRow = worksheet.getCell("A1");
  titleRow.value = `TOAST,inc — ${data.title}`;
  titleRow.font = { name: "Arial", size: 14, bold: true, color: { argb: "FFB45309" } };
  titleRow.alignment = { vertical: "middle", horizontal: "center" };
  worksheet.getRow(1).height = 30;

  // Subtitle / Date Row
  worksheet.mergeCells("A2", `${String.fromCharCode(64 + data.columns.length)}2`);
  const subRow = worksheet.getCell("A2");
  subRow.value = `Tanggal Cetak: ${new Date().toLocaleDateString("id-ID", { dateStyle: "long" })}`;
  subRow.font = { name: "Arial", size: 9, italic: true, color: { argb: "FF6B7280" } };
  subRow.alignment = { vertical: "middle", horizontal: "center" };
  worksheet.getRow(2).height = 20;

  // Empty row
  worksheet.addRow([]);

  // Headers
  const headerRow = worksheet.addRow(data.columns);
  headerRow.height = 24;
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFF59E0B" },
    };
    cell.font = { name: "Arial", size: 10, bold: true, color: { argb: "FFFFFFFF" } };
    cell.alignment = { vertical: "middle", horizontal: "center" };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  // Data Rows
  data.rows.forEach((row) => {
    const r = worksheet.addRow(row);
    r.height = 20;
    r.eachCell((cell) => {
      cell.font = { name: "Arial", size: 9 };
      cell.border = {
        top: { style: "thin", color: { argb: "FFE5E7EB" } },
        left: { style: "thin", color: { argb: "FFE5E7EB" } },
        bottom: { style: "thin", color: { argb: "FFE5E7EB" } },
        right: { style: "thin", color: { argb: "FFE5E7EB" } },
      };
    });
  });

  // Auto-fit column widths
  worksheet.columns.forEach((col) => {
    let maxLength = 12;
    col.eachCell?.({ includeEmpty: false }, (cell) => {
      const valLength = cell.value ? cell.value.toString().length : 0;
      if (valLength > maxLength) {
        maxLength = Math.min(valLength + 4, 40);
      }
    });
    col.width = maxLength;
  });

  // Generate and download file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `TOAST_inc_${reportKey}_${new Date().toISOString().slice(0, 10)}.xlsx`;
  anchor.click();
  window.URL.revokeObjectURL(url);
}

export function exportToPDF(reportKey: keyof typeof reportSampleData) {
  const data = reportSampleData[reportKey];
  if (!data) return;

  const doc = new jsPDF({
    orientation: reportKey === "inventory" ? "landscape" : "portrait",
    unit: "mm",
    format: "a4",
  });

  // Header Title
  doc.setFontSize(16);
  doc.setTextColor(180, 83, 9); // Amber-700
  doc.text("TOAST,inc — Inventory & Finance Management", 14, 15);

  doc.setFontSize(11);
  doc.setTextColor(30, 41, 59);
  doc.text(data.title, 14, 23);

  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(
    `Dicetak pada: ${new Date().toLocaleDateString("id-ID", { dateStyle: "full", timeStyle: "short" } as any)}`,
    14,
    29
  );

  // AutoTable
  autoTable(doc, {
    startY: 33,
    head: [data.columns],
    body: data.rows.map((row) =>
      row.map((val) =>
        typeof val === "number" && val > 999 ? `Rp ${val.toLocaleString("id-ID")}` : String(val)
      )
    ),
    styles: {
      fontSize: 8.5,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [217, 119, 6], // amber-600
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
  });

  // Footer
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `TOAST,inc Dokumen Resmi — Halaman ${i} dari ${pageCount}`,
      14,
      doc.internal.pageSize.height - 10
    );
  }

  doc.save(`TOAST_inc_${reportKey}_${new Date().toISOString().slice(0, 10)}.pdf`);
}

