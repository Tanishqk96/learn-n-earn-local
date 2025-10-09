import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';
import { 
  Trophy, 
  Flame, 
  Star, 
  BookOpen, 
  Target,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { language } = useLanguage();

  if (!user) return null;

  const levelProgress = (user.xp % 100);
  const nextLevelXP = 100;

  const stats = [
    {
      label: t('dashboard.xp', language),
      value: user.xp,
      icon: Star,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      label: t('dashboard.level', language),
      value: user.level,
      icon: Trophy,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: t('dashboard.streak', language),
      value: user.streak,
      icon: Flame,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      label: t('dashboard.lessons', language),
      value: user.completedLessons.length,
      icon: BookOpen,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
  ];

  const quickActions = [
    {
      title: 'Continue Learning',
      desc: 'Pick up where you left off',
      icon: BookOpen,
      link: '/lessons',
      variant: 'default' as const,
    },
    {
      title: 'Take a Quiz',
      desc: 'Test your knowledge',
      icon: Target,
      link: '/lessons',
      variant: 'gamify' as const,
    },
    {
      title: 'Budget Simulator',
      desc: 'Practice money management',
      icon: TrendingUp,
      link: '/simulator',
      variant: 'secondary' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">
            {t('dashboard.welcome', language)}, {user.email || t('dashboard.guest', language)}! 👋
          </h1>
          {user.isGuest && (
            <Badge variant="outline" className="text-sm">
              <Zap className="h-3 w-3 mr-1" />
              Guest Mode - Progress saved locally
            </Badge>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <Card 
              key={idx} 
              className="hover:shadow-hover transition-all animate-bounce-in"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <CardHeader className="pb-3">
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center mb-2`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <CardTitle className="text-2xl md:text-3xl font-bold">{stat.value}</CardTitle>
                <CardDescription>{stat.label}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Level Progress */}
        <Card className="mb-8 shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Level {user.level}</CardTitle>
                <CardDescription>{levelProgress} / {nextLevelXP} XP to next level</CardDescription>
              </div>
              <Award className="h-8 w-8 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={levelProgress} className="h-3" />
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {quickActions.map((action, idx) => (
              <Card 
                key={idx} 
                className="hover:shadow-hover transition-all group cursor-pointer"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-card flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <action.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                  <CardDescription>{action.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant={action.variant} className="w-full">
                    <Link to={action.link}>Start</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Badges Section */}
        {user.badges.length > 0 && (
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Your Badges</CardTitle>
              <CardDescription>Achievements you've earned</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {user.badges.map((badge, idx) => (
                  <Badge key={idx} variant="secondary" className="text-sm px-3 py-2">
                    <Trophy className="h-3 w-3 mr-1" />
                    {badge}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
