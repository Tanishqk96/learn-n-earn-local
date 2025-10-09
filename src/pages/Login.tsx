import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/i18n';
import { Coins, UserCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { login, register, loginAsGuest } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const guestParam = searchParams.get('guest');
    if (guestParam === 'true') {
      handleGuestLogin();
    }
  }, [searchParams]);

  const handleGuestLogin = () => {
    loginAsGuest();
    toast({
      title: t('common.success', language),
      description: 'Welcome! Your progress will be saved in this browser.',
    });
    navigate('/dashboard');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isRegister && password !== confirmPassword) {
      toast({
        title: t('common.error', language),
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (isRegister) {
        await register(email, password);
      } else {
        await login(email, password);
      }
      toast({
        title: t('common.success', language),
        description: isRegister ? 'Account created!' : 'Welcome back!',
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: t('common.error', language),
        description: 'Please try again',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <Card className="w-full max-w-md shadow-hover animate-bounce-in">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-gamify flex items-center justify-center">
            <Coins className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">
            {isRegister ? t('auth.register', language) : t('auth.login', language)}
          </CardTitle>
          <CardDescription>
            {isRegister 
              ? 'Create your account to start learning'
              : 'Welcome back to FinLearn'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('auth.email', language)}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('auth.password', language)}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {isRegister && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t('auth.confirmPassword', language)}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}
            <Button type="submit" className="w-full" variant="default">
              {isRegister ? t('auth.register', language) : t('auth.login', language)}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                {t('auth.orGuest', language)}
              </span>
            </div>
          </div>

          <Button 
            onClick={handleGuestLogin} 
            variant="outline" 
            className="w-full"
          >
            <UserCircle className="mr-2 h-4 w-4" />
            {t('hero.guest', language)}
          </Button>

          <div className="text-center text-sm">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-primary hover:underline"
            >
              {isRegister 
                ? t('auth.hasAccount', language) 
                : t('auth.noAccount', language)
              }
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
