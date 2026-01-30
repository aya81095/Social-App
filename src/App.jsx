import favicon from "./assets/images/V-logo.svg.png";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import PostDetails from "./pages/PostDetails/PostDetails";
import NotFound from "./pages/NotFound/NotFound";
import Profile from "./pages/Profile/Profile";
import AuthProvider from "./context/Auth.context";
import ProtectedRoute from "./componants/ProtectedRoute/ProtectedRoute";
import AuthRoute from "./componants/AuthRoute/AuthRoute";
import { UserProvider } from "./context/userContext";
export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: "/signup",
      element: (
        <AuthRoute>
          <Signup />
        </AuthRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <AuthRoute>
          <Login />
        </AuthRoute>
      ),
    },
    {
      path: "/Home/:id",
      element: (
        <ProtectedRoute>
          <PostDetails />
        </ProtectedRoute>
      ),
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <>
      <AuthProvider>
        <UserProvider>
          <RouterProvider router={router} />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </UserProvider>
      </AuthProvider>
    </>
  );
}
