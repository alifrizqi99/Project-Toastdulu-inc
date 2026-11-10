import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Memulai seeding database TOAST,inc...");

  // 1. Seed User
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@toastinc.com" },
    update: {},
    create: {
      name: "Admin TOAST,inc",
      email: "admin@toastinc.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("✅ User admin berhasil dibuat:", admin.email);

  // 2. Seed Categories
  const categories = [
    { name: "Bakery & Roti", description: "Berbagai jenis roti tawar dan roti toast" },
    { name: "Dairy & Olahan Susu", description: "Keju, butter, mentega, dan susu olahan" },
    { name: "Daging & Protein", description: "Smoked beef, patty, sosis, dan daging olahan" },
    { name: "Sayuran Segar", description: "Selada, tomat, timun, bawang bombay" },
    { name: "Saus & Bumbu", description: "Mayonaise, saus bbq, saus keju, saus sambal" },
    { name: "Kemasan & Packaging", description: "Kotak sandwich, kertas roti, tas takeaway" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
  }
  console.log("✅ Kategori bahan berhasil di-seed");

  // 3. Seed Units
  const units = [
    { name: "Pack", symbol: "pack" },
    { name: "Kilogram", symbol: "kg" },
    { name: "Gram", symbol: "g" },
    { name: "Liter", symbol: "L" },
    { name: "Mililiter", symbol: "ml" },
    { name: "Pcs", symbol: "pcs" },
    { name: "Lembar", symbol: "lbr" },
    { name: "Botol", symbol: "btl" },
  ];

  for (const unit of units) {
    await prisma.unit.upsert({
      where: { name: unit.name },
      update: {},
      create: unit,
    });
  }
  console.log("✅ Satuan bahan berhasil di-seed");

  // 4. Seed Suppliers
  const suppliers = [
    {
      name: "CV Bakery Prima Jaya",
      phone: "0812-3456-7890",
      email: "order@bakeryprimajaya.com",
      address: "Jl. Industri Roti No. 12, Bandung",
      rating: 4.8,
      notes: "Penyedia roti tawar premium & roti gandum berkala",
    },
    {
      name: "PT Dairy Sejahtera",
      phone: "0813-9876-5432",
      email: "sales@dairysejahtera.id",
      address: "Kawasan Pergudangan Barat No. 88",
      rating: 4.5,
      notes: "Supplier utama keju cheddar, mozzarella, & butter",
    },
    {
      name: "Toko Sayur Segar Berkah",
      phone: "0857-1122-3344",
      email: "berkahsayur@gmail.com",
      address: "Pasar Induk Blok B No. 4",
      rating: 4.2,
      notes: "Pengiriman sayur segar setiap pagi hari",
    },
    {
      name: "Mitra Daging Mandiri",
      phone: "0818-4455-6677",
      email: "order@mitradaging.co.id",
      address: "Jl. Rumah Potong Hewan No. 5",
      rating: 4.9,
      notes: "Daging slice dan smoked beef halal bersertifikat",
    },
  ];

  for (const sup of suppliers) {
    const existing = await prisma.supplier.findFirst({ where: { name: sup.name } });
    if (!existing) {
      await prisma.supplier.create({ data: sup });
    }
  }
  console.log("✅ Supplier berhasil di-seed");

  // 5. Seed Ingredients
  const bakeryCat = await prisma.category.findUnique({ where: { name: "Bakery & Roti" } });
  const dairyCat = await prisma.category.findUnique({ where: { name: "Dairy & Olahan Susu" } });
  const meatCat = await prisma.category.findUnique({ where: { name: "Daging & Protein" } });
  const vegCat = await prisma.category.findUnique({ where: { name: "Sayuran Segar" } });
  const packUnit = await prisma.unit.findUnique({ where: { name: "Pack" } });
  const kgUnit = await prisma.unit.findUnique({ where: { name: "Kilogram" } });

  if (bakeryCat && dairyCat && meatCat && vegCat && packUnit && kgUnit) {
    const sampleIngredients = [
      {
        name: "Roti Tawar Premium",
        categoryId: bakeryCat.id,
        unitId: packUnit.id,
        currentStock: 45,
        minStock: 15,
        pricePerUnit: 18000,
      },
      {
        name: "Roti Tawar Gandum",
        categoryId: bakeryCat.id,
        unitId: packUnit.id,
        currentStock: 4,
        minStock: 10,
        pricePerUnit: 22000,
      },
      {
        name: "Keju Cheddar Slice",
        categoryId: dairyCat.id,
        unitId: packUnit.id,
        currentStock: 8,
        minStock: 20,
        pricePerUnit: 26000,
      },
      {
        name: "Smoked Beef",
        categoryId: meatCat.id,
        unitId: kgUnit.id,
        currentStock: 1.5,
        minStock: 5.0,
        pricePerUnit: 110000,
      },
      {
        name: "Selada Keriting",
        categoryId: vegCat.id,
        unitId: kgUnit.id,
        currentStock: 7.2,
        minStock: 3.0,
        pricePerUnit: 24000,
      },
    ];

    for (const ing of sampleIngredients) {
      const existing = await prisma.ingredient.findFirst({ where: { name: ing.name } });
      if (!existing) {
        await prisma.ingredient.create({ data: ing });
      }
    }
    console.log("✅ Bahan baku awal berhasil di-seed");
  }

  // 6. Seed Settings
  const defaultSettings = [
    { key: "BUSINESS_NAME", value: "TOAST,inc" },
    { key: "BUSINESS_PHONE", value: "+62 812-9876-5432" },
    { key: "BUSINESS_ADDRESS", value: "Jl. Boulevard Kampus No. 45, Sentra Kuliner" },
    { key: "CURRENCY", value: "IDR" },
  ];

  for (const st of defaultSettings) {
    await prisma.setting.upsert({
      where: { key: st.key },
      update: { value: st.value },
      create: st,
    });
  }
  console.log("✅ Pengaturan profil usaha berhasil di-seed");

  console.log("✨ Seeding selesai dengan sukses!");
}

main()
  .catch((e) => {
    console.error("❌ Error saat seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

