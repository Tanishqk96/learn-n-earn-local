import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';
import { 
  Wallet, 
  TrendingUp, 
  PiggyBank, 
  ShoppingCart,
  Calendar,
  Trophy,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Simulator = () => {
  const { user, updateUserProgress } = useAuth();
  const { language } = useLanguage();
  const { toast } = useToast();

  const [month, setMonth] = useState(1);
  const [balance, setBalance] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [totalInvestments, setTotalInvestments] = useState(0);
  const [simulationHistory, setSimulationHistory] = useState<any[]>([]);
  
  const monthlyIncome = 10000;
  const [spending, setSpending] = useState(5000);
  const [saving, setSaving] = useState(3000);
  const [investing, setInvesting] = useState(2000);

  const remaining = monthlyIncome - spending - saving - investing;

  const endMonth = () => {
    if (remaining < 0) {
      toast({
        title: 'Over Budget!',
        description: 'You spent more than your income. Try adjusting your allocations.',
        variant: 'destructive',
      });
      return;
    }

    // Calculate realistic returns (8% annual = 0.67% monthly)
    const investmentReturn = totalInvestments * 0.0067;
    const savingsInterest = totalSavings * 0.0033; // 4% annual
    const newBalance = balance + remaining;
    const newSavings = totalSavings + saving + savingsInterest;
    const newInvestments = totalInvestments + investing + investmentReturn;

    const monthData = {
      month,
      balance: newBalance,
      savings: newSavings,
      investments: newInvestments,
      spending,
      savingAmount: saving,
      investingAmount: investing,
    };

    setBalance(newBalance);
    setTotalSavings(Math.round(newSavings));
    setTotalInvestments(Math.round(newInvestments));
    setMonth(month + 1);
    setSimulationHistory([...simulationHistory, monthData]);

    // Award XP based on good financial decisions
    const savingsRatio = (saving + investing) / monthlyIncome;
    let earnedXP = 30;
    if (savingsRatio >= 0.5) earnedXP = 80; // Saving 50%+
    else if (savingsRatio >= 0.3) earnedXP = 50; // Saving 30%+
    
    if (user) {
      updateUserProgress({
        xp: user.xp + earnedXP,
        level: Math.floor((user.xp + earnedXP) / 100) + 1,
      });
    }

    toast({
      title: `Month ${month} Complete!`,
      description: `Earned ${earnedXP} XP! Your wealth grew by ₹${Math.round(investmentReturn + savingsInterest)}`,
    });
  };

  const reset = () => {
    setMonth(1);
    setBalance(0);
    setTotalSavings(0);
    setTotalInvestments(0);
    setSpending(2500);
    setSaving(1500);
    setInvesting(1000);
    setSimulationHistory([]);
  };

  const categories = [
    {
      label: t('simulator.spend', language),
      value: spending,
      setValue: (val: number[]) => setSpending(val[0]),
      icon: ShoppingCart,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
    },
    {
      label: t('simulator.save', language),
      value: saving,
      setValue: (val: number[]) => setSaving(val[0]),
      icon: PiggyBank,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      label: t('simulator.invest', language),
      value: investing,
      setValue: (val: number[]) => setInvesting(val[0]),
      icon: TrendingUp,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {t('simulator.title', language)}
          </h1>
          <p className="text-muted-foreground">
            {t('simulator.subtitle', language)}
          </p>
        </div>

        {/* Knowledge Tips */}
        <Card className="mb-8 bg-gradient-card shadow-card border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertCircle className="h-5 w-5 text-primary" />
              {t('knowledge.tips', language)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm flex items-start gap-2">
              <span className="text-primary">•</span>
              {t('sim.tip1', language)}
            </p>
            <p className="text-sm flex items-start gap-2">
              <span className="text-primary">•</span>
              {t('sim.tip2', language)}
            </p>
            <p className="text-sm flex items-start gap-2">
              <span className="text-primary">•</span>
              {t('sim.tip3', language)}
            </p>
          </CardContent>
        </Card>

        {/* Month & Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">{t('simulator.month', language)}</CardTitle>
              </div>
              <div className="text-3xl font-bold">{month}</div>
            </CardHeader>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="h-5 w-5 text-secondary" />
                <CardTitle className="text-lg">{t('simulator.balance', language)}</CardTitle>
              </div>
              <div className="text-3xl font-bold text-secondary">₹{balance}</div>
            </CardHeader>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 mb-2">
              <PiggyBank className="h-5 w-5 text-success" />
                <CardTitle className="text-lg">{t('simulator.save', language)}</CardTitle>
              </div>
              <div className="text-3xl font-bold text-success">₹{totalSavings}</div>
            </CardHeader>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">{t('simulator.invest', language)}</CardTitle>
              </div>
              <div className="text-3xl font-bold text-primary">₹{totalInvestments}</div>
            </CardHeader>
          </Card>
        </div>

        {/* Budget Allocation */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>{t('simulator.budget', language)}</CardTitle>
              <CardDescription>
                {t('simulator.income', language)}: ₹{monthlyIncome.toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {categories.map((category, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg ${category.bgColor} flex items-center justify-center`}>
                        <category.icon className={`h-4 w-4 ${category.color}`} />
                      </div>
                      <span className="font-medium">{category.label}</span>
                    </div>
                    <span className="font-bold text-lg">₹{category.value}</span>
                  </div>
                  <Slider
                    value={[category.value]}
                    onValueChange={category.setValue}
                    max={monthlyIncome}
                    step={100}
                    className="w-full"
                  />
                </div>
              ))}

              <div className={`p-4 rounded-lg border-2 ${
                remaining < 0 
                  ? 'border-destructive bg-destructive/10' 
                  : 'border-success bg-success/10'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {remaining < 0 ? (
                      <AlertCircle className="h-5 w-5 text-destructive" />
                    ) : (
                      <Trophy className="h-5 w-5 text-success" />
                    )}
                    <span className="font-semibold">{t('simulator.remaining', language)}</span>
                  </div>
                  <span className={`font-bold text-xl ${
                    remaining < 0 ? 'text-destructive' : 'text-success'
                  }`}>
                    ₹{remaining}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>{t('simulator.summary', language)}</CardTitle>
              <CardDescription>{t('simulator.review', language)}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">{t('simulator.income', language)}</span>
                  <span className="font-semibold">₹{monthlyIncome}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b text-destructive">
                  <span>{t('simulator.spend', language)}</span>
                  <span className="font-semibold">-₹{spending}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b text-success">
                  <span>{t('simulator.save', language)}</span>
                  <span className="font-semibold">+₹{saving}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b text-primary">
                  <span>{t('simulator.invest', language)}</span>
                  <span className="font-semibold">+₹{investing}</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-muted rounded-lg px-4">
                  <span className="font-bold">{t('simulator.netChange', language)}</span>
                  <span className={`font-bold text-xl ${
                    remaining < 0 ? 'text-destructive' : 'text-success'
                  }`}>
                    {remaining >= 0 ? '+' : ''}₹{remaining}
                  </span>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <Button 
                  onClick={endMonth} 
                  variant="hero" 
                  className="w-full"
                  disabled={remaining < 0}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  {t('simulator.endMonth', language)}
                </Button>
                <Button onClick={reset} variant="outline" className="w-full">
                  {t('simulator.reset', language)}
                </Button>
              </div>

              {month > 1 && (
                <div className="p-4 bg-gradient-card rounded-lg border">
                  <p className="text-sm text-muted-foreground mb-1">{t('simulator.totalWealth', language)}</p>
                  <p className="text-2xl font-bold text-primary">
                    ₹{(balance + totalSavings + totalInvestments).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    After {month - 1} months
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
