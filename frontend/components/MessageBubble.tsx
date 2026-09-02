interface MessageBubbleProps {
  role: "user" | "assistant";
  message: string;
}

export default function MessageBubble({
  role,
  message,
}: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-5 py-3 ${
          isUser
            ? "bg-blue-600 text-white"
            : "border border-slate-700 bg-slate-800 text-slate-200"
        }`}
      >
        <p className="whitespace-pre-wrap text-sm leading-6">
          {message}
        </p>
      </div>
    </div>
  );
}