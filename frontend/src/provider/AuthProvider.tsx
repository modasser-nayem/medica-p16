"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
   user: string | null;
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
   const [user, setUser] = useState<string | null>(null);

   useEffect(() => {
      setUser("Ali Modasser Nayem");
   }, []);

   return (
      <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
   );
};
