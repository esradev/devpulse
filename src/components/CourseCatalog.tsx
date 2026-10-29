import React, { useState } from 'react';
import {
  Code,
  CheckCircle2,
  Clock,
  Zap,
  Award,
  ArrowRight,
  ArrowLeft,
  Filter,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../i18n/translations';
import { Difficulty, TrackCategory } from '../types';

export const CourseCatalog: React.FC = () => {
  const { language, direction, courses, userStats, openCourse } = useApp();
  const t = getTranslation(language);

  const [selectedCategory, setSelectedCategory] = useState<TrackCategory | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');

  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;

  const filteredCourses = courses.filter((course) => {
    if (selectedCategory !== 'all' && course.category !== selectedCategory) return false;
    if (selectedDifficulty !== 'all' && course.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const getCourseProgress = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return 0;
    const allLessonIds = course.modules.flatMap((m) => m.lessons.map((l) => l.id));
    if (allLessonIds.length === 0) return 0;
    const completedCount = allLessonIds.filter((id) =>
      userStats.completedLessonIds.includes(id)
    ).length;
    return Math.round((completedCount / allLessonIds.length) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header and Filter Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.nav.tracks}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t.tagline}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl text-xs font-medium">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedCategory === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.courses.all}
            </button>
            <button
              onClick={() => setSelectedCategory('javascript')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedCategory === 'javascript'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              JavaScript
            </button>
            <button
              onClick={() => setSelectedCategory('python')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedCategory === 'python'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Python
            </button>
            <button
              onClick={() => setSelectedCategory('typescript')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedCategory === 'typescript'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              TypeScript
            </button>
            <button
              onClick={() => setSelectedCategory('sql')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedCategory === 'sql'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              SQL
            </button>
            <button
              onClick={() => setSelectedCategory('go')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedCategory === 'go'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Go
            </button>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const progress = getCourseProgress(course.id);
          const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
          const isCompleted = progress === 100;
          const isStarted = progress > 0;

          return (
            <div
              key={course.id}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/90 hover:border-emerald-500/50 dark:hover:border-emerald-500/40 p-6 transition-all duration-200 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-0.5"
            >
              <div>
                {/* Header Tag & Difficulty */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.color} p-2.5 text-white shadow-sm flex items-center justify-center font-bold text-sm tracking-wider uppercase`}>
                    {course.category.slice(0, 2)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                      {course.difficulty === 'beginner' ? t.courses.beginner : t.courses.intermediate}
                    </span>
                    {isCompleted && (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {t.courses.completed}
                      </span>
                    )}
                  </div>
                </div>

                {/* Course Title & Description */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {course.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {course.shortDescription}
                </p>

                {/* Metadata Line */}
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {course.estimatedHours}h
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Code className="w-3.5 h-3.5 text-slate-400" />
                    {totalLessons} {t.courses.lessons}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
                    <Zap className="w-3.5 h-3.5" />
                    {course.totalXp} XP
                  </span>
                </div>
              </div>

              {/* Bottom Area: Progress bar & Action */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                {isStarted && (
                  <div className="mb-3">
                    <div className="flex justify-between text-xs font-semibold mb-1 text-slate-600 dark:text-slate-400">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={() => openCourse(course.id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100 group-hover:bg-emerald-600 group-hover:text-white dark:group-hover:bg-emerald-600"
                >
                  <span>
                    {isCompleted
                      ? t.courses.syllabus
                      : isStarted
                      ? t.courses.resumeCourse
                      : t.courses.startCourse}
                  </span>
                  <ArrowIcon className="w-4 h-4 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
