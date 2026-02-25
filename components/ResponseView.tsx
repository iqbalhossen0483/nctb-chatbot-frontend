import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  answer: string;
}

export default function ResponseView({ answer }: Props) {
  return (
    <div className="mt-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 prose prose-emerald max-w-none">
          {answer ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{answer}</ReactMarkdown>
          ) : (
            <div className="flex space-x-2 animate-pulse">
              <div className="h-2 w-2 bg-emerald-400 rounded-full"></div>
              <div className="h-2 w-2 bg-emerald-400 rounded-full"></div>
              <div className="h-2 w-2 bg-emerald-400 rounded-full"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
