export default function Logo() {
  return (
    <div className="fixed top-6 left-6 z-50 flex items-center gap-3">
      <div className="flex flex-col">
        <span className="text-xl md:text-2xl font-bold text-brass tracking-tight" style={{ fontFamily: 'Unbounded, sans-serif' }}>
          VELES
        </span>
        <span className="hidden md:block text-[10px] text-steel/60 tracking-wider uppercase">
          Свет под контролем
        </span>
      </div>
    </div>
  );
}
