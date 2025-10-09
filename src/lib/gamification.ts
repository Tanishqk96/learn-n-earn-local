// Gamification system for FinLearn

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: (user: any) => boolean;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  type: 'daily' | 'weekly' | 'seasonal';
  target: number;
  xpReward: number;
  badgeReward?: string;
}

export const BADGES: Badge[] = [
  {
    id: 'first-lesson',
    name: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎓',
    tier: 'bronze',
    requirement: (user) => user.completedLessons.length >= 1,
  },
  {
    id: 'lesson-master',
    name: 'Lesson Master',
    description: 'Complete 10 lessons',
    icon: '📚',
    tier: 'silver',
    requirement: (user) => user.completedLessons.length >= 10,
  },
  {
    id: 'quiz-champion',
    name: 'Quiz Champion',
    description: 'Pass 5 quizzes',
    icon: '🏆',
    tier: 'gold',
    requirement: (user) => user.completedQuizzes.length >= 5,
  },
  {
    id: 'streak-7',
    name: 'Week Warrior',
    description: '7 day learning streak',
    icon: '🔥',
    tier: 'silver',
    requirement: (user) => user.streak >= 7,
  },
  {
    id: 'streak-30',
    name: 'Monthly Master',
    description: '30 day learning streak',
    icon: '⚡',
    tier: 'platinum',
    requirement: (user) => user.streak >= 30,
  },
  {
    id: 'xp-1000',
    name: 'XP Collector',
    description: 'Earn 1000 XP',
    icon: '⭐',
    tier: 'gold',
    requirement: (user) => user.xp >= 1000,
  },
  {
    id: 'level-5',
    name: 'Rising Star',
    description: 'Reach Level 5',
    icon: '🌟',
    tier: 'silver',
    requirement: (user) => user.level >= 5,
  },
  {
    id: 'level-10',
    name: 'Expert Learner',
    description: 'Reach Level 10',
    icon: '💎',
    tier: 'platinum',
    requirement: (user) => user.level >= 10,
  },
  {
    id: 'referral-3',
    name: 'Team Builder',
    description: 'Refer 3 friends',
    icon: '🤝',
    tier: 'gold',
    requirement: (user) => user.friends?.length >= 3,
  },
  {
    id: 'budget-master',
    name: 'Budget Master',
    description: 'Complete 10 budget simulations',
    icon: '💰',
    tier: 'silver',
    requirement: (user) => user.completedSimulations >= 10,
  },
];

export const TIER_LEVELS = {
  beginner: { name: 'Beginner', maxLevel: 3, color: 'text-gray-500' },
  saver: { name: 'Saver', maxLevel: 6, color: 'text-blue-500' },
  investor: { name: 'Investor', maxLevel: 10, color: 'text-purple-500' },
  expert: { name: 'Expert', maxLevel: Infinity, color: 'text-yellow-500' },
};

export function calculateLevel(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

export function getXpForNextLevel(currentLevel: number): number {
  return currentLevel * 100;
}

export function getTierForLevel(level: number): keyof typeof TIER_LEVELS {
  if (level <= 3) return 'beginner';
  if (level <= 6) return 'saver';
  if (level <= 10) return 'investor';
  return 'expert';
}

export function checkNewBadges(user: any, previousUser: any): Badge[] {
  const newBadges: Badge[] = [];
  
  BADGES.forEach(badge => {
    const hasNow = badge.requirement(user);
    const hadBefore = previousUser ? badge.requirement(previousUser) : false;
    
    if (hasNow && !hadBefore && !user.badges?.includes(badge.id)) {
      newBadges.push(badge);
    }
  });
  
  return newBadges;
}

export function generateWeeklyChallenges(): Challenge[] {
  return [
    {
      id: 'weekly-lessons',
      name: 'Learning Marathon',
      description: 'Complete 15 lessons this week',
      type: 'weekly',
      target: 15,
      xpReward: 200,
      badgeReward: 'weekly-champion',
    },
    {
      id: 'weekly-quizzes',
      name: 'Quiz Master',
      description: 'Pass 10 quizzes this week',
      type: 'weekly',
      target: 10,
      xpReward: 150,
    },
    {
      id: 'weekly-simulator',
      name: 'Budget Pro',
      description: 'Complete 5 budget simulations',
      type: 'weekly',
      target: 5,
      xpReward: 100,
    },
  ];
}
