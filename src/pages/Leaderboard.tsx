import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';
import { Trophy, TrendingUp, Users, Crown, Medal, Award } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  name: string;
  xp: number;
  level: number;
  streak: number;
  badges: number;
  rank: number;
}

const Leaderboard = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'allTime'>('weekly');

  // Generate realistic leaderboard with current user
  const generateLeaderboard = (): LeaderboardEntry[] => {
    const baseData = [
      { name: 'Priya S.', xp: 850, level: 9, streak: 12, badges: 4 },
      { name: 'Rahul K.', xp: 720, level: 8, streak: 8, badges: 3 },
      { name: 'Anjali M.', xp: 680, level: 7, streak: 10, badges: 3 },
      { name: 'Arjun P.', xp: 540, level: 6, streak: 5, badges: 2 },
      { name: 'Divya R.', xp: 480, level: 5, streak: 6, badges: 2 },
      { name: 'Karthik V.', xp: 420, level: 5, streak: 4, badges: 2 },
      { name: 'Sneha T.', xp: 350, level: 4, streak: 3, badges: 1 },
      { name: 'Rohan G.', xp: 280, level: 3, streak: 2, badges: 1 },
    ];
    
    // Add current user if they exist
    let entries = [...baseData];
    if (user) {
      const userName = user.email?.split('@')[0] || 'You';
      entries.push({
        name: userName,
        xp: user.xp,
        level: user.level,
        streak: user.streak,
        badges: user.badges.length,
      });
    }
    
    // Sort by XP and assign ranks
    entries.sort((a, b) => b.xp - a.xp);
    return entries.map((entry, idx) => ({
      id: user && entry.name === (user.email?.split('@')[0] || 'You') ? user.id : `user-${idx}`,
      ...entry,
      rank: idx + 1,
    }));
  };

  const mockLeaderboard = generateLeaderboard();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-500/10 border-yellow-500/50';
      case 2:
        return 'bg-gray-400/10 border-gray-400/50';
      case 3:
        return 'bg-amber-600/10 border-amber-600/50';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-2">
            <Trophy className="h-8 w-8 text-primary" />
            Leaderboard
          </h1>
          <p className="text-muted-foreground">Compete with fellow learners across India</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-sm">Your Rank</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                #{mockLeaderboard.find(e => e.id === user?.id)?.rank || '-'}
              </div>
              <p className="text-xs text-muted-foreground">Out of {mockLeaderboard.length} learners</p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-sm">Your XP</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{user?.xp || 0}</div>
              <p className="text-xs text-muted-foreground">Total experience points</p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-sm">Top 10%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">{user?.level || 1}</div>
              <p className="text-xs text-muted-foreground">Current Level</p>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard Tabs */}
        <Tabs defaultValue="weekly" className="space-y-6">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3">
            <TabsTrigger value="daily">Today</TabsTrigger>
            <TabsTrigger value="weekly">This Week</TabsTrigger>
            <TabsTrigger value="allTime">All Time</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="space-y-4">
            {mockLeaderboard.map((entry, idx) => (
              <Card 
                key={entry.id}
                className={`transition-all hover:shadow-hover ${
                  getRankColor(entry.rank)
                } ${entry.id === user?.id ? 'ring-2 ring-primary' : ''}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                      {getRankIcon(entry.rank)}
                    </div>

                    {/* Avatar */}
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {entry.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg truncate">{entry.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          Level {entry.level}
                        </span>
                        <span className="flex items-center gap-1">
                          🔥 {entry.streak} days
                        </span>
                        <span className="flex items-center gap-1">
                          <Trophy className="h-3 w-3" />
                          {entry.badges} badges
                        </span>
                      </div>
                    </div>

                    {/* XP */}
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{entry.xp.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">XP</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="daily">
            <Card>
              <CardContent className="p-8 text-center">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Daily rankings update at midnight</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="allTime">
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">All-time leaderboard coming soon</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Friends Section */}
        <Card className="mt-8 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Friends Leaderboard
            </CardTitle>
            <CardDescription>See how you compare with your friends</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground py-8">
              Add friends to see their progress here
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;
