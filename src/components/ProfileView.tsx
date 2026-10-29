import React, { useState } from 'react';
import {
  User,
  Zap,
  Flame,
  Award,
  Sparkles,
  Shield,
  Save,
  CheckCircle2,
  Calendar,
  Layers,
  Settings,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../i18n/translations';

export const ProfileView: React.FC = () => {
  const {
    language,
    userStats,
    achievements,
    certificates,
    updateUserSettings,
    setActiveCertificateModal,
  } = useApp();
  const t = getTranslation(language);

  const [name, setName] = useState(userStats.name);
  const [dailyGoalXp, setDailyGoalXp] = useState(userStats.dailyGoalXp);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserSettings(name, dailyGoalXp);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // Generate 30 days for activity heatmap
  const past30Days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    const key = d.toISOString().split('T')[0];
    const count = userStats.activityCalendar[key] || 0;
    return { date: key, count };
  });

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-xs">
        <div className="relative">
          <img
            src={userStats.avatar}
            alt={userStats.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-emerald-500/30 shadow-md"
          />
          <span className="absolute bottom-0 end-0 px-2 py-0.5 rounded-full bg-emerald-600 text-white font-bold text-[10px] uppercase shadow">
            Lvl {userStats.level}
          </span>
        </div>

        <div className="text-center sm:text-start space-y-2 flex-1">
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {userStats.name}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Dedicated Software Craftsman · Joined October 2026
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3 py-1.5 rounded-xl border border-amber-200 dark:border-amber-800">
              <Flame className="w-4 h-4 fill-amber-500" />
              <span>{userStats.streak} {t.profile.streakTitle}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <Zap className="w-4 h-4 fill-emerald-500" />
              <span>{userStats.xp} Total XP</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 px-3 py-1.5 rounded-xl border border-sky-200 dark:border-sky-800">
              <Award className="w-4 h-4" />
              <span>{certificates.length} Certified Tracks</span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Heatmap Grid */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-500" />
            <span>{t.profile.activityHeatmap}</span>
          </h3>
          <span className="text-xs text-slate-400">30-day view</span>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {past30Days.map((day) => {
            let color = 'bg-slate-100 dark:bg-slate-800';
            if (day.count === 1) color = 'bg-emerald-300 dark:bg-emerald-900';
            if (day.count === 2) color = 'bg-emerald-500 dark:bg-emerald-600';
            if (day.count >= 3) color = 'bg-emerald-600 dark:bg-emerald-400';

            return (
              <div
                key={day.date}
                title={`${day.date}: ${day.count} exercises solved`}
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-md ${color} transition-all hover:scale-110 cursor-pointer`}
              />
            );
          })}
        </div>
      </div>

      {/* Badges & Achievements Grid */}
      <div className="space-y-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>{t.profile.achievements}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-xl border flex items-start gap-3.5 transition-all ${
                ach.unlocked
                  ? 'border-emerald-200 dark:border-emerald-800/80 bg-white dark:bg-slate-900'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 opacity-60'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  ach.unlocked
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                }`}
              >
                <Award className="w-5 h-5" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                    {ach.title}
                  </h4>
                  {ach.unlocked && (
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      +{ach.xpBonus} XP
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  {ach.description}
                </p>
                {ach.unlocked && ach.unlockedAt && (
                  <div className="text-[10px] text-slate-400">
                    Unlocked: {ach.unlockedAt}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preferences & Goals Settings Form */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-5">
        <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-slate-400" />
          <span>{t.profile.preferences}</span>
        </h3>

        <form onSubmit={handleSaveSettings} className="space-y-4 max-w-md text-xs">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              {t.profile.nameLabel}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              {t.profile.dailyGoalLabel}
            </label>
            <select
              value={dailyGoalXp}
              onChange={(e) => setDailyGoalXp(Number(e.target.value))}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none text-xs"
            >
              <option value={50}>Casual (50 XP / 15 mins)</option>
              <option value={100}>Regular (100 XP / 30 mins)</option>
              <option value={200}>Intensive (200 XP / 60 mins)</option>
            </select>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{t.profile.saveSettings}</span>
            </button>
            {savedSuccess && (
              <span className="flex items-center gap-1 text-emerald-600 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>Saved successfully!</span>
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
