import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';
import { 
  Users, 
  BookOpen, 
  Globe, 
  MapPin,
  Heart,
  Share2,
  TrendingUp,
  Award
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Impact = () => {
  const { language } = useLanguage();
  const { toast } = useToast();

  const metrics = [
    {
      label: t('impact.students', language),
      value: '10,245',
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: t('impact.lessons', language),
      value: '52,890',
      icon: BookOpen,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      label: t('impact.languages', language),
      value: '5',
      icon: Globe,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      label: t('impact.cities', language),
      value: '247',
      icon: MapPin,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
  ];

  const testimonials = [
    {
      name: 'Priya K.',
      location: 'Nashik, Maharashtra',
      quote: 'FinLearn made finance simple. I can now help my parents with budgeting!',
      grade: 'Grade 11',
    },
    {
      name: 'Arjun M.',
      location: 'Mysuru, Karnataka',
      quote: 'Learning in Kannada helped me understand concepts better than English apps.',
      grade: 'Grade 12',
    },
    {
      name: 'Sneha R.',
      location: 'Coimbatore, Tamil Nadu',
      quote: 'The simulator taught me more than any textbook. I feel confident about money now!',
      grade: 'Grade 10',
    },
  ];

  const achievements = [
    {
      title: 'Financial Literacy Pioneer',
      desc: 'First multilingual finance app for Tier 2/3 students',
      icon: Award,
    },
    {
      title: 'Community Impact',
      desc: 'Helping bridge the digital finance gap in rural India',
      icon: Heart,
    },
    {
      title: 'Rapid Growth',
      desc: '300% growth in student engagement in 6 months',
      icon: TrendingUp,
    },
  ];

  const shareFinLearn = () => {
    const url = window.location.origin;
    navigator.clipboard.writeText(url);
    toast({
      title: 'Link Copied!',
      description: 'Share FinLearn with your friends and classmates',
    });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            {t('impact.title', language)}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Empowering the next generation of financially literate Indians, one student at a time
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {metrics.map((metric, idx) => (
            <Card 
              key={idx} 
              className="shadow-card hover:shadow-hover transition-all animate-bounce-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <CardHeader className="pb-3">
                <div className={`w-12 h-12 rounded-lg ${metric.bgColor} flex items-center justify-center mb-2`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <div className="text-3xl md:text-4xl font-bold">{metric.value}</div>
                <CardDescription className="text-sm">{metric.label}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Achievements */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-6">Our Achievements</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((achievement, idx) => (
              <Card key={idx} className="shadow-card hover:shadow-hover transition-all">
                <CardHeader>
                  <div className="w-14 h-14 rounded-lg bg-gradient-gamify flex items-center justify-center mb-3">
                    <achievement.icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl">{achievement.title}</CardTitle>
                  <CardDescription className="text-base">{achievement.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-6">Student Stories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="shadow-card">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center text-white font-bold">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>
                        {testimonial.grade} • {testimonial.location}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-hero text-white shadow-glow">
          <CardContent className="py-12 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Join the Movement</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Help us build a financially secure future for all Indian students
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg"
                onClick={shareFinLearn}
              >
                <Share2 className="h-5 w-5 mr-2" />
                {t('impact.share', language)}
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur"
              >
                <Heart className="h-5 w-5 mr-2" />
                Support FinLearn
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Impact;
