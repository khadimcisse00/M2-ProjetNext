import { NextRequest, NextResponse } from "next/server";
import { Server as IOServer } from "socket.io";

let io: IOServer | null = null;

export async function GET() {
  return NextResponse.json({ status: "Socket API OK" });
}

export async function POST(req: NextRequest) {
  return NextResponse.json({ status: "Socket POST OK" });
}
