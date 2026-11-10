"use client";

import { useState } from "react";
import { Bell, Search, Check, AlertTriangle, ShoppingCart, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onSearch?: (query: string) => void;
}

export function Header({
  title = "Dashboard",
  subtitle = "Selamat datang di Sistem Informasi TOAST,inc",
  onSearch,
}: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "warning",
      title: "Stok Roti Gandum Menipis",
      desc: "Sisa 4 pack (Batas min: 10 pack)",
      time: "10 menit lalu",
      read: false,
    },
    {
      id: 2,
      type: "warning",
      title: "Stok Keju Cheddar Kritis",
      desc: "Sisa 8 pack (Batas min: 20 pack)",
      time: "30 menit lalu",
      read: false,
    },
    {
      id: 3,
      type: "success",
      title: "Pembelian Bahan Baru",
      desc: "Invoice PO-20261105-001 berhasil dicatat",
      time: "2 jam lalu",
      read: false,
    },
  ]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  return (
    <header className="h-16 border-b bg-card/50 backdrop-blur px-6 flex items-center justify-between sticky top-0 z-30">
      <div>
        <h2 className="text-lg font-semibold text-foreground tracking-tight">{title}</h2>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>

      <div className="flex items-center gap-4 relative">
        <div className="relative w-64 hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
          <Input
            placeholder="Cari data..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="pl-9 h-9 bg-background/50 border-input text-xs"
          />
        </div>

        {/* Bell Button */}
        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            className="relative h-9 w-9"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Pemberitahuan Sistem"
          >
            <Bell className="w-4 h-4 text-muted-foreground" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-card animate-pulse" />
            )}
          </Button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border bg-card shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-3 border-b mb-3">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-sm text-foreground">Notifikasi</h4>
                    {unreadCount > 0 && (
                      <span className="text-[10px] font-bold bg-amber-500/20 text-amber-600 px-2 py-0.5 rounded-full">
                        {unreadCount} baru
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {unreadCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={markAllAsRead}
                        className="text-[11px] h-7 px-2 text-muted-foreground hover:text-foreground"
                      >
                        <Check className="w-3 h-3 mr-1" />
                        Tandai dibaca
                      </Button>
                    )}
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-muted-foreground hover:text-foreground p-1 rounded-md"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-2.5 rounded-lg border text-xs flex gap-2.5 transition-colors ${
                        n.read
                          ? "bg-muted/30 border-transparent opacity-75"
                          : "bg-amber-500/5 border-amber-500/20"
                      }`}
                    >
                      <div className="mt-0.5">
                        {n.type === "warning" ? (
                          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                        ) : (
                          <ShoppingCart className="w-4 h-4 text-emerald-500 shrink-0" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground">{n.title}</p>
                        <p className="text-muted-foreground text-[11px] mt-0.5">
                          {n.desc}
                        </p>
                        <span className="text-[10px] text-muted-foreground/80 mt-1 block">
                          {n.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
