import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Users, UserPlus, Share2, Copy, Gift, Trophy, TrendingUp } from 'lucide-react';

const Friends = () => {
  const { user, updateUserProgress } = useAuth();
  const { toast } = useToast();
  const [friendCode, setFriendCode] = useState('');

  if (!user) return null;

  const mockFriends = [
    { id: '1', name: 'Priya S.', xp: 1500, level: 15, streak: 12, status: 'online' },
    { id: '2', name: 'Rahul K.', xp: 1200, level: 12, streak: 8, status: 'offline' },
    { id: '3', name: 'Anjali M.', xp: 1000, level: 10, streak: 5, status: 'online' },
  ];

  const referralLink = `https://finlearn.app/ref/${user.referralCode}`;

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: 'Link Copied! 📋',
      description: 'Share it with friends to earn rewards',
    });
  };

  const shareOnWhatsApp = () => {
    const message = `Join me on FinLearn - Learn personal finance the fun way! Use my code: ${user.referralCode}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message + '\n' + referralLink)}`, '_blank');
  };

  const addFriend = () => {
    if (!friendCode.trim()) return;
    
    toast({
      title: 'Friend Request Sent! 👥',
      description: 'They will receive your request soon',
    });
    setFriendCode('');
  };

  const totalReferrals = user.friends?.length || 0;
  const referralXP = totalReferrals * 100;

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-2">
            <Users className="h-8 w-8 text-primary" />
            Friends & Referrals
          </h1>
          <p className="text-muted-foreground">Learn together and earn rewards</p>
        </div>

        {/* Referral Section */}
        <Card className="mb-8 shadow-card bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-6 w-6 text-accent" />
              Invite Friends & Earn Rewards
            </CardTitle>
            <CardDescription>Earn 100 XP for each friend who joins using your code</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-background/50 rounded-lg">
                <div className="text-3xl font-bold text-primary mb-1">{totalReferrals}</div>
                <div className="text-sm text-muted-foreground">Friends Referred</div>
              </div>
              <div className="text-center p-4 bg-background/50 rounded-lg">
                <div className="text-3xl font-bold text-accent mb-1">{referralXP}</div>
                <div className="text-sm text-muted-foreground">XP Earned</div>
              </div>
              <div className="text-center p-4 bg-background/50 rounded-lg">
                <div className="text-3xl font-bold text-success mb-1">
                  {totalReferrals >= 3 ? '✓' : `${3 - totalReferrals}`}
                </div>
                <div className="text-sm text-muted-foreground">To Team Builder Badge</div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Your Referral Code</label>
              <div className="flex gap-2">
                <Input
                  value={user.referralCode}
                  readOnly
                  className="font-mono text-lg font-bold"
                />
                <Button onClick={copyReferralLink} variant="outline">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={shareOnWhatsApp} className="flex-1" variant="default">
                <Share2 className="h-4 w-4 mr-2" />
                Share on WhatsApp
              </Button>
              <Button onClick={copyReferralLink} variant="secondary" className="flex-1">
                <Copy className="h-4 w-4 mr-2" />
                Copy Link
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Friends Tabs */}
        <Tabs defaultValue="friends" className="space-y-6">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2">
            <TabsTrigger value="friends">My Friends</TabsTrigger>
            <TabsTrigger value="add">Add Friends</TabsTrigger>
          </TabsList>

          <TabsContent value="friends" className="space-y-4">
            {mockFriends.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No Friends Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Add friends to learn together and compete
                  </p>
                  <Button variant="default">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Friends
                  </Button>
                </CardContent>
              </Card>
            ) : (
              mockFriends.map((friend) => (
                <Card key={friend.id} className="shadow-card hover:shadow-hover transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-14 w-14">
                        <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                          {friend.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg">{friend.name}</h3>
                          <Badge
                            variant={friend.status === 'online' ? 'default' : 'outline'}
                            className="text-xs"
                          >
                            {friend.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            Level {friend.level}
                          </span>
                          <span className="flex items-center gap-1">
                            <Trophy className="h-3 w-3" />
                            {friend.xp} XP
                          </span>
                          <span className="flex items-center gap-1">
                            🔥 {friend.streak} days
                          </span>
                        </div>
                      </div>

                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="add">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Add Friend</CardTitle>
                <CardDescription>Enter your friend's referral code to connect</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter friend code (e.g., FL12AB34)"
                    value={friendCode}
                    onChange={(e) => setFriendCode(e.target.value.toUpperCase())}
                    className="font-mono"
                  />
                  <Button onClick={addFriend}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-3">Suggested Friends</h4>
                  <div className="space-y-2">
                    {[
                      { name: 'Sneha T.', code: 'FL89XY12', mutualFriends: 3 },
                      { name: 'Rohan G.', code: 'FL45CD67', mutualFriends: 2 },
                    ].map((suggestion) => (
                      <div
                        key={suggestion.code}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                      >
                        <div>
                          <div className="font-medium">{suggestion.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {suggestion.mutualFriends} mutual friends
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Add
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Friends;
