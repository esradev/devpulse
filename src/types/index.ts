export type Language = 'en' | 'fa' | 'ar';
export type Direction = 'ltr' | 'rtl';
export type Theme = 'light' | 'dark';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type TrackCategory = 'javascript' | 'python' | 'typescript' | 'go' | 'sql';

export interface TestCase {
  id: string;
  description: string;
  input: string;
  expectedOutput: string;
  isSecret?: boolean;
}

export interface Challenge {
  id: string;
  titleKey: string;
  title: string;
  description: string;
  theory: string;
  starterCode: string;
  language: string; // 'javascript' | 'python' | 'typescript' | 'go' | 'sql'
  solutionCode: string;
  testCases: TestCase[];
  hints: string[];
  xpReward: number;
}

export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  xpReward: number;
  type: 'challenge' | 'theory';
  challenge?: Challenge;
  completed?: boolean;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  category: TrackCategory;
  title: string;
  shortDescription: string;
  description: string;
  difficulty: Difficulty;
  estimatedHours: number;
  iconName: string;
  color: string;
  badgeTitle: string;
  totalXp: number;
  modules: Module[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpBonus: number;
  unlockedAt?: string;
  unlocked: boolean;
  category: 'streak' | 'course' | 'challenge' | 'community';
}

export interface Certificate {
  id: string;
  courseId: string;
  courseTitle: string;
  recipientName: string;
  issueDate: string;
  credentialId: string;
  scorePercent: number;
  badgeTitle: string;
}

export interface ForumReply {
  id: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  upvotes: number;
  isSolution?: boolean;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  codeSnippet?: string;
  language?: string;
  category: TrackCategory | 'general';
  tags: string[];
  authorName: string;
  authorAvatar: string;
  authorLevel: number;
  createdAt: string;
  upvotes: number;
  replies: ForumReply[];
  solved?: boolean;
}

export interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  country: string;
  xp: number;
  streak: number;
  league: 'bronze' | 'silver' | 'gold' | 'diamond' | 'master';
  isCurrentUser?: boolean;
}

export interface UserStats {
  name: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  bestStreak: number;
  lastActiveDate: string;
  streakFreezeCount: number;
  dailyGoalXp: number;
  dailyGoalAchieved: boolean;
  completedLessonIds: string[];
  completedChallengeIds: string[];
  activeCourseId: string;
  unlockedCertificateIds: string[];
  activityCalendar: Record<string, number>; // "YYYY-MM-DD": count
}
