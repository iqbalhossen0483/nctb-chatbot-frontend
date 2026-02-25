"use client";
import ChatInput from "@/components/ChatInput";
import Header from "@/components/Header";
import ResponseView from "@/components/ResponseView";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Container() {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const conversationId = searchParams.get("conversationId");

  const handleAsk = async (question: string) => {
    // Reset states
    setAnswer("");
    setLoading(true);
    setError("");

    try {
      let url = `${process.env.NEXT_PUBLIC_API_URL}/chats?message=${question}&userId=1`;

      if (conversationId) {
        url += `&conversationId=${conversationId}`;
      }
      const response = await fetch(url);

      if (!response.ok) throw new Error("Failed to connect to server");

      // 1. Get the reader from the response body
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error("No reader available");

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        // 2. Decode the chunk
        const chunk = decoder.decode(value, { stream: true });

        // 3. SSE format
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data:")) {
            try {
              const strJson = line.replace("data:", "").trim();
              if (!strJson) continue;

              const parsed = JSON.parse(strJson);

              if (parsed.done) {
                setLoading(false);
                break;
              }

              if (parsed.text) {
                setAnswer((prev) => prev + parsed.text);
              }
              if (parsed.conversationId) {
                const params = new URLSearchParams(searchParams.toString());
                params.set("conversationId", parsed.conversationId);
                router.replace(`?${params.toString()}`);
              }
            } catch (e) {
              console.error("Error parsing chunk", e);
            }
          }
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <Header />
      <div className="max-w-4xl mx-auto px-4">
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">
            NCTB Biology AI
          </h2>
        </div>

        <ChatInput onSend={handleAsk} loading={loading} />

        {error && (
          <div className="mt-8 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {(answer || loading) && <ResponseView answer={answer} />}
      </div>
    </main>
  );
}
