import React, { useState } from 'react';
import {
  Code2,
  Flame,
  Zap,
  Sun,
  Moon,
  Globe,
  Menu,
  X,
  Award,
  Users,
  Trophy,
  BookOpen,
  User,
  Terminal,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../i18n/translations';
import { Language } from '../types';

export const Navbar: React.FC = () => {
  const {
    language,
    theme,
    activeView,
    userStats,
    setLanguage,
    setTheme,
    setActiveView,
  } = useApp();
  const t = getTranslation(language);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navItems = [
    { id: 'tracks', label: t.nav.tracks, icon: BookOpen },
    { id: 'challenge', label: t.nav.challenges, icon: Terminal },
    { id: 'leaderboard', label: t.nav.leaderboard, icon: Trophy },
    { id: 'forum', label: t.nav.forum, icon: Users },
    { id: 'certificates', label: t.nav.certificates, icon: Award },
    { id: 'profile', label: t.nav.profile, icon: User },
  ] as const;

  const handleNavClick = (viewId: typeof activeView) => {
    setActiveView(viewId);
    setMobileMenuOpen(false);
  };

  const changeLang = (lang: Language) => {
    setLanguage(lang);
    setLangDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/90 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('tracks')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-emerald-400">
                  <Code2 className="w-5 h-5" />
                </div>
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  {t.brand}
                </span>
                <span className="hidden sm:inline-block ms-2 text-[10px] uppercase font-bold tracking-widest text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded px-1.5 py-0.5">
                  Academy
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id || (item.id === 'tracks' && activeView === 'track-detail');
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-slate-100 text-slate-900 dark:bg-slate-800/90 dark:text-emerald-400 shadow-sm font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-500 dark:text-emerald-400' : ''}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Gamification Stats, Language, Theme, User */}
          <div className="flex items-center gap-2.5">
            {/* Streak Counter */}
            <div
              title={`${userStats.streak} day streak! Keep it burning!`}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/50 text-amber-700 dark:text-amber-400 text-xs sm:text-sm font-bold cursor-default select-none shadow-xs"
            >
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
              <span>{userStats.streak}</span>
              <span className="hidden md:inline font-normal text-xs text-amber-600/80 dark:text-amber-400/80">d</span>
            </div>

            {/* XP Points */}
            <div
              title={`Level ${userStats.level} · Total XP: ${userStats.xp}`}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm font-bold cursor-default select-none shadow-xs"
            >
              <Zap className="w-4 h-4 text-emerald-500 fill-emerald-500" />
              <span>{userStats.xp}</span>
              <span className="font-normal text-xs text-emerald-600/80 dark:text-emerald-400/80">XP</span>
            </div>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
                aria-label="Select Language"
              >
                <Globe className="w-4 h-4 text-slate-500" />
                <span className="text-xs uppercase font-semibold">{language}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute end-0 mt-2 w-36 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    onClick={() => changeLang('en')}
                    className={`w-full text-start px-3.5 py-2 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 ${
                      language === 'en' ? 'font-bold text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>English</span>
                    <span className="text-[10px] text-slate-400">LTR</span>
                  </button>
                  <button
                    onClick={() => changeLang('fa')}
                    className={`w-full text-start px-3.5 py-2 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 ${
                      language === 'fa' ? 'font-bold text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>فارسی</span>
                    <span className="text-[10px] text-slate-400">RTL</span>
                  </button>
                  <button
                    onClick={() => changeLang('ar')}
                    className={`w-full text-start px-3.5 py-2 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 ${
                      language === 'ar' ? 'font-bold text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>العربية</span>
                    <span className="text-[10px] text-slate-400">RTL</span>
                  </button>
                </div>
              )}
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
              aria-label="Toggle Theme"
              title={theme === 'dark' ? t.common.lightMode : t.common.darkMode}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-3 pb-6 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-emerald-400 font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-500' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 px-2">
            <span>{t.profile.level} {userStats.level}</span>
            <span>{userStats.xp} XP</span>
            <span>{userStats.streak} {t.profile.streakTitle}</span>
          </div>
        </div>
      )}
    </header>
  );
};
