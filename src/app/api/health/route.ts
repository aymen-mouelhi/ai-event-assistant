/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json({ status: "ok", message: "Server is healthy" });
}
