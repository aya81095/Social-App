import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "./../../context/Auth.context";
import usePosts from "../../hooks/usePosts";
import { useUser } from "../../context/userContext";
export function LeftSidebar() {
  const { user } = useContext(AuthContext);
  const { userNewPosts } = usePosts();
  const { userData } = useUser();

  return (
    <aside
      className="hidden md:flex md:flex-col gap-4 p-4
             sticky top-24
             h-fit
             md:col-span-3
             border border-sky-200 rounded-xl bg-white shadow-lg"
    >
      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 rounded-md bg-sky-600 flex items-center justify-center text-white font-extrabold">
          V
        </div>
        <div>
          <div className="font-semibold text-lg text-gray-700">VibeApp</div>
          <div className="text-xs text-gray-400">
            Connect with friends and creators
          </div>
        </div>
      </div>

      {/* Profile quick view */}
      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-sky-50">
        <div className="w-12 h-12 rounded-full bg-sky-200 flex items-center justify-center text-sky-700 font-medium">
          {userData?.name
            ?.split(" ")
            .map((word) => word.charAt(0).toUpperCase())
            .join("")}
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-700">
            {userData?.name}
          </div>
          <div className="text-xs text-gray-400">@{userData?.name}</div>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-sky-50"
        >
          <svg
            className="w-5 h-5 text-sky-600"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M3 10.5L12 4l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10.5z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-sm font-medium">Home</span>
        </Link>

        <Link
          to=""
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-sky-50"
        >
          <svg
            className="w-5 h-5 text-sky-500"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6 6 0 1 0-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.73 21a2 2 0 0 1-3.46 0"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-sm font-medium">Notifications</span>
          <span className="ml-auto inline-flex items-center justify-center text-xs font-medium px-2 py-0.5 rounded-full bg-red-500 text-white">
            3
          </span>
        </Link>

        <Link
          to=""
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-sky-50"
        >
          <svg
            className="w-5 h-5 text-sky-500"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M21 12l-9 7L3 12l9-7 9 7z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-sm font-medium">Explore</span>
        </Link>

        <Link
          to=""
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-sky-50"
        >
          <svg
            className="w-5 h-5 text-sky-500"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-sm font-medium">Messages</span>
        </Link>

        <Link
          to=""
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-sky-50"
        >
          <svg
            className="w-5 h-5 text-sky-500"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M6 2h8l4 4v14l-8-4-8 4V6l4-4z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-sm font-medium">Bookmarks</span>
        </Link>
      </nav>
    </aside>
  );
}
