export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-sky-900 via-sky-800 to-sky-950 text-white px-6">
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-10 py-24">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-[8rem] leading-none font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-sky-300 to-sky-100">
            404
          </h1>
          <h2 className="mt-4 text-2xl md:text-3xl font-semibold">
            Page not found
          </h2>
          <p className="mt-3 text-sky-200 max-w-lg">
            Sorry, we couldn’t find the page you’re looking for. It may have
            been moved or removed.
          </p>
          <div className="mt-6 flex items-center justify-center md:justify-start gap-4">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-5 py-3 bg-sky-500 hover:bg-sky-400 active:scale-95 transition-transform rounded-md text-white font-medium shadow"
            >
              Go home
            </a>
            <a href="/contact" className="text-sky-200 hover:text-white">
              Contact support
            </a>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-64 h-64 rounded-2xl bg-white/5 backdrop-blur-sm flex items-center justify-center shadow-2xl transform -rotate-3">
            <svg
              className="w-40 h-40"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#0369A1" />
                  <stop offset="1" stopColor="#7DD3FC" />
                </linearGradient>
              </defs>
              <circle cx="60" cy="60" r="52" fill="url(#g)" />
              <path
                d="M40 80c10-14 40-14 50 0"
                stroke="#CFFAFE"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M45 45l10 10"
                stroke="#E0F2FE"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M75 45l-10 10"
                stroke="#E0F2FE"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
