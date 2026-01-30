import { Link } from "react-router";
export function RightSidebar() {
  return (
    <aside
      className="hidden lg:flex lg:flex-col gap-6 p-4
             sticky top-24
             h-fit
             lg:col-span-3
             border border-sky-200 rounded-xl bg-white shadow-lg"
    >
      <input
        type="text"
        placeholder="Search"
        className="w-full pl-4 placeholder-gray-400 text-sm outline-none py-1.5 border border-sky-200 rounded-full bg-sky-50"
      />

      <section className="bg-white/5 border border-sky-200 rounded-xl p-3">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Trending</h3>
        <ul className="flex flex-col gap-3">
          <li className="flex items-start justify-between">
            <div>
              <div className="text-sm font-medium text-gray-700">#Design</div>
              <div className="text-xs text-gray-400">12.4k posts</div>
            </div>
            <div className="text-xs text-gray-400">▲ 8%</div>
          </li>

          <li className="flex items-start justify-between">
            <div>
              <div className="text-sm font-medium text-gray-700">#Tailwind</div>
              <div className="text-xs text-gray-400">4.1k posts</div>
            </div>
            <div className="text-xs text-gray-400">▲ 12%</div>
          </li>

          <li className="flex items-start justify-between">
            <div>
              <div className="text-sm font-medium text-gray-700">#React</div>
              <div className="text-xs text-gray-400">9.6k posts</div>
            </div>
            <div className="text-xs text-gray-400">▲ 2%</div>
          </li>
        </ul>
        <Link className="mt-3 inline-block text-sm text-sky-600" to="">
          See all
        </Link>
      </section>

      <section className="bg-white/5 border border-sky-200 rounded-xl p-3">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          Who to follow
        </h3>
        <ul className="flex flex-col gap-3">
          <li className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-sky-200 flex items-center justify-center text-sky-700 font-medium">
                AR
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700">
                  Ari Reed
                </div>
                <div className="text-xs text-gray-400">
                  Artist · 1.2k followers
                </div>
              </div>
            </div>
            <button className="text-sm bg-sky-600 text-white px-3 py-1 rounded-md">
              Follow
            </button>
          </li>

          <li className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-sky-200 flex items-center justify-center text-sky-700 font-medium">
                MK
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700">
                  Maya Kim
                </div>
                <div className="text-xs text-gray-400">
                  Developer · 820 followers
                </div>
              </div>
            </div>
            <button className="text-sm bg-sky-600 text-white px-3 py-1 rounded-md">
              Follow
            </button>
          </li>
        </ul>
        <Link className="mt-3 inline-block text-sm text-sky-600" to="">
          Discover
        </Link>
      </section>

      <div className="text-xs text-gray-400">© SocialApp</div>
    </aside>
  );
}
