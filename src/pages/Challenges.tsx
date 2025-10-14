import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';
import { Target, Trophy, Zap, Calendar, CheckCircle2, Clock } from 'lucide-react';

const Challenges = () => {
  const { user, updateUserProgress } = useAuth();
  const { language } = useLanguage();

  if (!user) return null;

  const dailyChallenges = user.dailyChallenges || [];

  const weeklyChallenges = [
    {
      id: 'weekly-lessons',
      name: 'Learning Marathon',
      description: 'Complete 10 lessons this week',
      progress: Math.min(user.completedLessons.length, 10),
      target: 10,
      xpReward: 150,
      type: 'weekly' as const,
    },
    {
      id: 'weekly-quizzes',
      name: 'Quiz Champion',
      description: 'Pass 5 quizzes this week',
      progress: Math.min(user.completedQuizzes.length, 5),
      target: 5,
      xpReward: 100,
      type: 'weekly' as const,
    },
    {
      id: 'weekly-streak',
      name: 'Streak Keeper',
      description: 'Maintain 7 day streak',
      progress: Math.min(user.streak, 7),
      target: 7,
      xpReward: 120,
      type: 'weekly' as const,
    },
  ];

  const getChallengeIcon = (type: string) => {
    switch (type) {
      case 'daily':
        return <Calendar className="h-5 w-5" />;
      case 'weekly':
        return <Target className="h-5 w-5" />;
      default:
        return <Zap className="h-5 w-5" />;
    }
  };

  const claimReward = (challengeId: string, xpReward: number) => {
    if (user) {
      updateUserProgress({
        xp: user.xp + xpReward,
        dailyChallenges: user.dailyChallenges.map(c =>
          c.id === challengeId ? { ...c, completed: true } : c
        ),
      });
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-2">
            <Target className="h-8 w-8 text-primary" />
            Daily & Weekly Challenges
          </h1>
          <p className="text-muted-foreground">Complete challenges to earn bonus XP and badges</p>
        </div>

        {/* Daily Challenges */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              Daily Challenges
            </h2>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Resets in 8h 32m
            </Badge>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {dailyChallenges.map((challenge) => {
              const progressPercent = (challenge.progress / challenge.target) * 100;
              const isCompleted = challenge.progress >= challenge.target;

              return (
                <Card
                  key={challenge.id}
                  className={`shadow-card ${
                    isCompleted ? 'border-success bg-success/5' : ''
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className={`w-12 h-12 rounded-lg ${
                        isCompleted ? 'bg-success/10' : 'bg-primary/10'
                      } flex items-center justify-center`}>
                        {isCompleted ? (
                          <CheckCircle2 className="h-6 w-6 text-success" />
                        ) : (
                          <Target className="h-6 w-6 text-primary" />
                        )}
                      </div>
                      {isCompleted && (
                        <Badge variant="secondary" className="bg-success/10 text-success">
                          Completed
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg capitalize">
                      {challenge.type} Challenge
                    </CardTitle>
                    <CardDescription>
                      {challenge.type === 'lesson' && 'Complete 3 lessons'}
                      {challenge.type === 'quiz' && 'Pass 2 quizzes'}
                      {challenge.type === 'simulator' && 'Complete 1 simulation'}
                      {challenge.type === 'streak' && 'Learn today'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-semibold">
                          {challenge.progress} / {challenge.target}
                        </span>
                      </div>
                      <Progress value={progressPercent} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-accent">
                        +{challenge.xpReward} XP
                      </span>
                      {isCompleted && !challenge.completed && (
                        <Button
                          size="sm"
                          onClick={() => claimReward(challenge.id, challenge.xpReward)}
                        >
                          Claim Reward
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Weekly Challenges */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Trophy className="h-6 w-6 text-accent" />
              Weekly Challenges
            </h2>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Resets in 3 days
            </Badge>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {weeklyChallenges.map((challenge) => {
              const progressPercent = (challenge.progress / challenge.target) * 100;
              const isCompleted = challenge.progress >= challenge.target;

              return (
                <Card
                  key={challenge.id}
                  className={`shadow-card ${
                    isCompleted ? 'border-accent bg-accent/5' : ''
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className={`w-12 h-12 rounded-lg ${
                        isCompleted ? 'bg-accent/10' : 'bg-secondary/10'
                      } flex items-center justify-center`}>
                        {isCompleted ? (
                          <Trophy className="h-6 w-6 text-accent" />
                        ) : (
                          <Target className="h-6 w-6 text-secondary" />
                        )}
                      </div>
                      {isCompleted && (
                        <Badge variant="secondary" className="bg-accent/10 text-accent">
                          Completed
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{challenge.name}</CardTitle>
                    <CardDescription>{challenge.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-semibold">
                          {challenge.progress} / {challenge.target}
                        </span>
                      </div>
                      <Progress value={progressPercent} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-accent">
                        +{challenge.xpReward} XP
                      </span>
                      {isCompleted && (
                        <Badge className="bg-gradient-gamify">
                          <Trophy className="h-3 w-3 mr-1" />
                          Bonus Badge
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Seasonal Challenges Teaser */}
        <Card className="mt-8 bg-gradient-card shadow-glow">
          <CardContent className="p-8 text-center">
            <Zap className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-2">Seasonal Challenges Coming Soon!</h3>
            <p className="text-muted-foreground mb-4">
              Special limited-time challenges with exclusive rewards
            </p>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Trophy className="h-4 w-4 mr-2" />
              Stay Tuned
            </Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Challenges;
