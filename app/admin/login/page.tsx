
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const supabase = createClient();

      const { error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError) {
        setError("Invalid email or password. Please try again.");
        setLoading(false);
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Unable to sign in. Please check your connection.");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#08152d] px-5 py-12">
      <div className="w-full max-w-md rounded-2xl border border-[#c9a45c]/30 bg-[#10213d] p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <p className="mb-3 text-sm font-semibold tracking-[0.3em] text-[#d6b56f]">
            IMPERIUM MEDIA HUB
          </p>

          <h1 className="text-3xl font-bold text-white">
            Admin Login
          </h1>

          <p className="mt-3 text-sm text-gray-300">
            Sign in to manage your portfolio and projects.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-white"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your admin email"
              className="w-full rounded-lg border border-gray-600 bg-[#08152d] px-4 py-3 text-white outline-none focus:border-[#d6b56f]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-white"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-600 bg-[#08152d] px-4 py-3 text-white outline-none focus:border-[#d6b56f]"
            />
          </div>

          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#c9a45c] px-4 py-3 font-bold text-[#08152d] transition hover:bg-[#e0c17e] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-gray-400">
          Authorized administrators only.
        </p>
      </div>
    </main>
  );
}
