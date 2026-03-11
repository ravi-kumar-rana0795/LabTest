import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Missing credentials" }, { status: 400 });
    }

    // TODO: replace with real auth (DB lookup / verify password / issue JWT or session id)
    if (email !== "ravi@gmail.com" || password !== "password123") {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = Date.now();
    const maxAge = 60 * 60 * 24 * 7; // 7 days

    const res = NextResponse.json({ ok: true });
    res.headers.append(
      "Set-Cookie",
      `token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}; Secure`
    );

    return res;
  } catch (err) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}