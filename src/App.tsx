/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { DailyRecommendationBanner } from './components/DailyRecommendationBanner';
import { CourseCatalog } from './components/CourseCatalog';
import { CourseDetailView } from './components/CourseDetailView';
import { ChallengeView } from './components/ChallengeView';
import { LeaderboardView } from './components/LeaderboardView';
import { CommunityForumView } from './components/CommunityForumView';
import { CertificatesView } from './components/CertificatesView';
import { ProfileView } from './components/ProfileView';
import { CertificateModal } from './components/CertificateModal';
import { getTranslation } from './i18n/translations';
import { Terminal, Shield, Sparkles, Heart } from 'lucide-react';

const MainContent: React.FC = () => {
  const {
    activeView,
    language,
    activeCertificateModal,
    setActiveCertificateModal,
  } = useApp();
  const t = getTranslation(language);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Daily Quest Banner on Tracks & Challenge view */}
        {activeView === 'tracks' && <DailyRecommendationBanner />}

        {/* View Switcher */}
        {activeView === 'tracks' && <CourseCatalog />}
        {activeView === 'track-detail' && <CourseDetailView />}
        {activeView === 'challenge' && <ChallengeView />}
        {activeView === 'leaderboard' && <LeaderboardView />}
        {activeView === 'forum' && <CommunityForumView />}
        {activeView === 'certificates' && <CertificatesView />}
        {activeView === 'profile' && <ProfileView />}
      </main>

      {/* Global Certificate Modal */}
      <CertificateModal
        certificate={activeCertificateModal}
        onClose={() => setActiveCertificateModal(null)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950/50 py-8 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-medium">
            <Terminal className="w-4 h-4 text-emerald-500" />
            <span>{t.brand} Academy — Interactive Developer Education</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span>English</span>
            <span>·</span>
            <span>فارسی (RTL)</span>
            <span>·</span>
            <span>العربية (RTL)</span>
          </div>

          <div className="flex items-center gap-1 text-[11px]">
            <span>Crafted for programmers worldwide</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
