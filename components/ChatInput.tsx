"use client";
import { useState } from "react";

export default function ChatInput({
  onSend,
  loading,
}: {
  onSend: (q: string) => void;
  loading: boolean;
}) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !loading) onSend(query);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <div className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a biology question (e.g., What is Mitosis?)"
          className="w-full p-4 pr-16 rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
        />
        <button
          disabled={loading}
          className="absolute right-2 top-2 bottom-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors disabled:bg-slate-300"
        >
          {loading ? "..." : "Ask"}
        </button>
      </div>
    </form>
  );
}
