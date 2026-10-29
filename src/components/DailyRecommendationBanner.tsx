import React from 'react';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, Flame, ShieldAlert, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../i18n/translations';

export const DailyRecommendationBanner: React.FC = () => {
  const { language, direction, userStats, courses, openLesson } = useApp();
  const t = getTranslation(language);

  // Find next uncompleted lesson from active course
  const activeCourse = courses.find((c) => c.id === userStats.activeCourseId) || courses[0];
  let nextLesson = activeCourse.modules[0]?.lessons[0];

  for (const mod of activeCourse.modules) {
    const uncompleted = mod.lessons.find((l) => !userStats.completedLessonIds.includes(l.id));
    if (uncompleted) {
      nextLesson = uncompleted;
      break;
    }
  }

  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;

  // Calculate daily XP progress
  const todayProgress = Math.min(100, Math.round(((userStats.xp % 200) / userStats.dailyGoalXp) * 100));

  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white via-slate-50 to-emerald-50/30 dark:from-slate-900 dark:via-slate-900/90 dark:to-emerald-950/20 p-5 sm:p-6 shadow-sm">
      <div className="absolute top-0 end-0 -mt-10 -me-10 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
        {/* Left Side: Today's Quest Details */}
        <div className="space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
              <Sparkles className="w-3.5 h-3.5" />
              {t.dailyRecommendation.title}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {t.dailyRecommendation.basedOn}
            </span>
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{nextLesson ? nextLesson.title : 'Mastery Sprint'}</span>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 rounded px-2 py-0.5">
                +{nextLesson?.xpReward || 50} XP
              </span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
              {activeCourse.title} · {nextLesson?.challenge?.description || 'Hands-on practice challenge'}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{t.dailyRecommendation.estimatedTime.replace('{mins}', String(nextLesson?.durationMinutes || 15))}</span>
            </div>
            <div className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.dailyRecommendation.streakReminder.replace('{streak}', String(userStats.streak))}</span>
            </div>
            {userStats.streakFreezeCount > 0 && (
              <div className="flex items-center gap-1 text-sky-600 dark:text-sky-400">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{userStats.streakFreezeCount} {t.profile.streakFreeze}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Daily Goal Progress Bar & Start Action */}
        <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 lg:pt-0">
          <div className="bg-white/80 dark:bg-slate-800/80 rounded-xl p-3 border border-slate-200/70 dark:border-slate-700/60 min-w-[200px]">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
              <span className="text-slate-700 dark:text-slate-300">{t.nav.dailyGoal}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                {todayProgress}%
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                style={{ width: `${todayProgress}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 flex items-center justify-between">
              <span>{t.dailyRecommendation.dailyBonus}</span>
              {todayProgress >= 100 && (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              )}
            </div>
          </div>

          <button
            onClick={() => {
              if (nextLesson) {
                openLesson(activeCourse.id, nextLesson.id);
              }
            }}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all cursor-pointer whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            <span>{t.dailyRecommendation.continueLesson}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
