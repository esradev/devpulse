import { ForumPost, LeaderboardUser } from '../types';

export const mockForumPosts: ForumPost[] = [
  {
    id: 'post-1',
    title: 'How to optimize Reduce vs For Loop in large JavaScript arrays?',
    content: 'I noticed `.reduce()` is super expressive, but in large datasets (100k+ elements), does a standard `for` loop offer measurable performance gains? When should I prefer one over the other?',
    codeSnippet: `// Option A
const total = items.reduce((acc, x) => acc + x.price, 0);

// Option B
let sum = 0;
for (let i = 0; i < items.length; i++) {
  sum += items[i].price;
}`,
    language: 'javascript',
    category: 'javascript',
    tags: ['performance', 'es6', 'arrays'],
    authorName: 'Sarah Al-Mansoor',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    authorLevel: 7,
    createdAt: '2 hours ago',
    upvotes: 34,
    solved: true,
    replies: [
      {
        id: 'rep-1',
        authorName: 'Reza Tehrani',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        content: 'V8 engine optimizes modern reduce heavily. Unless you are running game loops or processing millions of audio samples at 60 FPS, the maintainability and functional clarity of `.reduce()` far outweighs a microsecond difference!',
        createdAt: '1 hour ago',
        upvotes: 21,
        isSolution: true,
      },
      {
        id: 'rep-2',
        authorName: 'Karim Zaid',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
        content: 'Always benchmark with `console.time()` on your exact target Node.js or browser version before premature optimization.',
        createdAt: '45 mins ago',
        upvotes: 8,
      },
    ],
  },
  {
    id: 'post-2',
    title: 'بهترین روش مدیریت خطا در توابع ناهمگام پایتون چیست؟',
    content: 'در پایتون وقتی چندین تسک همزمان با asyncio اجرا می‌کنیم، چطور می‌توانیم خطاها را بدون متوقف شدن کل حلقه مدیریت کنیم؟',
    codeSnippet: `import asyncio

async def fetch_data(task_id):
    if task_id == 2:
        raise ValueError("Network timeout")
    return f"Result {task_id}"`,
    language: 'python',
    category: 'python',
    tags: ['asyncio', 'python', 'exception-handling'],
    authorName: 'نیما صادقی',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    authorLevel: 5,
    createdAt: '5 hours ago',
    upvotes: 19,
    solved: true,
    replies: [
      {
        id: 'rep-3',
        authorName: 'مریم حسینی',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        content: 'استفاده از `return_exceptions=True` در متد `asyncio.gather` بهترین راهکاره. اینطوری اگر خطایی رخ بده، به عنوان نتیجه برگردانده میشه و بقیه تسک‌ها متوقف نمیشن.',
        createdAt: '3 hours ago',
        upvotes: 14,
        isSolution: true,
      },
    ],
  },
  {
    id: 'post-3',
    title: 'ما هو الفرق الدقيق بين Type و Interface في TypeScript؟',
    content: 'أعلم أن كلاهما يُستخدم لتحديد شكل البيانات، لكن متى يجب علي استخدام Type ومتى يجب استخدام Interface خصوصاً عند بناء مكتبات عامة؟',
    codeSnippet: `type UserType = { id: string; name: string };
interface UserInterface { id: string; name: string }`,
    language: 'typescript',
    category: 'typescript',
    tags: ['typescript', 'interfaces', 'types'],
    authorName: 'طارق عبد الله',
    authorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
    authorLevel: 8,
    createdAt: '1 day ago',
    upvotes: 42,
    solved: true,
    replies: [
      {
        id: 'rep-4',
        authorName: 'فاطمة النجار',
        authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
        content: 'الواجهات (Interfaces) تدعم الـ Declaration Merging وتصلح للمكتبات و OOP. بينما الـ Type يدعم الـ Union، Tuples والـ Primitive Aliases وهو أكثر مرونة في البرمجة الوظيفية.',
        createdAt: '20 hours ago',
        upvotes: 28,
        isSolution: true,
      },
    ],
  },
];

export const mockLeaderboardData: LeaderboardUser[] = [
  {
    id: 'lead-1',
    rank: 1,
    name: 'Amina El-Khatib',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    country: 'EG',
    xp: 4820,
    streak: 42,
    league: 'master',
  },
  {
    id: 'lead-2',
    rank: 2,
    name: 'Farhad Rastgoo',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    country: 'IR',
    xp: 4350,
    streak: 38,
    league: 'master',
  },
  {
    id: 'lead-3',
    rank: 3,
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    country: 'SE',
    xp: 3980,
    streak: 29,
    league: 'diamond',
  },
  {
    id: 'lead-4',
    rank: 4,
    name: 'Omar Benali',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    country: 'MA',
    xp: 3410,
    streak: 21,
    league: 'diamond',
  },
  {
    id: 'lead-5',
    rank: 5,
    name: 'Sahar Moradi',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    country: 'IR',
    xp: 3120,
    streak: 19,
    league: 'gold',
  },
  {
    id: 'lead-6',
    rank: 6,
    name: 'You (Alex Dev)',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    country: 'US',
    xp: 1250,
    streak: 8,
    league: 'gold',
    isCurrentUser: true,
  },
  {
    id: 'lead-7',
    rank: 7,
    name: 'Zaid Al-Harbi',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
    country: 'SA',
    xp: 1180,
    streak: 7,
    league: 'silver',
  },
  {
    id: 'lead-8',
    rank: 8,
    name: 'Parisa Ghasemi',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    country: 'IR',
    xp: 990,
    streak: 5,
    league: 'silver',
  },
];
