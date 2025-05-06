import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const navigate = useNavigate();

  const fetchUser = async (includeAddresses = true) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setUser(null);
        setLoadingUser(false);
        return;
      }
  
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/user/get-user`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true,
          params: {
            includeAddresses: includeAddresses
          }
        }
      );
      
      console.log('Full API response:', data); // Debug entire response
      
      if (!data) {
        throw new Error("Empty response from server");
      }
  
      if (data.user) {
        const userData = {
          ...data.user,
          // Ensure addresses is always an array
          addresses: Array.isArray(data.user.addresses) ? data.user.addresses : []
        };
        
        console.log('Processed user data:', userData);
        setUser(userData);
        
        // Update token if new one was returned
        if (data.accessToken) {
          localStorage.setItem('accessToken', data.accessToken);
        }
        return userData; // Return the user data for verification
      } else {
        throw new Error("User data missing in response");
      }
    } catch (error) {
      console.error("Detailed fetch error:", {
        message: error.message,
        response: error.response?.data,
        stack: error.stack
      });
      
      // Don't logout for non-auth errors
      if (error.response?.status !== 401) {
        console.warn("Non-auth error, maintaining session");
        return null;
      }
      
      handleAuthError(error);
      return null;
    } finally {
      setLoadingUser(false);
    }
  };

  const handleAuthError = (error) => {
    // Handle 401 Unauthorized or other auth errors
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      setUser(null);
      toast.error("Session expired. Please login again.");
      navigate("/login");
    } else {
      console.error("Authentication error:", error);
    }
  };

  const login = async (email, password) => {
    try {
      setLoadingUser(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/user/login`,
        { email, password },
        { withCredentials: true }
      );

      if (data?.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
        await fetchUser(true); // Fetch user with addresses after login
        toast.success("Logged in successfully");
        return true;
      }
      throw new Error("Login failed - no token received");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed");
      return false;
    } finally {
      setLoadingUser(false);
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        // Already logged out locally
        setUser(null);
        return;
      }
  
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear client-side state regardless of server response
      localStorage.removeItem('accessToken');
      setUser(null);
      navigate("/login");
      toast.success("Logged out successfully");
    }
  };

  const updateUserAddresses = (updatedAddresses) => {
    setUser(prevUser => ({
      ...prevUser,
      addresses: updatedAddresses
    }));
  };

  useEffect(() => {
    // Fetch user with addresses on initial load
    fetchUser(true);
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user,
      setUser,
      loadingUser,
      login,
      logout,
      fetchUser,
      updateUserAddresses
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