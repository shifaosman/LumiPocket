export default function Loading() {
  return (
    <div className="grid gap-4">
      <div className="card-surface relative h-40 overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card-surface relative h-28 overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>
        <div className="card-surface relative h-28 overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>
      </div>
    </div>
  );
}
