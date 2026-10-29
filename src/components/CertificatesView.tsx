import React from 'react';
import { Award, ShieldCheck, CheckCircle2, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../i18n/translations';

export const CertificatesView: React.FC = () => {
  const {
    language,
    direction,
    courses,
    certificates,
    userStats,
    setActiveCertificateModal,
    claimCertificate,
    openCourse,
  } = useApp();
  const t = getTranslation(language);
  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t.certificates.title}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t.certificates.subtitle}
        </p>
      </div>

      {/* Grid of Track Certificates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => {
          const allLessonIds = course.modules.flatMap((m) => m.lessons.map((l) => l.id));
          const completedCount = allLessonIds.filter((id) =>
            userStats.completedLessonIds.includes(id)
          ).length;
          const isEligible = allLessonIds.length > 0 && completedCount === allLessonIds.length;
          const cert = certificates.find((c) => c.courseId === course.id);

          return (
            <div
              key={course.id}
              className={`rounded-2xl border p-6 flex flex-col justify-between transition-all ${
                cert
                  ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/20 dark:bg-emerald-950/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${course.color} flex items-center justify-center text-white shadow-md`}>
                    <Award className="w-6 h-6" />
                  </div>
                  {cert ? (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-700">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{t.certificates.verifiedBadge}</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <Lock className="w-3.5 h-3.5" />
                      <span>{completedCount}/{allLessonIds.length} Lessons</span>
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Specialist Credential: <strong className="text-slate-700 dark:text-slate-300">{course.badgeTitle}</strong>
                  </p>
                </div>

                {cert && (
                  <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 space-y-1 text-xs font-mono">
                    <div className="text-slate-400">ID: {cert.credentialId}</div>
                    <div className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      Awarded: {cert.issueDate}
                    </div>
                  </div>
                )}
              </div>

              {/* Action */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                {cert ? (
                  <button
                    onClick={() => setActiveCertificateModal(cert)}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    {t.certificates.viewCertificate}
                  </button>
                ) : isEligible ? (
                  <button
                    onClick={() => {
                      const newCert = claimCertificate(course.id);
                      setActiveCertificateModal(newCert);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    Claim Your Certificate Now!
                  </button>
                ) : (
                  <button
                    onClick={() => openCourse(course.id)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <span>Complete Track to Unlock</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
