import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

const handler = toNextJsHandler(auth);

export async function GET(request: NextRequest) {
  try {
    return await handler.GET(request);
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Auth GET error:", error);
    return NextResponse.json(
      { error: "Internal Auth Error", message: error?.message || String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    return await handler.POST(request);
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Auth POST error:", error);
    return NextResponse.json(
      { error: "Internal Auth Error", message: error?.message || String(error) },
      { status: 500 }
    );
  }
}
