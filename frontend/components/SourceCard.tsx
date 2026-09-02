import { Source } from "@/services/api";

interface SourceCardProps {
  source: Source;
}

export default function SourceCard({
  source,
}: SourceCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-blue-400">
          Source {source.source}
        </span>

        <span className="text-xs text-slate-500">
          Chunk {source.chunk_index}
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-400">
        {source.text}
      </p>
    </div>
  );
}