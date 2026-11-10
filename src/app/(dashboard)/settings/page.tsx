"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { Store, UserCheck, ShieldCheck, Check, Loader2 } from "lucide-react";

export default function SettingsPage() {
  const { success, error } = useToast();

  // Business Profile State
  const [businessName, setBusinessName] = useState("TOAST,inc");
  const [businessPhone, setBusinessPhone] = useState("+62 812-9876-5432");
  const [businessAddress, setBusinessAddress] = useState("Jl. Boulevard Kampus No. 45, Sentra Kuliner");
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Admin Account State
  const [adminName, setAdminName] = useState("Administrator TOAST,inc");
  const [adminEmail, setAdminEmail] = useState("admin@toastinc.com");
  const [isSavingAccount, setIsSavingAccount] = useState(false);

  // Change Password State
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) {
      error("Gagal", "Nama usaha tidak boleh kosong");
      return;
    }
    setIsSavingProfile(true);
    setTimeout(() => {
      setIsSavingProfile(false);
      success("Profil Disimpan", "Data identitas TOAST,inc berhasil diperbarui.");
    }, 400);
  };

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminName.trim()) {
      error("Gagal", "Nama admin tidak boleh kosong");
      return;
    }
    if (!adminEmail.includes("@")) {
      error("Gagal", "Format email tidak valid");
      return;
    }
    setIsSavingAccount(true);
    setTimeout(() => {
      setIsSavingAccount(false);
      success("Akun Diperbarui", "Data administrator berhasil diperbarui.");
    }, 400);
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currPass) {
      error("Gagal", "Password saat ini wajib diisi");
      return;
    }
    if (newPass.length < 6) {
      error("Gagal", "Password baru minimal 6 karakter");
      return;
    }
    if (newPass !== confirmPass) {
      error("Gagal", "Konfirmasi password baru tidak cocok");
      return;
    }
    setIsSavingPassword(true);
    setTimeout(() => {
      setIsSavingPassword(false);
      setCurrPass("");
      setNewPass("");
      setConfirmPass("");
      success("Password Diganti", "Password baru Anda telah aktif.");
    }, 400);
  };

  return (
    <>
      <Header
        title="Pengaturan Sistem"
        subtitle="Kelola profil usaha TOAST,inc, akun administrator, dan konfigurasi persediaan"
      />
      <div className="p-6 space-y-6 max-w-4xl">
        {/* Business Profile Setting */}
        <Card className="border shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Store className="w-5 h-5 text-amber-600" />
              <CardTitle className="text-base">Profil Usaha</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Informasi identitas UMKM TOAST,inc yang tertera pada invoice dan laporan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="businessName">Nama Usaha</Label>
                  <Input
                    id="businessName"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Nomor Telepon / WhatsApp</Label>
                  <Input
                    id="phone"
                    value={businessPhone}
                    onChange={(e) => setBusinessPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="address">Alamat Gerai / Dapur Utama</Label>
                <Input
                  id="address"
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                />
              </div>
              <div className="pt-2 flex justify-end">
                <Button
                  type="submit"
                  disabled={isSavingProfile}
                  className="bg-amber-600 hover:bg-amber-700 text-white gap-2"
                >
                  {isSavingProfile ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  Simpan Profil
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Admin Account Settings */}
        <Card className="border shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-amber-600" />
              <CardTitle className="text-base">Akun Administrator</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Kelola nama tampilan dan email login
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveAccount} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="adminName">Nama Lengkap</Label>
                  <Input
                    id="adminName"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="adminEmail">Email Login</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="pt-2 flex justify-end">
                <Button
                  type="submit"
                  disabled={isSavingAccount}
                  className="bg-amber-600 hover:bg-amber-700 text-white gap-2"
                >
                  {isSavingAccount ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  Perbarui Akun
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card className="border shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <CardTitle className="text-base">Keamanan & Ubah Password</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Pastikan akun menggunakan password yang kuat dan unik
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSavePassword} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="currPass">Password Saat Ini</Label>
                <Input
                  id="currPass"
                  type="password"
                  placeholder="••••••••"
                  value={currPass}
                  onChange={(e) => setCurrPass(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="newPass">Password Baru</Label>
                  <Input
                    id="newPass"
                    type="password"
                    placeholder="Minimal 6 karakter"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="confirmPass">Konfirmasi Password Baru</Label>
                  <Input
                    id="confirmPass"
                    type="password"
                    placeholder="Ulangi password baru"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                  />
                </div>
              </div>
              <div className="pt-2 flex justify-end">
                <Button
                  type="submit"
                  variant="outline"
                  disabled={isSavingPassword}
                  className="gap-2 border-amber-600 text-amber-600 hover:bg-amber-50"
                >
                  {isSavingPassword ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ShieldCheck className="w-4 h-4" />
                  )}
                  Ganti Password
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
