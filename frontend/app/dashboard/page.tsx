"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import FileUpload from "@/components/FileUpload";
import ChatBox from "@/components/ChatBox";

export default function DashboardPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [checkingAuth, setCheckingAuth] =
    useState(true);

  const [documentCount, setDocumentCount] =
    useState(0);

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      setEmail(user.email || "");
      setCheckingAuth(false);
    }

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          router.replace("/login");
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  if (checkingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="text-slate-400">
          Loading dashboard...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar email={email} />

      <div className="flex">
        <Sidebar
          documentCount={documentCount}
        />

        <section className="flex-1 p-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">
                Document Workspace
              </h1>

              <p className="mt-2 text-slate-400">
                Upload documents and interact with
                them using AI.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[350px_1fr]">
              <div>
                <FileUpload
                  onUploaded={() =>
                    setDocumentCount(
                      (count) => count + 1
                    )
                  }
                />
              </div>

              <div>
                <ChatBox />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}