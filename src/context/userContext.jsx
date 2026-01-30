import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./Auth.context";

const UserContext = createContext();

export function UserProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    try {
      const { data } = await axios.get(
        "https://linked-posts.routemisr.com/users/profile-data",
        { headers: { token } },
      );
      setUserData(data.user);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  const updateProfilePhoto = async (file) => {
    try {
      const formData = new FormData();
      formData.append("photo", file);

      const { data } = await axios.put(
        "https://linked-posts.routemisr.com/users/upload-photo",
        formData,
        { headers: { token } },
      );

      if (data.message === "success") {
        setUserData((prev) => ({ ...prev, photo: data.user.photo }));
        return true;
      }
    } catch (error) {
      console.log("Error updating profile photo:", error);
      return false;
    }
  };

  useEffect(() => {
    if (token) getUserData();
  }, [token]);

  return (
    <UserContext.Provider
      value={{ userData, setUserData, getUserData, updateProfilePhoto }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
