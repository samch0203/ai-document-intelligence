"use client";

import { ChangeEvent, useState } from "react";
import {
  uploadDocument,
  UploadResponse,
} from "@/services/api";

interface FileUploadProps {
  onUploaded: (
    document: UploadResponse
  ) => void;
}

export default function FileUpload({
  onUploaded,
}: FileUploadProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const result = await uploadDocument(file);

      setMessage(
        `${result.filename} indexed successfully.`
      );

      onUploaded(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Upload failed."
      );
    } finally {
      setLoading(false);
      event.target.value = "";
    }
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-lg font-semibold text-white">
        Upload Document
      </h2>

      <p className="mt-2 text-sm text-slate-400">
        Upload a PDF or TXT file to add it to your
        knowledge base.
      </p>

      <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 p-8 text-center transition hover:border-blue-500 hover:bg-slate-800/50">
        <span className="text-3xl">📄</span>

        <span className="mt-3 font-medium text-slate-200">
          {loading
            ? "Uploading and indexing..."
            : "Choose a document"}
        </span>

        <span className="mt-1 text-xs text-slate-500">
          PDF or TXT
        </span>

        <input
          type="file"
          accept=".pdf,.txt"
          onChange={handleFileChange}
          disabled={loading}
          className="hidden"
        />
      </label>

      {message && (
        <p className="mt-4 rounded-lg bg-green-950/40 p-3 text-sm text-green-400">
          {message}
        </p>
      )}

      {error && (
        <p className="mt-4 rounded-lg bg-red-950/40 p-3 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}