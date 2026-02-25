export default function Header() {
  return (
    <header className="py-6 border-b bg-white/80 backdrop-blur-md sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-emerald-700">
          BioGuide <span className="text-slate-400 font-light">NCTB AI</span>
        </h1>
        <div className="text-xs font-medium bg-emerald-100 text-emerald-800 px-2 py-1 rounded">
          HSC Biology
        </div>
      </div>
    </header>
  );
}
