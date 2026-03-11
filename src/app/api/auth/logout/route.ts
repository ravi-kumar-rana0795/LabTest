import { NextResponse } from "next/server";

export async function POST() {
  // Clear the auth cookie by setting it with Max-Age=0
  const res = NextResponse.json({ ok: true });
  res.headers.append(
    "Set-Cookie",
    // If running on localhost over http, remove `Secure` or set it conditionally.
    `token=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0; Secure`
  );
  return res;
}