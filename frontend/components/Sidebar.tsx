interface SidebarProps {
  documentCount: number;
}

export default function Sidebar({
  documentCount,
}: SidebarProps) {
  return (
    <aside className="hidden w-64 border-r border-slate-800 bg-slate-950 p-6 md:block">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Workspace
        </p>

        <div className="mt-4 rounded-xl bg-slate-900 p-4">
          <p className="text-sm text-slate-400">
            Documents
          </p>

          <p className="mt-1 text-2xl font-bold text-white">
            {documentCount}
          </p>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          AI Assistant
        </p>

        <p className="mt-3 text-sm leading-6 text-slate-400">
          Upload your documents and ask questions
          about their contents.
        </p>
      </div>
    </aside>
  );
}