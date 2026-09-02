"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface NavbarProps {
  email?: string;
}

export default function Navbar({
  email,
}: NavbarProps) {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-6">
      <div className="text-xl font-bold text-white">
        DocuMind<span className="text-blue-400">AI</span>
      </div>

      <div className="flex items-center gap-4">
        {email && (
          <span className="hidden text-sm text-slate-400 md:block">
            {email}
          </span>
        )}

        <button
          onClick={handleLogout}
          className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          Logout
        </button>
      </div>
    </header>
  );
}