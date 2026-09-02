"use client";

import { FormEvent, useState } from "react";
import {
  askQuestion,
  ChatResponse,
} from "@/services/api";

import MessageBubble from "./MessageBubble";
import SourceCard from "./SourceCard";

interface Message {
  role: "user" | "assistant";
  message: string;
  sources?: ChatResponse["sources"];
}

export default function ChatBox() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<
    Message[]
  >([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || loading) return;

    setError("");

    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        message: trimmedQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const response =
        await askQuestion(trimmedQuestion);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          message: response.answer,
          sources: response.sources,
        },
      ]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to get an answer."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[650px] flex-col rounded-2xl border border-slate-800 bg-slate-900">
      <div className="border-b border-slate-800 p-5">
        <h2 className="font-semibold text-white">
          AI Document Assistant
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Ask questions about your uploaded documents.
        </p>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto p-5">
        {messages.length === 0 && (
          <div className="flex min-h-[450px] items-center justify-center text-center">
            <div>
              <div className="text-5xl">🤖</div>

              <h3 className="mt-4 text-lg font-semibold text-white">
                Ask your documents anything
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Upload a document first, then ask a
                question about its contents.
              </p>
            </div>
          </div>
        )}

        {messages.map((item, index) => (
          <div key={index} className="space-y-3">
            <MessageBubble
              role={item.role}
              message={item.message}
            />

            {item.role === "assistant" &&
              item.sources &&
              item.sources.length > 0 && (
                <div className="ml-0 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Sources
                  </p>

                  {item.sources.map((source) => (
                    <SourceCard
                      key={`${source.document_id}-${source.chunk_index}`}
                      source={source}
                    />
                  ))}
                </div>
              )}
          </div>
        ))}

        {loading && (
          <MessageBubble
            role="assistant"
            message="Thinking..."
          />
        )}

        {error && (
          <div className="rounded-lg bg-red-950/40 p-3 text-sm text-red-400">
            {error}
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-slate-800 p-4"
      >
        <div className="flex gap-3">
          <input
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            placeholder="Ask a question about your documents..."
            className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
          />

          <button
            type="submit"
            disabled={loading || !question.trim()}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Ask
          </button>
        </div>
      </form>
    </div>
  );
}