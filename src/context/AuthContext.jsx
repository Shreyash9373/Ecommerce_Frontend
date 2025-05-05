import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setUser(null);
        setLoadingUser(false);
        return;
      }

      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/v1/user/get-user`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      
      if (data?.user) {
        setUser(data.user);
        localStorage.setItem('accessToken', data.accessToken || token);
      } else {
        throw new Error("Invalid user data");
      }
    } catch (error) {
      console.error("Fetch user error:", error);
      localStorage.removeItem('accessToken');
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/user/logout`, 
        {}, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          },
          withCredentials: true
        }
      );
      localStorage.removeItem('accessToken');
      setUser(null);
      navigate("/");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout properly");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser, 
      logout, 
      loadingUser,
      fetchUser // Add this to allow manual refreshes
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};