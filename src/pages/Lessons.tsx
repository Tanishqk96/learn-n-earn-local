import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';
import { 
  BookOpen, 
  CheckCircle2, 
  Lock,
  Coins,
  PiggyBank,
  Calculator,
  TrendingUp,
  Star
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  description: string;
  category: string;
  xp: number;
  duration: string;
  icon: any;
  locked?: boolean;
}

const Lessons = () => {
  const { user, updateUserProgress } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const lessons: Lesson[] = [
    {
      id: 'money-basics-1',
      title: 'What is Money?',
      description: 'Understanding the basics of money and currency',
      category: t('lessons.basics', language),
      xp: 50,
      duration: '5 min',
      icon: Coins,
    },
    {
      id: 'money-basics-2',
      title: 'Income vs Expenses',
      description: 'Learn the difference between earning and spending',
      category: t('lessons.basics', language),
      xp: 50,
      duration: '5 min',
      icon: Calculator,
    },
    {
      id: 'savings-1',
      title: 'Why Save Money?',
      description: 'The importance of building savings habits',
      category: t('lessons.savings', language),
      xp: 75,
      duration: '7 min',
      icon: PiggyBank,
    },
    {
      id: 'savings-2',
      title: 'Emergency Fund',
      description: 'Building your financial safety net',
      category: t('lessons.savings', language),
      xp: 75,
      duration: '7 min',
      icon: Star,
      locked: user?.level && user.level < 2,
    },
    {
      id: 'budgeting-1',
      title: 'Creating a Budget',
      description: 'Plan your spending with the 50-30-20 rule',
      category: t('lessons.budgeting', language),
      xp: 100,
      duration: '10 min',
      icon: Calculator,
      locked: user?.level && user.level < 3,
    },
    {
      id: 'investing-1',
      title: 'Introduction to Investing',
      description: 'Making your money work for you',
      category: t('lessons.investing', language),
      xp: 100,
      duration: '10 min',
      icon: TrendingUp,
      locked: user?.level && user.level < 4,
    },
  ];

  const startLesson = (lesson: Lesson) => {
    if (lesson.locked) return;
    
    // Simulate lesson completion
    if (user && !user.completedLessons.includes(lesson.id)) {
      updateUserProgress({
        completedLessons: [...user.completedLessons, lesson.id],
        xp: user.xp + lesson.xp,
        level: Math.floor((user.xp + lesson.xp) / 100) + 1,
      });
    }
    
    // Navigate to quiz after lesson
    navigate(`/quiz/${lesson.id}`);
  };

  const isCompleted = (lessonId: string) => {
    return user?.completedLessons.includes(lessonId);
  };

  const groupedLessons = lessons.reduce((acc, lesson) => {
    if (!acc[lesson.category]) {
      acc[lesson.category] = [];
    }
    acc[lesson.category].push(lesson);
    return acc;
  }, {} as Record<string, Lesson[]>);

  const totalLessons = lessons.length;
  const completedCount = user?.completedLessons.length || 0;
  const progressPercent = (completedCount / totalLessons) * 100;

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t('lessons.title', language)}
          </h1>
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Your Progress</CardTitle>
                  <CardDescription>
                    {completedCount} of {totalLessons} lessons completed
                  </CardDescription>
                </div>
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={progressPercent} className="h-3" />
            </CardContent>
          </Card>
        </div>

        {/* Lessons by Category */}
        <div className="space-y-8">
          {Object.entries(groupedLessons).map(([category, categoryLessons]) => (
            <div key={category}>
              <h2 className="text-2xl font-bold mb-4">{category}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryLessons.map((lesson, idx) => {
                  const completed = isCompleted(lesson.id);
                  const locked = lesson.locked;

                  return (
                    <Card 
                      key={lesson.id}
                      className={`hover:shadow-hover transition-all ${
                        locked ? 'opacity-60' : 'cursor-pointer'
                      }`}
                      onClick={() => !locked && startLesson(lesson)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <div className={`w-12 h-12 rounded-lg ${
                            completed ? 'bg-success/10' : 'bg-primary/10'
                          } flex items-center justify-center`}>
                            {completed ? (
                              <CheckCircle2 className="h-6 w-6 text-success" />
                            ) : locked ? (
                              <Lock className="h-6 w-6 text-muted-foreground" />
                            ) : (
                              <lesson.icon className="h-6 w-6 text-primary" />
                            )}
                          </div>
                          {completed && (
                            <Badge variant="secondary" className="bg-success/10 text-success">
                              {t('lessons.completed', language)}
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg">{lesson.title}</CardTitle>
                        <CardDescription>{lesson.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>⏱️ {lesson.duration}</span>
                          <span className="font-semibold text-accent">+{lesson.xp} XP</span>
                        </div>
                        <Button 
                          variant={completed ? 'outline' : locked ? 'outline' : 'default'}
                          className="w-full"
                          disabled={locked}
                          onClick={(e) => {
                            e.stopPropagation();
                            !locked && startLesson(lesson);
                          }}
                        >
                          {locked ? (
                            <>
                              <Lock className="h-4 w-4 mr-2" />
                              Level {Math.ceil(lessons.indexOf(lesson) / 2) + 1} Required
                            </>
                          ) : completed ? (
                            t('lessons.continue', language)
                          ) : (
                            t('lessons.start', language)
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lessons;
