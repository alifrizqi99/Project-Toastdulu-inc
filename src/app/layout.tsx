import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TOAST,inc — Inventory & Finance Management System",
  description: "Sistem Informasi Pengelolaan Stok Bahan dan Keuangan UMKM TOAST,inc",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="font-sans min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
