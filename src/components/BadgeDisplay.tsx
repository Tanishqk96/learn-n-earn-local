import { Badge as BadgeUI } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

interface BadgeProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  earned?: boolean;
  earnedAt?: string;
}

export const BadgeDisplay = ({ badge }: { badge: BadgeProps }) => {
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze':
        return 'bg-amber-700/10 border-amber-700/50 text-amber-700';
      case 'silver':
        return 'bg-gray-400/10 border-gray-400/50 text-gray-600';
      case 'gold':
        return 'bg-yellow-500/10 border-yellow-500/50 text-yellow-600';
      case 'platinum':
        return 'bg-purple-500/10 border-purple-500/50 text-purple-600';
      default:
        return '';
    }
  };

  return (
    <Card
      className={`relative overflow-hidden transition-all hover:shadow-hover ${
        badge.earned ? getTierColor(badge.tier) : 'opacity-50 grayscale'
      }`}
    >
      <CardContent className="p-4 text-center">
        <div className="text-4xl mb-2">{badge.icon}</div>
        <h3 className="font-bold text-sm mb-1">{badge.name}</h3>
        <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
        <BadgeUI variant="outline" className="text-xs capitalize">
          {badge.tier}
        </BadgeUI>
        {badge.earned && badge.earnedAt && (
          <div className="text-xs text-muted-foreground mt-2">
            Earned {new Date(badge.earnedAt).toLocaleDateString()}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const BadgeShowcase = ({ badges }: { badges: BadgeProps[] }) => {
  const earnedCount = badges.filter(b => b.earned).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Trophy className="h-6 w-6 text-primary" />
          Badges & Achievements
        </h2>
        <BadgeUI variant="secondary">
          {earnedCount} / {badges.length}
        </BadgeUI>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {badges.map((badge) => (
          <BadgeDisplay key={badge.id} badge={badge} />
        ))}
      </div>
    </div>
  );
};
