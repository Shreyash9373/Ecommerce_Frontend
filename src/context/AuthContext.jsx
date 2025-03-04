import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    id: null,
    name: null,
    isLoggedIn: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        await new Promise((resolve, reject) => setTimeout(resolve, 2000));
        setAuth({
          id: "abc123",
        });
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Cannot use 'useAuth' hook outside 'AuthContextProvider'");
  return context;
};
