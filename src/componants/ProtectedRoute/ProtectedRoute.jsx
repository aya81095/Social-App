import { useContext } from "react";
import { AuthContext } from "../../context/Auth.context";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);

  if (token) {
    return children;
  } else {
    return <Navigate to={"/Login"} />;
  }
}
