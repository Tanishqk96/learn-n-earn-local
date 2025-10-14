import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';
import heroImage from '@/assets/hero-finance.jpg';
import { 
  BookOpen, 
  Trophy, 
  Wallet, 
  MessageCircle, 
  Users, 
  Globe, 
  TrendingUp,
  Sparkles,
  Target,
  AlertCircle
} from 'lucide-react';

const Index = () => {
  const { language } = useLanguage();

  const features = [
    {
      icon: BookOpen,
      title: t('features.lessons.title', language),
      desc: t('features.lessons.desc', language),
      color: 'text-primary',
    },
    {
      icon: Trophy,
      title: t('features.quiz.title', language),
      desc: t('features.quiz.desc', language),
      color: 'text-accent',
    },
    {
      icon: Wallet,
      title: t('features.simulator.title', language),
      desc: t('features.simulator.desc', language),
      color: 'text-secondary',
    },
    {
      icon: MessageCircle,
      title: t('features.voice.title', language),
      desc: t('features.voice.desc', language),
      color: 'text-success',
    },
  ];

  const gaps = [
    {
      app: 'Groww',
      issue: 'Urban focused, English only, investment heavy',
      icon: TrendingUp,
    },
    {
      app: 'Bank Apps',
      issue: 'Complex UI, trust issues, no education',
      icon: AlertCircle,
    },
    {
      app: 'Zerodha Varsity',
      issue: 'Too technical, investment only, jargon',
      icon: Target,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6 animate-slide-up">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur">
                <Sparkles className="h-3 w-3 mr-1" />
                {t('app.tagline', language)}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                {t('hero.title', language)}
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                {t('hero.subtitle', language)}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="hero" size="xl">
                  <Link to="/login">{t('hero.cta', language)}</Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="xl"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur"
                >
                  <Link to="/login?guest=true">{t('hero.guest', language)}</Link>
                </Button>
              </div>
            </div>
            <div className="relative animate-bounce-in">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
              <img 
                src={heroImage} 
                alt="Students learning finance"
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t('features.title', language)}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Designed specifically for students in Tier 2 & 3 cities across India
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <Card 
                key={idx} 
                className="border-2 hover:border-primary/50 transition-all hover:shadow-hover animate-slide-up group"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-card flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${feature.color}`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t('audience.title', language)}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('audience.subtitle', language)}
            </p>
            <div className="grid sm:grid-cols-2 gap-4 pt-8">
              {[
                { icon: Users, text: 'Cash-based habits, new to digital finance' },
                { icon: Globe, text: 'Need content in regional languages' },
                { icon: BookOpen, text: 'Learn from family advice & experience' },
                { icon: Sparkles, text: 'Ready to build financial confidence' },
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-3 p-4 rounded-lg bg-gradient-card border shadow-card hover:shadow-hover transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-left">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gaps Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t('gaps.title', language)}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('gaps.subtitle', language)}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {gaps.map((gap, idx) => (
              <Card key={idx} className="hover:shadow-hover transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-3">
                    <gap.icon className="h-6 w-6 text-destructive" />
                  </div>
                  <CardTitle className="text-lg">{gap.app}</CardTitle>
                  <CardDescription>{gap.issue}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="hero" size="lg">
              <Link to="/login">{t('gaps.cta', language)}</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Index;
