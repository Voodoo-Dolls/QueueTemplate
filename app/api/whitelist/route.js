import { createConnection } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await createConnection("cd_whitelist");
    const sql = "SELECT value FROM password;";
    const [res] = await db.query(sql);
    // db.end();
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
