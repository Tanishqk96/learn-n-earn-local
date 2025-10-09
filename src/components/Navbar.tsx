import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { t } from '@/lib/i18n';
import { Coins, Menu, X } from 'lucide-react';
import { useState } from 'react';

export const Navbar = () => {
  const { language } = useLanguage();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: t('nav.home', language) },
    ...(user ? [
      { path: '/dashboard', label: t('nav.dashboard', language) },
      { path: '/lessons', label: t('nav.lessons', language) },
      { path: '/challenges', label: 'Challenges' },
      { path: '/leaderboard', label: 'Leaderboard' },
      { path: '/friends', label: 'Friends' },
      { path: '/simulator', label: t('nav.simulator', language) },
      { path: '/impact', label: t('nav.impact', language) },
    ] : []),
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-gamify p-2 rounded-lg group-hover:scale-110 transition-transform">
              <Coins className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              {t('app.name', language)}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.path) ? 'text-primary' : 'text-foreground/70'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <LanguageSelector />
            {user ? (
              <Button onClick={logout} variant="outline" size="sm" className="hidden sm:flex">
                {t('nav.logout', language)}
              </Button>
            ) : (
              <Button asChild size="sm" className="hidden sm:flex">
                <Link to="/login">{t('nav.login', language)}</Link>
              </Button>
            )}
            
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-slide-up">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  isActive(link.path) ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <Button onClick={logout} variant="outline" className="w-full">
                {t('nav.logout', language)}
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
