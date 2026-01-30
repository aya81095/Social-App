export default function Loading({ message = "Loading...", fullscreen = true }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={
        (fullscreen
          ? "fixed inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm"
          : "inline-flex") + " p-4"
      }
    >
      <div className="flex items-center gap-6 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-lg p-6 max-w-lg w-full">
        {/* Spinner + Brand */}
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg
              className="animate-spin w-12 h-12 text-transparent"
              viewBox="0 0 24 24"
              fill="none"
            >
              <defs>
                <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#0369A1" />
                  <stop offset="50%" stopColor="#0EA5E9" />
                  <stop offset="100%" stopColor="#7DD3FC" />
                </linearGradient>
              </defs>
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="url(#g)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="56"
                strokeDashoffset="20"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-sky-700 to-sky-200 flex items-center justify-center text-white text-sm font-semibold select-none">
                V
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {message}
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Loading feed & activities…
            </div>
          </div>
        </div>

        {/* Skeleton preview (social feed style) */}
        <div className="ml-auto hidden sm:flex flex-col gap-3 w-36">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-20 animate-pulse" />
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-14 animate-pulse" />
            </div>
          </div>

          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full animate-pulse" />
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-5/6 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
