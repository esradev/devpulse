import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Play,
  Clock,
  Zap,
  Award,
  BookOpen,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../i18n/translations';

export const CourseDetailView: React.FC = () => {
  const {
    language,
    direction,
    courses,
    selectedCourseId,
    userStats,
    setActiveView,
    openLesson,
    claimCertificate,
    setActiveCertificateModal,
    certificates,
  } = useApp();
  const t = getTranslation(language);

  const course = courses.find((c) => c.id === selectedCourseId) || courses[0];
  const BackIcon = direction === 'rtl' ? ArrowRight : ArrowLeft;
  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;

  const allLessonIds = course.modules.flatMap((m) => m.lessons.map((l) => l.id));
  const completedCount = allLessonIds.filter((id) =>
    userStats.completedLessonIds.includes(id)
  ).length;
  const totalCount = allLessonIds.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const isFullyCompleted = progressPercent === 100;

  const existingCert = certificates.find((c) => c.courseId === course.id);

  // Find next lesson to play
  const nextLesson = course.modules
    .flatMap((m) => m.lessons)
    .find((l) => !userStats.completedLessonIds.includes(l.id)) || course.modules[0]?.lessons[0];

  return (
    <div className="space-y-8">
      {/* Back button */}
      <div>
        <button
          onClick={() => setActiveView('tracks')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <BackIcon className="w-4 h-4" />
          <span>{t.courses.backToCatalog}</span>
        </button>
      </div>

      {/* Course Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r ${course.color}`}>
                {course.category}
              </span>
              <span className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded">
                {course.difficulty}
              </span>
              <span className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 font-semibold">
                <Zap className="w-3.5 h-3.5 fill-amber-500" />
                {course.totalXp} XP Available
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {course.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500 dark:text-slate-400 pt-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                {course.estimatedHours} hours of interactive coding
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-500" />
                {course.badgeTitle}
              </span>
            </div>
          </div>

          {/* Quick Action / Certificate Box */}
          <div className="w-full lg:w-auto flex flex-col gap-3 min-w-[240px]">
            {isFullyCompleted ? (
              <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/40 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Track Completed!</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">100% test validation achieved</p>
                </div>
                <button
                  onClick={() => {
                    if (existingCert) {
                      setActiveCertificateModal(existingCert);
                    } else {
                      const newCert = claimCertificate(course.id);
                      setActiveCertificateModal(newCert);
                    }
                  }}
                  className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  {t.certificates.viewCertificate}
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-3">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Track Progress</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {completedCount} of {totalCount} lessons completed
                </div>
                <button
                  onClick={() => {
                    if (nextLesson) {
                      openLesson(course.id, nextLesson.id);
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>{t.courses.resumeCourse}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Curriculum Modules */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-500" />
          <span>{t.courses.syllabus}</span>
        </h2>

        <div className="space-y-4">
          {course.modules.map((module, mIdx) => (
            <div
              key={module.id}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
            >
              <div className="p-4 sm:p-5 bg-slate-50/60 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {module.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {module.description}
                </p>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {module.lessons.map((lesson, lIdx) => {
                  const isDone = userStats.completedLessonIds.includes(lesson.id);

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => openLesson(course.id, lesson.id)}
                      className="p-4 sm:px-5 flex items-center justify-between hover:bg-slate-50/80 dark:hover:bg-slate-800/60 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                            isDone
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                              : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 group-hover:bg-emerald-500 group-hover:text-white'
                          }`}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <span>{lIdx + 1}</span>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                              {lesson.title}
                            </span>
                            <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                              Challenge
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {lesson.durationMinutes} min
                            </span>
                            <span>·</span>
                            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                              +{lesson.xpReward} XP
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors hidden sm:inline">
                          {isDone ? 'Review' : 'Start'}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
