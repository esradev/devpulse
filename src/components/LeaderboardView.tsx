import React, { useState } from 'react';
import { Trophy, Flame, Zap, Shield, Crown, Medal } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../i18n/translations';

export const LeaderboardView: React.FC = () => {
  const { language, leaderboard, userStats } = useApp();
  const t = getTranslation(language);

  const [activeTab, setActiveTab] = useState<'weekly' | 'allTime'>('weekly');
  const [selectedLeague, setSelectedLeague] = useState<'all' | 'gold' | 'diamond' | 'master'>('all');

  const filteredLeaderboard = leaderboard.filter((u) => {
    if (selectedLeague !== 'all' && u.league !== selectedLeague) return false;
    return true;
  });

  const topThree = filteredLeaderboard.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
          <Trophy className="w-6 h-6 text-amber-500" />
          <span>{t.leaderboard.title}</span>
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t.leaderboard.subtitle}
        </p>
      </div>

      {/* Tabs & League Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('weekly')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'weekly'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {t.leaderboard.weekly}
          </button>
          <button
            onClick={() => setActiveTab('allTime')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'allTime'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {t.leaderboard.allTime}
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">{t.leaderboard.league}:</span>
          <select
            value={selectedLeague}
            onChange={(e: any) => setSelectedLeague(e.target.value)}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 dark:text-slate-200 focus:outline-none"
          >
            <option value="all">All Leagues</option>
            <option value="master">Grandmaster</option>
            <option value="diamond">Diamond</option>
            <option value="gold">Gold</option>
          </select>
        </div>
      </div>

      {/* Podium for Top 3 */}
      {topThree.length >= 3 && (
        <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 pb-2 max-w-2xl mx-auto items-end">
          {/* 2nd place */}
          <div className="flex flex-col items-center order-1">
            <div className="relative">
              <img
                src={topThree[1].avatar}
                alt={topThree[1].name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-slate-300 dark:border-slate-600 object-cover shadow-md"
              />
              <span className="absolute -bottom-2 inset-x-0 mx-auto w-5 h-5 rounded-full bg-slate-300 dark:bg-slate-600 text-slate-800 dark:text-slate-100 text-[10px] font-extrabold flex items-center justify-center">
                2
              </span>
            </div>
            <div className="mt-3 text-center">
              <div className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[90px] sm:max-w-[120px]">
                {topThree[1].name}
              </div>
              <div className="text-[11px] text-amber-500 font-bold">{topThree[1].xp} XP</div>
            </div>
            <div className="w-full h-16 sm:h-20 mt-2 bg-gradient-to-t from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-800/50 rounded-t-xl" />
          </div>

          {/* 1st place */}
          <div className="flex flex-col items-center order-2">
            <Crown className="w-6 h-6 text-amber-400 mb-1 animate-bounce" />
            <div className="relative">
              <img
                src={topThree[0].avatar}
                alt={topThree[0].name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-amber-400 object-cover shadow-xl"
              />
              <span className="absolute -bottom-2 inset-x-0 mx-auto w-6 h-6 rounded-full bg-amber-400 text-slate-950 text-xs font-extrabold flex items-center justify-center shadow">
                1
              </span>
            </div>
            <div className="mt-3 text-center">
              <div className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate max-w-[100px] sm:max-w-[140px]">
                {topThree[0].name}
              </div>
              <div className="text-xs text-amber-500 font-extrabold">{topThree[0].xp} XP</div>
            </div>
            <div className="w-full h-24 sm:h-28 mt-2 bg-gradient-to-t from-amber-500/30 to-amber-400/10 dark:from-amber-950/60 dark:to-amber-900/20 rounded-t-xl border-t border-amber-400/40" />
          </div>

          {/* 3rd place */}
          <div className="flex flex-col items-center order-3">
            <div className="relative">
              <img
                src={topThree[2].avatar}
                alt={topThree[2].name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-amber-700/50 object-cover shadow-md"
              />
              <span className="absolute -bottom-2 inset-x-0 mx-auto w-5 h-5 rounded-full bg-amber-700/80 text-white text-[10px] font-extrabold flex items-center justify-center">
                3
              </span>
            </div>
            <div className="mt-3 text-center">
              <div className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[90px] sm:max-w-[120px]">
                {topThree[2].name}
              </div>
              <div className="text-[11px] text-amber-500 font-bold">{topThree[2].xp} XP</div>
            </div>
            <div className="w-full h-12 sm:h-16 mt-2 bg-gradient-to-t from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-800/50 rounded-t-xl" />
          </div>
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filteredLeaderboard.map((user, idx) => {
            const isMe = user.isCurrentUser;
            return (
              <div
                key={user.id}
                className={`flex items-center justify-between p-4 sm:px-6 transition-colors ${
                  isMe
                    ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-l-4 border-emerald-500'
                    : 'hover:bg-slate-50/70 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <span className="w-6 text-center font-bold text-sm text-slate-500 dark:text-slate-400">
                    {idx + 1}
                  </span>

                  {/* Avatar & Name */}
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          {user.name}
                        </span>
                        {isMe && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                            {t.leaderboard.you}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 uppercase">
                        {user.league} League
                      </span>
                    </div>
                  </div>
                </div>

                {/* Streak & XP */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
                    <Flame className="w-4 h-4 fill-amber-500" />
                    <span>{user.streak}d</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white min-w-[70px] text-end">
                    <Zap className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
                    <span>{user.xp} XP</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
