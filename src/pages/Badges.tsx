import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { BADGES } from '@/lib/gamification';
import { BadgeShowcase } from '@/components/BadgeDisplay';
import { Trophy, Star, Target } from 'lucide-react';

const Badges = () => {
  const { user } = useAuth();

  if (!user) return null;

  // Map badges with earned status
  const badgesWithStatus = BADGES.map(badge => ({
    ...badge,
    earned: badge.requirement(user),
    earnedAt: user.achievements?.find(a => a.id === badge.id)?.earnedAt,
  }));

  const earnedBadges = badgesWithStatus.filter(b => b.earned);
  const totalBadges = BADGES.length;
  const completionPercent = (earnedBadges.length / totalBadges) * 100;

  const byTier = {
    bronze: badgesWithStatus.filter(b => b.tier === 'bronze'),
    silver: badgesWithStatus.filter(b => b.tier === 'silver'),
    gold: badgesWithStatus.filter(b => b.tier === 'gold'),
    platinum: badgesWithStatus.filter(b => b.tier === 'platinum'),
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-2">
            <Trophy className="h-8 w-8 text-primary" />
            Badges & Achievements
          </h1>
          <p className="text-muted-foreground">
            Unlock badges by completing challenges and reaching milestones
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 shadow-card bg-gradient-card">
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
            <CardDescription>
              You've earned {earnedBadges.length} out of {totalBadges} badges
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-4 bg-background/50 rounded-lg">
                <div className="text-3xl font-bold text-amber-700 mb-1">
                  {byTier.bronze.filter(b => b.earned).length}
                </div>
                <div className="text-sm text-muted-foreground">Bronze Badges</div>
              </div>
              <div className="text-center p-4 bg-background/50 rounded-lg">
                <div className="text-3xl font-bold text-gray-600 mb-1">
                  {byTier.silver.filter(b => b.earned).length}
                </div>
                <div className="text-sm text-muted-foreground">Silver Badges</div>
              </div>
              <div className="text-center p-4 bg-background/50 rounded-lg">
                <div className="text-3xl font-bold text-yellow-600 mb-1">
                  {byTier.gold.filter(b => b.earned).length}
                </div>
                <div className="text-sm text-muted-foreground">Gold Badges</div>
              </div>
              <div className="text-center p-4 bg-background/50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {byTier.platinum.filter(b => b.earned).length}
                </div>
                <div className="text-sm text-muted-foreground">Platinum Badges</div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Completion</span>
              <span className="text-2xl font-bold text-primary">{completionPercent.toFixed(0)}%</span>
            </div>
          </CardContent>
        </Card>

        {/* All Badges */}
        <BadgeShowcase badges={badgesWithStatus} />

        {/* Tips */}
        <Card className="mt-8 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-accent" />
              How to Earn More Badges
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <Target className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold">Complete Daily Challenges</h4>
                <p className="text-sm text-muted-foreground">
                  Maintain streaks and complete challenges to unlock streak badges
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Trophy className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold">Pass More Quizzes</h4>
                <p className="text-sm text-muted-foreground">
                  Score well on quizzes to unlock achievement badges
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Star className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold">Refer Friends</h4>
                <p className="text-sm text-muted-foreground">
                  Invite friends to earn social badges and bonus XP
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Badges;
