"use client";

import { userService } from "@/services";
import { User } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
   user: User | null;
   loading: boolean;
   login: (token: string) => void;
   logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
   }
   return context;
};

interface AuthProviderProps {
   children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
   const [user, setUser] = useState<User | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      userService
         .getProfile()
         .then((res) => setUser(res.data.data))
         .catch(() => setUser(null))
         .finally(() => setLoading(false));
   }, []);

   const login = async (token: string) => {
      localStorage.setItem("authToken", token);

      const response = await userService.getProfile();

      if (response.data.success) {
         setUser(response.data.data);
      }

      setLoading(false);
   };

   const logout = async () => {
      localStorage.removeItem("authToken");
      setUser(null);
   };

   return (
      <AuthContext.Provider value={{ user, login, logout, loading }}>
         {children}
      </AuthContext.Provider>
   );
};
