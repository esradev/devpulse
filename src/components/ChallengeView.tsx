import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Copy,
  Check,
  Bot,
  HelpCircle,
  Lightbulb,
  Terminal,
  Code2,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Sparkles,
  BookOpen,
  Award,
  AlertTriangle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../i18n/translations';
import { executeCodeWithTests, RunResults } from '../utils/codeRunner';
import { AiMentorModal } from './AiMentorModal';

export const ChallengeView: React.FC = () => {
  const {
    language,
    direction,
    courses,
    selectedCourseId,
    selectedLessonId,
    openLesson,
    completeLesson,
    setActiveView,
    userStats,
  } = useApp();
  const t = getTranslation(language);

  const course = courses.find((c) => c.id === selectedCourseId) || courses[0];
  const allLessons = course.modules.flatMap((m) => m.lessons);
  const currentLessonIndex = allLessons.findIndex((l) => l.id === selectedLessonId);
  const lesson = currentLessonIndex >= 0 ? allLessons[currentLessonIndex] : allLessons[0];
  const challenge = lesson?.challenge;

  const [code, setCode] = useState(challenge?.starterCode || '');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'problem' | 'theory' | 'hints' | 'solutions'>('problem');
  const [revealedHintsCount, setRevealedHintsCount] = useState(0);
  const [running, setRunning] = useState(false);
  const [runResults, setRunResults] = useState<RunResults | null>(null);
  const [activeBottomTab, setActiveBottomTab] = useState<'tests' | 'console'>('tests');
  const [showAiModal, setShowAiModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;
  const BackIcon = direction === 'rtl' ? ArrowRight : ArrowLeft;

  // Sync starter code when challenge or language changes
  useEffect(() => {
    if (challenge) {
      setCode(challenge.starterCode);
      setRunResults(null);
      setRevealedHintsCount(0);
      setShowSuccessModal(false);
    }
  }, [challenge?.id, language]);

  // Handle Tab key inside editor for proper indentation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleRunTests();
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newCode);

      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetCode = () => {
    if (challenge) {
      setCode(challenge.starterCode);
      setRunResults(null);
    }
  };

  const handleRunTests = async () => {
    if (!challenge) return;
    setRunning(true);
    try {
      const results = await executeCodeWithTests(code, challenge.testCases, challenge.language);
      setRunResults(results);
      if (results.allPassed) {
        completeLesson(course.id, lesson.id, challenge.xpReward);
        setShowSuccessModal(true);
      }
    } finally {
      setRunning(false);
    }
  };

  const handleNextChallenge = () => {
    setShowSuccessModal(false);
    if (currentLessonIndex < allLessons.length - 1) {
      const nextL = allLessons[currentLessonIndex + 1];
      openLesson(course.id, nextL.id);
    } else {
      setActiveView('track-detail');
    }
  };

  if (!challenge) {
    return (
      <div className="p-8 text-center text-slate-500">
        No challenge loaded. Please select a lesson from tracks.
      </div>
    );
  }

  // Calculate lines for line number gutter
  const lineCount = Math.max(code.split('\n').length, 14);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div className="space-y-4">
      {/* Top Breadcrumb & Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView('track-detail')}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <BackIcon className="w-3.5 h-3.5" />
            <span>{course.title}</span>
          </button>
          <span className="text-slate-300 dark:text-slate-700">/</span>
          <span className="text-xs font-bold text-slate-900 dark:text-white">
            {lesson.title}
          </span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            +{challenge.xpReward} XP
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* AI Mentor Assistant Trigger */}
          <button
            onClick={() => setShowAiModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-xs font-bold transition-all cursor-pointer shadow-xs"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>{t.challenge.askAiMentor}</span>
          </button>

          {/* Reset Code */}
          <button
            onClick={handleResetCode}
            title={t.challenge.resetCode}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Copy Code */}
          <button
            onClick={handleCopyCode}
            title={t.challenge.copyCode}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Split-Pane Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[640px]">
        {/* Left Pane: Instructions, Theory, Hints, Solutions (5 cols) */}
        <div className="lg:col-span-5 flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
          {/* Tabs header */}
          <div className="flex items-center border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 px-2 pt-2">
            <button
              onClick={() => setActiveTab('problem')}
              className={`px-3 py-2 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                activeTab === 'problem'
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {t.challenge.instructions}
            </button>
            <button
              onClick={() => setActiveTab('theory')}
              className={`px-3 py-2 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                activeTab === 'theory'
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {t.challenge.theory}
            </button>
            <button
              onClick={() => setActiveTab('hints')}
              className={`px-3 py-2 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1 ${
                activeTab === 'hints'
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <span>{t.challenge.hints}</span>
              {challenge.hints.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400 text-[10px] flex items-center justify-center font-bold">
                  {challenge.hints.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('solutions')}
              className={`px-3 py-2 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                activeTab === 'solutions'
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {t.challenge.communitySolutions}
            </button>
          </div>

          {/* Left Pane Content Body */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {activeTab === 'problem' && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    {challenge.title}
                  </h2>
                  <p className="mt-2 text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
                    {challenge.description}
                  </p>
                </div>

                {/* Example Test Case Expectations */}
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Test Case Requirements:
                  </h4>
                  <div className="space-y-2">
                    {challenge.testCases.map((tc, idx) => (
                      <div
                        key={tc.id}
                        className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-3 text-xs"
                      >
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                          Test {idx + 1}: {tc.description}
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                          <div>
                            <span className="text-slate-400">Input: </span>
                            <span className="text-emerald-600 dark:text-emerald-400">{tc.input}</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Expected: </span>
                            <span className="text-indigo-600 dark:text-indigo-400">{tc.expectedOutput}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'theory' && (
              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Deep Dive & Architectural Principles
                </h3>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 font-mono text-xs whitespace-pre-wrap leading-relaxed text-slate-800 dark:text-slate-300">
                  {challenge.theory}
                </div>
              </div>
            )}

            {activeTab === 'hints' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                    Progressive Hints
                  </h3>
                  <span className="text-xs text-slate-500">
                    {revealedHintsCount} of {challenge.hints.length} revealed
                  </span>
                </div>

                <div className="space-y-3">
                  {challenge.hints.map((hint, i) => {
                    const isRevealed = i < revealedHintsCount;
                    return (
                      <div
                        key={i}
                        className={`rounded-xl border p-3.5 transition-all ${
                          isRevealed
                            ? 'border-amber-300/60 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 text-amber-950 dark:text-amber-200'
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-slate-400'
                        }`}
                      >
                        {isRevealed ? (
                          <div className="flex items-start gap-2.5 text-xs">
                            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                            <div className="whitespace-pre-wrap">{hint}</div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between text-xs">
                            <span>Hint {i + 1} locked</span>
                            {i === revealedHintsCount && (
                              <button
                                onClick={() => setRevealedHintsCount((prev) => prev + 1)}
                                className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-[11px] cursor-pointer"
                              >
                                {t.challenge.showHint.replace('{num}', String(i + 1))}
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'solutions' && (
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
                  <div className="font-bold text-slate-900 dark:text-white mb-1">
                    Canonical Reference Implementation
                  </div>
                  <pre className="font-mono text-[11px] p-2 bg-slate-900 text-slate-100 rounded-lg overflow-x-auto">
                    {challenge.solutionCode}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Pane: Code Editor + Test Console (7 cols) */}
        <div className="lg:col-span-7 flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
          {/* Editor Header Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50/90 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                {challenge.language}
              </span>
              <span className="text-[11px] text-slate-400">· UTF-8</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-[11px] text-slate-400 font-mono">
                Ctrl + Enter to run
              </span>
              <button
                onClick={handleRunTests}
                disabled={running}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs shadow-sm shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <Play className={`w-3.5 h-3.5 fill-white ${running ? 'animate-spin' : ''}`} />
                <span>{running ? t.common.loading : t.challenge.runTests}</span>
              </button>
            </div>
          </div>

          {/* Interactive Code Editor Area */}
          <div className="relative flex-1 min-h-[300px] flex bg-slate-950 text-slate-100 font-mono text-xs sm:text-sm overflow-hidden">
            {/* Line Number Gutter */}
            <div className="w-10 sm:w-12 select-none py-3.5 text-right pe-3 font-mono text-slate-600 text-xs border-r border-slate-800/80 bg-slate-950/90 shrink-0">
              {lineNumbers.map((num) => (
                <div key={num} className="leading-6">
                  {num}
                </div>
              ))}
            </div>

            {/* Code Textarea */}
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              className="flex-1 w-full h-full p-3.5 bg-transparent resize-none focus:outline-none font-mono text-xs sm:text-sm text-emerald-400 leading-6 whitespace-pre"
              style={{
                tabSize: 2,
                direction: 'ltr',
                textAlign: 'left',
              }}
            />
          </div>

          {/* Bottom Execution & Test Results Panel */}
          <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 flex flex-col max-h-[260px]">
            {/* Panel Tabs Header */}
            <div className="flex items-center justify-between px-4 pt-2 border-b border-slate-200 dark:border-slate-800 text-xs">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveBottomTab('tests')}
                  className={`pb-2 font-bold border-b-2 cursor-pointer transition-colors ${
                    activeBottomTab === 'tests'
                      ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {t.challenge.tests}
                  {runResults && (
                    <span className="ms-1.5 text-[10px] px-1.5 py-0.2 rounded font-bold bg-slate-200 dark:bg-slate-800">
                      {runResults.results.filter((r) => r.passed).length}/{runResults.results.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveBottomTab('console')}
                  className={`pb-2 font-bold border-b-2 cursor-pointer transition-colors ${
                    activeBottomTab === 'console'
                      ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {t.challenge.console}
                  {runResults && runResults.logs.length > 0 && (
                    <span className="ms-1.5 text-[10px] px-1.5 py-0.2 rounded font-bold bg-slate-200 dark:bg-slate-800">
                      {runResults.logs.length}
                    </span>
                  )}
                </button>
              </div>

              {runResults && (
                <div className="text-[11px] text-slate-500 pb-2">
                  Total runtime: {runResults.totalDurationMs}ms
                </div>
              )}
            </div>

            {/* Panel Body */}
            <div className="p-4 overflow-y-auto space-y-2 text-xs">
              {!runResults ? (
                <div className="text-slate-400 italic py-2 text-center">
                  Click &quot;Run Tests&quot; or press Ctrl+Enter to execute test suite.
                </div>
              ) : activeBottomTab === 'tests' ? (
                <div className="space-y-2">
                  {runResults.syntaxError && (
                    <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-900 text-rose-700 dark:text-rose-400 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>{runResults.syntaxError}</span>
                    </div>
                  )}

                  {runResults.results.map((tr, idx) => (
                    <div
                      key={tr.testCaseId}
                      className={`p-2.5 rounded-xl border flex flex-col gap-1 transition-colors ${
                        tr.passed
                          ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20'
                          : 'border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-semibold">
                          {tr.passed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                          )}
                          <span className={tr.passed ? 'text-emerald-900 dark:text-emerald-200' : 'text-rose-900 dark:text-rose-200'}>
                            Test #{idx + 1}: {tr.description}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-slate-400">
                          {tr.durationMs}ms
                        </span>
                      </div>

                      {!tr.passed && (
                        <div className="font-mono text-[11px] pl-6 pt-1 space-y-0.5 text-slate-600 dark:text-slate-400">
                          <div>
                            Input: <span className="text-slate-800 dark:text-slate-200">{tr.input}</span>
                          </div>
                          <div>
                            Expected: <span className="text-emerald-600 dark:text-emerald-400">{tr.expectedOutput}</span>
                          </div>
                          <div>
                            Actual: <span className="text-rose-600 dark:text-rose-400">{tr.actualOutput}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="font-mono text-xs space-y-1">
                  {runResults.logs.length === 0 ? (
                    <div className="text-slate-400 italic">No console logs captured.</div>
                  ) : (
                    runResults.logs.map((log, i) => (
                      <div key={i} className="text-slate-700 dark:text-slate-300">
                        &gt; {log}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* AI Mentor Dialog */}
      <AiMentorModal
        challenge={challenge}
        userCode={code}
        testError={runResults?.results.find((r) => !r.passed)?.actualOutput}
        isOpen={showAiModal}
        onClose={() => setShowAiModal(false)}
      />

      {/* Success Celebration Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl border border-emerald-500/30 bg-white dark:bg-slate-900 p-6 text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-md">
              <Sparkles className="w-8 h-8 animate-bounce" />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                {t.challenge.congratulations}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                {t.challenge.challengeSolved}
              </p>
            </div>

            <div className="py-2 px-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
              {t.challenge.earnedXp.replace('{xp}', String(challenge.xpReward))}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
              >
                {t.common.close}
              </button>
              <button
                onClick={handleNextChallenge}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                <span>{t.challenge.nextChallenge}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
