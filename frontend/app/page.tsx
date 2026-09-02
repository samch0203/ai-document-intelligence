import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="text-2xl font-bold">
          DocuMind<span className="text-blue-400">AI</span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm text-slate-300 hover:text-white"
          >
            Sign In
          </Link>

          <Link
            href="/register"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <section className="mx-auto flex min-h-[80vh] max-w-7xl items-center px-6">
        <div className="max-w-3xl">
          <div className="mb-6 inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            AI-Powered Document Intelligence
          </div>

          <h1 className="text-5xl font-bold leading-tight md:text-7xl">
            Talk to your
            <span className="text-blue-400">
              {" "}documents.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Upload business documents and ask questions
            using natural language. Get intelligent answers
            backed by relevant document sources.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/register"
              className="rounded-xl bg-blue-600 px-7 py-3.5 font-semibold hover:bg-blue-700"
            >
              Start for Free
            </Link>

            <Link
              href="/login"
              className="rounded-xl border border-slate-700 px-7 py-3.5 font-semibold hover:bg-slate-900"
            >
              Sign In
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Feature
              title="Upload"
              text="Upload PDF and TXT documents."
            />

            <Feature
              title="Ask"
              text="Ask questions in natural language."
            />

            <Feature
              title="Cite"
              text="See the sources behind every answer."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function Feature({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">
        {text}
      </p>
    </div>
  );
}