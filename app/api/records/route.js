import { createConnection } from "@/app/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request) {
  const params = request.nextUrl.searchParams;
  // console.log(params);
  let map = params.get("map");
  let cat = params.get("cat");
  let sc = params.get("sc");
  let mm = parseInt(params.get("mm"));
  let zt = parseInt(params.get("zt"));
  // http://localhost:3000/api/records?map=Slaughterhouse&cat=Standard&sc=apm_v2&mm=48&zt=0
  try {
    const db = await createConnection("cdrecords_s3");
    const sql = `SELECT * FROM records_global WHERE mapname = "${map}" AND category = "${cat}" AND spawncycle = "${sc}" AND max_monsters >= ${mm} AND zed_type = ${zt};`;
    console.log(sql);
    const [res] = await db.query(sql);

    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
