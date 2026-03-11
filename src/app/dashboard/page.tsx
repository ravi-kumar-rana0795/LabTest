// ...new file...
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/components/Logo";

export default function page() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-3xl rounded-lg bg-white p-8 shadow-md dark:bg-[#0b0b0b] text-center">
        <div className="flex items-center justify-center gap-4">
          <Logo />
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Welcome</h1>
        </div>

        <p className="mt-6 text-zinc-600 dark:text-zinc-400">
          You are signed in. This is the landing page after login. Replace with your dashboard or app content.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-50 dark:text-black"
          >
            Sign out
          </button>
        </div>
      </main>
    </div>
  );
}