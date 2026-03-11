"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function validate() {
    if (!name) return "Name is required.";
    if (!email) return "Email is required.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Enter a valid email.";
    if (!password) return "Password is required.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (password !== confirm) return "Passwords do not match.";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    try {
      // replace with real registration API call
      await new Promise((r) => setTimeout(r, 800));

      // set a simple client cookie so middleware recognizes authentication
      // for production, set secure HttpOnly cookie from server
      document.cookie = "auth=1; path=/; max-age=3600; samesite=lax";

      // navigate to dashboard after successful registration
      router.push("/dashboard");
    } catch {
      setError("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-md rounded-lg bg-white p-8 shadow-md dark:bg-[#0b0b0b]">
        <div className="flex items-center gap-3">
          <Logo />
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Create account</h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error ? <div className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">{error}</div> : null}

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Full name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm" placeholder="Your name" required />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm" placeholder="you@example.com" required />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm" placeholder="••••••••" required />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Confirm password</label>
            <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm" placeholder="••••••••" required />
          </div>

          <button type="submit" disabled={loading} className="w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white">
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{" "}
          <a href="/auth/login" className="font-medium text-zinc-900 hover:underline dark:text-zinc-50">
            Sign in
          </a>
        </p>
      </main>
    </div>
  );
}