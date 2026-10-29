import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Language,
  Direction,
  Theme,
  Course,
  Achievement,
  Certificate,
  ForumPost,
  LeaderboardUser,
  UserStats,
} from '../types';
import { coursesData } from '../data/courses';
import { getLocalizedCourses } from '../data/localizedCourses';
import { initialAchievements } from '../data/achievements';
import { mockForumPosts, mockLeaderboardData } from '../data/mockCommunity';

interface AppContextType {
  language: Language;
  direction: Direction;
  theme: Theme;
  activeView: 'tracks' | 'track-detail' | 'challenge' | 'leaderboard' | 'forum' | 'certificates' | 'profile';
  selectedCourseId: string;
  selectedLessonId: string;
  userStats: UserStats;
  courses: Course[];
  achievements: Achievement[];
  certificates: Certificate[];
  forumPosts: ForumPost[];
  leaderboard: LeaderboardUser[];
  activeCertificateModal: Certificate | null;
  // Actions
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  setActiveView: (view: 'tracks' | 'track-detail' | 'challenge' | 'leaderboard' | 'forum' | 'certificates' | 'profile') => void;
  openCourse: (courseId: string) => void;
  openLesson: (courseId: string, lessonId: string) => void;
  completeLesson: (courseId: string, lessonId: string, earnedXp: number) => void;
  addForumPost: (post: Omit<ForumPost, 'id' | 'createdAt' | 'upvotes' | 'replies'>) => void;
  addForumReply: (postId: string, content: string) => void;
  upvoteForumPost: (postId: string) => void;
  claimCertificate: (courseId: string) => Certificate;
  setActiveCertificateModal: (cert: Certificate | null) => void;
  updateUserSettings: (name: string, dailyGoalXp: number) => void;
  triggerCelebration: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_PREFIX = 'devpulse_';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Language & Direction
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}lang`);
    return (saved as Language) || 'en';
  });

  const direction: Direction = language === 'fa' || language === 'ar' ? 'rtl' : 'ltr';

  // 2. Theme
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}theme`);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'dark'; // default to high quality dark theme
  });

  // 3. Navigation View
  const [activeView, setActiveView] = useState<'tracks' | 'track-detail' | 'challenge' | 'leaderboard' | 'forum' | 'certificates' | 'profile'>('tracks');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('course-js-core');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('les-js-1');
  const [activeCertificateModal, setActiveCertificateModal] = useState<Certificate | null>(null);

  // 4. User Stats & Progress
  const [userStats, setUserStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}stats`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }

    // Default stats
    const today = new Date().toISOString().split('T')[0];
    const initialCalendar: Record<string, number> = {};
    // Seed some activity for the past 14 days
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      initialCalendar[key] = i % 3 === 0 ? 3 : i % 2 === 0 ? 2 : 1;
    }

    return {
      name: 'Alex Developer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      xp: 1250,
      level: 4,
      streak: 8,
      bestStreak: 14,
      lastActiveDate: today,
      streakFreezeCount: 2,
      dailyGoalXp: 100,
      dailyGoalAchieved: false,
      completedLessonIds: [],
      completedChallengeIds: [],
      activeCourseId: 'course-js-core',
      unlockedCertificateIds: [],
      activityCalendar: initialCalendar,
    };
  });

  // Courses dynamically localized according to selected language
  const courses = useMemo(() => getLocalizedCourses(language), [language]);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(mockForumPosts);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>(mockLeaderboardData);

  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}certs`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  // Sync DOM with direction & language
  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', direction);
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}lang`, language);
  }, [language, direction]);

  // Sync DOM with dark mode class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.classList.remove('dark');
    }
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}theme`, theme);
  }, [theme]);

  // Save stats to localStorage
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}stats`, JSON.stringify(userStats));
  }, [userStats]);

  // Save certs to localStorage
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}certs`, JSON.stringify(certificates));
  }, [certificates]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6'],
      });
    } catch {
      // safe fallback
    }
  };

  const openCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setActiveView('track-detail');
  };

  const openLesson = (courseId: string, lessonId: string) => {
    setSelectedCourseId(courseId);
    setSelectedLessonId(lessonId);
    setActiveView('challenge');
  };

  const completeLesson = (courseId: string, lessonId: string, earnedXp: number) => {
    const today = new Date().toISOString().split('T')[0];

    setUserStats((prev) => {
      const alreadyCompleted = prev.completedLessonIds.includes(lessonId);
      const newLessonIds = alreadyCompleted ? prev.completedLessonIds : [...prev.completedLessonIds, lessonId];
      const newChallengeIds = alreadyCompleted ? prev.completedChallengeIds : [...prev.completedChallengeIds, lessonId];
      const newXp = prev.xp + earnedXp;
      const newLevel = Math.floor(newXp / 300) + 1;

      const currentDayCount = (prev.activityCalendar[today] || 0) + 1;
      const updatedCalendar = {
        ...prev.activityCalendar,
        [today]: currentDayCount,
      };

      const dailyGoalMet = prev.dailyGoalAchieved || (currentDayCount * earnedXp >= prev.dailyGoalXp);

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        completedLessonIds: newLessonIds,
        completedChallengeIds: newChallengeIds,
        dailyGoalAchieved: dailyGoalMet,
        activityCalendar: updatedCalendar,
      };
    });

    // Update leaderboard current user entry
    setLeaderboard((prev) =>
      prev.map((user) =>
        user.isCurrentUser ? { ...user, xp: user.xp + earnedXp } : user
      )
    );

    triggerCelebration();

    // Check if course is fully completed to unlock certificate!
    const targetCourse = courses.find((c) => c.id === courseId);
    if (targetCourse) {
      const allLessonIds = targetCourse.modules.flatMap((m) => m.lessons.map((l) => l.id));
      const allDone = allLessonIds.every(
        (id) => id === lessonId || userStats.completedLessonIds.includes(id)
      );

      if (allDone && !certificates.some((c) => c.courseId === courseId)) {
        claimCertificate(courseId);
      }
    }
  };

  const claimCertificate = (courseId: string): Certificate => {
    const targetCourse = courses.find((c) => c.id === courseId);
    const courseTitle = targetCourse ? targetCourse.title : 'Software Engineering Specialization';
    const badgeTitle = targetCourse ? targetCourse.badgeTitle : 'Accredited Specialist';

    const randomSerial = Math.floor(1000 + Math.random() * 9000);
    const newCert: Certificate = {
      id: `cert-${courseId}-${Date.now()}`,
      courseId,
      courseTitle,
      recipientName: userStats.name,
      issueDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      credentialId: `DEVPULSE-${courseId.toUpperCase().slice(-5)}-${randomSerial}`,
      scorePercent: 98,
      badgeTitle,
    };

    setCertificates((prev) => {
      if (prev.some((c) => c.courseId === courseId)) return prev;
      return [...prev, newCert];
    });

    setUserStats((prev) => ({
      ...prev,
      unlockedCertificateIds: Array.from(new Set([...prev.unlockedCertificateIds, courseId])),
    }));

    // Unlock achievement
    setAchievements((prev) =>
      prev.map((ach) =>
        ach.id === 'ach-first-cert' ? { ...ach, unlocked: true, unlockedAt: new Date().toISOString().split('T')[0] } : ach
      )
    );

    triggerCelebration();
    setActiveCertificateModal(newCert);
    return newCert;
  };

  const addForumPost = (post: Omit<ForumPost, 'id' | 'createdAt' | 'upvotes' | 'replies'>) => {
    const newPost: ForumPost = {
      ...post,
      id: `post-${Date.now()}`,
      createdAt: 'Just now',
      upvotes: 1,
      replies: [],
    };
    setForumPosts((prev) => [newPost, ...prev]);

    // Unlock community achievement
    setAchievements((prev) =>
      prev.map((ach) =>
        ach.id === 'ach-community-voice'
          ? { ...ach, unlocked: true, unlockedAt: new Date().toISOString().split('T')[0] }
          : ach
      )
    );
  };

  const addForumReply = (postId: string, content: string) => {
    setForumPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            replies: [
              ...post.replies,
              {
                id: `reply-${Date.now()}`,
                authorName: userStats.name,
                authorAvatar: userStats.avatar,
                content,
                createdAt: 'Just now',
                upvotes: 0,
              },
            ],
          };
        }
        return post;
      })
    );
  };

  const upvoteForumPost = (postId: string) => {
    setForumPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
      )
    );
  };

  const updateUserSettings = (name: string, dailyGoalXp: number) => {
    setUserStats((prev) => ({
      ...prev,
      name,
      dailyGoalXp,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        language,
        direction,
        theme,
        activeView,
        selectedCourseId,
        selectedLessonId,
        userStats,
        courses,
        achievements,
        certificates,
        forumPosts,
        leaderboard,
        activeCertificateModal,
        setLanguage,
        setTheme,
        setActiveView,
        openCourse,
        openLesson,
        completeLesson,
        addForumPost,
        addForumReply,
        upvoteForumPost,
        claimCertificate,
        setActiveCertificateModal,
        updateUserSettings,
        triggerCelebration,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
