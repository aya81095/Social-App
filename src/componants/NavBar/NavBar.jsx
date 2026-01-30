// NavBar.jsx
import { Link } from "react-router";
import avatarImage from "../../assets/images/avatar.png";
import { useUser } from "../../context/userContext";
import { useContext, useState } from "react";
import { AuthContext } from "./../../context/Auth.context";
import { useNavigate } from "react-router";

export default function NavBar() {
  const { userData } = useUser();
  const { setToken, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const openModal = () => setIsLogoutModalOpen(true);
  const closeModal = () => setIsLogoutModalOpen(false);

  const handleLogout = () => {
    // مسح البيانات
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    closeModal();
    navigate("/login");
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white border-b border-white/6">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 shadow-lg">
          <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-sky-600 flex items-center justify-center text-white font-extrabold">
                V
              </div>
              <span className="text-lg font-semibold text-sky-600">
                VibeApp
              </span>
            </Link>

            {/* Right actions */}
            <div className="flex items-center gap-4">
              <Link
                to="/profile"
                aria-label="Profile"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-sm font-medium text-sky-600 shadow hover:shadow-lg transition-shadow"
              >
                <img
                  src={userData?.photo || avatarImage}
                  alt=""
                  className="size-full rounded-full object-cover"
                />
              </Link>

              {/* Logout button */}
              <button
                onClick={openModal}
                aria-label="Logout"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-lg font-medium text-red-500 shadow hover:shadow-lg transition-shadow"
              >
                <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* spacer for fixed header */}
      <div className="h-16" aria-hidden="true" />

      {/* Logout Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 transition-opacity duration-300">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg animate-fade-in">
            <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(-10px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out;
          }
        `}
      </style>
    </>
  );
}
