import React, { useState } from 'react';
import {
  MessageSquare,
  Search,
  Plus,
  ThumbsUp,
  CheckCircle2,
  Code2,
  Send,
  X,
  Filter,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../i18n/translations';
import { ForumPost } from '../types';

export const CommunityForumView: React.FC = () => {
  const {
    language,
    direction,
    forumPosts,
    addForumPost,
    addForumReply,
    upvoteForumPost,
    userStats,
  } = useApp();
  const t = getTranslation(language);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [replyText, setReplyText] = useState('');

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newCategory, setNewCategory] = useState<'javascript' | 'python' | 'typescript' | 'sql' | 'go' | 'general'>('javascript');
  const [newTags, setNewTags] = useState('algorithm, beginner');

  const ArrowIcon = direction === 'rtl' ? ArrowRight : ArrowLeft;

  const filteredPosts = forumPosts.filter((post) => {
    if (selectedCategory !== 'all' && post.category !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        post.title.toLowerCase().includes(q) ||
        post.content.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    addForumPost({
      title: newTitle,
      content: newContent,
      codeSnippet: newCode.trim() ? newCode : undefined,
      category: newCategory,
      tags: newTags.split(',').map((t) => t.trim()).filter(Boolean),
      authorName: userStats.name,
      authorAvatar: userStats.avatar,
      authorLevel: userStats.level,
      solved: false,
    });

    setNewTitle('');
    setNewContent('');
    setNewCode('');
    setShowNewPostModal(false);
  };

  const handleSendReply = (postId: string) => {
    if (!replyText.trim()) return;
    addForumReply(postId, replyText);
    setReplyText('');
    // refresh selected post reference
    const updated = forumPosts.find((p) => p.id === postId);
    if (updated) setSelectedPost(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-emerald-500" />
            <span>{t.forum.title}</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t.forum.subtitle}
          </p>
        </div>

        <button
          onClick={() => setShowNewPostModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{t.forum.askQuestion}</span>
        </button>
      </div>

      {selectedPost ? (
        /* Single Post Detail View */
        <div className="space-y-6">
          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <ArrowIcon className="w-3.5 h-3.5" />
            <span>Back to discussions</span>
          </button>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedPost.authorAvatar}
                  alt={selectedPost.authorName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {selectedPost.authorName}
                  </h4>
                  <span className="text-xs text-slate-400">
                    Level {selectedPost.authorLevel} · {selectedPost.createdAt}
                  </span>
                </div>
              </div>

              <button
                onClick={() => upvoteForumPost(selectedPost.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <ThumbsUp className="w-3.5 h-3.5 text-emerald-500" />
                <span>{selectedPost.upvotes}</span>
              </button>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {selectedPost.title}
              </h2>
              <p className="mt-3 text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                {selectedPost.content}
              </p>
            </div>

            {selectedPost.codeSnippet && (
              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto">
                <pre>{selectedPost.codeSnippet}</pre>
              </div>
            )}

            {/* Replies section */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Replies ({selectedPost.replies.length})
              </h3>

              <div className="space-y-3">
                {selectedPost.replies.map((reply) => (
                  <div
                    key={reply.id}
                    className={`p-4 rounded-xl border ${
                      reply.isSolution
                        ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={reply.authorAvatar}
                          alt={reply.authorName}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                          {reply.authorName}
                        </span>
                        <span className="text-[11px] text-slate-400">· {reply.createdAt}</span>
                      </div>
                      {reply.isSolution && (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{t.forum.acceptedSolution}</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {reply.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* Reply Input */}
              <div className="pt-2 flex gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendReply(selectedPost.id)}
                  placeholder={t.forum.replyToPost}
                  className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  onClick={() => handleSendReply(selectedPost.id)}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer"
                >
                  <Send className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Forum List View */
        <div className="space-y-4">
          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute top-3 start-3.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.forum.searchPlaceholder}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl ps-10 pe-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex gap-2 text-xs">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-700 dark:text-slate-300 font-medium focus:outline-none"
              >
                <option value="all">{t.forum.filterAll}</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="typescript">TypeScript</option>
                <option value="sql">SQL</option>
                <option value="go">Go</option>
              </select>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="space-y-3">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500/40 p-5 transition-all cursor-pointer shadow-xs hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {post.category}
                      </span>
                      {post.solved && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{t.forum.solved}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {post.content}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <img
                          src={post.authorAvatar}
                          alt={post.authorName}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="text-slate-600 dark:text-slate-300 font-medium">
                          {post.authorName}
                        </span>
                      </div>
                      <span>·</span>
                      <span>{post.createdAt}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <div className="flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/80 px-2.5 py-1 rounded-lg">
                      <ThumbsUp className="w-3 h-3 text-emerald-500" />
                      <span>{post.upvotes}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {post.replies.length} {t.forum.replies}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {t.forum.askQuestion}
              </h3>
              <button
                onClick={() => setShowNewPostModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {t.forum.newPostTitle}
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  placeholder="e.g. How to handle async timeouts in Node.js?"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {t.forum.newPostCategory}
                </label>
                <select
                  value={newCategory}
                  onChange={(e: any) => setNewCategory(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="typescript">TypeScript</option>
                  <option value="sql">SQL</option>
                  <option value="go">Go</option>
                  <option value="general">General</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {t.forum.newPostContent}
                </label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  required
                  rows={4}
                  placeholder="Describe what you are trying to accomplish, and what you have tried..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {t.forum.newPostCode}
                </label>
                <textarea
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  rows={3}
                  placeholder="// Paste your code here..."
                  className="w-full font-mono bg-slate-950 text-emerald-400 border border-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none"
                  style={{ direction: 'ltr' }}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-slate-600 dark:text-slate-400"
                >
                  {t.forum.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                >
                  {t.forum.submitQuestion}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
