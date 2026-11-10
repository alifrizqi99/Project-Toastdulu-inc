import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    app: "TOAST,inc Inventory & Finance Management System",
    timestamp: new Date().toISOString(),
  });
}

