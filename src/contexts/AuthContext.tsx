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
  achievements: Achievement[];
  friends: string[];
  referralCode: string;
  referredBy?: string;
  dailyChallenges: DailyChallenge[];
  lastActive: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  earnedAt: string;
  xp: number;
  icon: string;
}

interface DailyChallenge {
  id: string;
  type: 'lesson' | 'quiz' | 'simulator' | 'streak';
  target: number;
  progress: number;
  xpReward: number;
  completed: boolean;
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
  achievements: [],
  friends: [],
  referralCode: generateReferralCode(),
  dailyChallenges: generateDailyChallenges(),
  lastActive: new Date().toISOString(),
};

function generateReferralCode(): string {
  return 'FL' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

function generateDailyChallenges(): DailyChallenge[] {
  return [
    {
      id: 'daily-lesson',
      type: 'lesson',
      target: 3,
      progress: 0,
      xpReward: 50,
      completed: false,
    },
    {
      id: 'daily-quiz',
      type: 'quiz',
      target: 2,
      progress: 0,
      xpReward: 75,
      completed: false,
    },
    {
      id: 'daily-streak',
      type: 'streak',
      target: 1,
      progress: 0,
      xpReward: 25,
      completed: false,
    },
  ];
}

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
    // TODO: Implement with backend
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
      achievements: [],
      friends: [],
      referralCode: generateReferralCode(),
      dailyChallenges: generateDailyChallenges(),
      lastActive: new Date().toISOString(),
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
