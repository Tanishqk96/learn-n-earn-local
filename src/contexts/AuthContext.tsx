import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email?: string;
  isGuest: boolean;
  xp: number;
  level: number;
  streak: number;
  completedLessons: string[];
  completedQuizzes: string[];
  badges: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  loginAsGuest: () => void;
  logout: () => void;
  updateUserProgress: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const GUEST_USER: User = {
  id: 'guest',
  isGuest: true,
  xp: 0,
  level: 1,
  streak: 0,
  completedLessons: [],
  completedQuizzes: [],
  badges: [],
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('finlearn-user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('finlearn-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('finlearn-user');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    // TODO: Implement with Lovable Cloud/Supabase
    // For now, simulate login
    const mockUser: User = {
      id: email,
      email,
      isGuest: false,
      xp: 0,
      level: 1,
      streak: 0,
      completedLessons: [],
      completedQuizzes: [],
      badges: [],
    };
    setUser(mockUser);
  };

  const register = async (email: string, password: string) => {
    // TODO: Implement with Lovable Cloud/Supabase
    await login(email, password);
  };

  const loginAsGuest = () => {
    const guestData = localStorage.getItem('finlearn-guest-progress');
    const guestUser = guestData ? JSON.parse(guestData) : { ...GUEST_USER };
    setUser(guestUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserProgress = (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    
    if (user.isGuest) {
      localStorage.setItem('finlearn-guest-progress', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, loginAsGuest, logout, updateUserProgress }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
