"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./client";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async (_email: string, _password: string): Promise<void> => {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  },
  logout: async (): Promise<void> => {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        document.cookie = `firebase-token=${token}; path=/; max-age=3600; SameSite=Strict`;
      } else {
        document.cookie = "firebase-token=; path=/; max-age=0";
      }
    });

    return () => unsubscribe();
  }, []);

  async function login(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log("Erro no login:", err);
    throw err; // repassa o erro para o FormLogin
  }
}

  async function logout() {
    await signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
