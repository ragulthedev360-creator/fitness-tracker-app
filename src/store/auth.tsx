// import React, { createContext, useContext, useState } from "react";

// interface UserType {
//   id: string;
//   name: string;
// }

// interface AuthContextType {
//   user: UserType | null;
//   login: (userdata: UserType) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   login: () => {},
//   logout: () => {},
// });

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<UserType | null>(null);

//   const login = (userdata: UserType) => {
//     setUser(userdata);
//   };
// const logout = () => setUser(null);



//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
// context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserType {
  id: string;
  name: string;
}

interface AuthContextType {
  user: UserType | null;
  loading: boolean;
  login: (userdata: UserType, token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  // Load token on app start
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const userData = await AsyncStorage.getItem("user");

        if (token && userData) {
          setUser(JSON.parse(userData));
        }
      } catch (err) {
        // console.error("Error loading user from storage:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = async (userdata: UserType, token: string) => {
    try {
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(userdata));
      setUser(userdata);
    } catch (err) {
      // console.error("Error saving user token:", err);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (err) {
      // console.error("Error removing token:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier usage
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

