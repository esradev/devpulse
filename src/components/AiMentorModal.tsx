import React, { useState } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  HelpCircle,
  Lightbulb,
  CheckCircle,
  Terminal,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../i18n/translations';
import { Challenge } from '../types';

interface AiMentorModalProps {
  challenge: Challenge;
  userCode: string;
  testError?: string;
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'user' | 'mentor';
  text: string;
  codeSnippet?: string;
}

export const AiMentorModal: React.FC<AiMentorModalProps> = ({
  challenge,
  userCode,
  testError,
  isOpen,
  onClose,
}) => {
  const { language } = useApp();
  const t = getTranslation(language);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'mentor',
      text:
        language === 'fa'
          ? `سلام! من مربی هوش مصنوعی شما برای چالش "${challenge.title}" هستم. کدهای شما را دیدم. هر سوال مفهومی دارید بپرسید تا با تفکر الگوریتمی راهنمایی‌تان کنم!`
          : language === 'ar'
          ? `مرحباً بك! أنا مرشدك الذكي لتحدي "${challenge.title}". اطلعت على الكود الذي كتبته، اطرح أي تساؤل وسأوجهك منطقياً للحل دون حرق الكود مباشرة!`
          : `Hello! I'm your AI Code Mentor for "${challenge.title}". Ask me any conceptual question, or click one of the suggested prompts below, and I'll guide your problem-solving step by step!`,
    },
  ]);

  if (!isOpen) return null;

  const handleSend = (questionText?: string) => {
    const q = questionText || input;
    if (!q.trim()) return;

    const newMessages: Message[] = [...messages, { sender: 'user', text: q }];
    setMessages(newMessages);
    if (!questionText) setInput('');
    setLoading(true);

    // Generate intelligent contextual response
    setTimeout(() => {
      let mentorResponse = '';

      const lowerQ = q.toLowerCase();

      if (
        lowerQ.includes('explain') ||
        lowerQ.includes('توضیح') ||
        lowerQ.includes('شرح')
      ) {
        mentorResponse =
          language === 'fa'
            ? `صورت مسئله از شما می‌خواهد: \n۱. ورودی دریافتی را پردازش کنید.\n۲. شرط‌های مسئله را گام‌به‌گام بررسی کنید.\n۳. خروجی را با همان فرمت درخواستی تست‌ها برگردانید.\nنکته کلیدی: به تمایز نوع داده‌ها (مثلا آرایه در برابر مقدار منفرد) دقت فرمایید.`
            : language === 'ar'
            ? `شرح مبسط للمطلوب:\n1. استقبال البيانات المدخلة ومعالجتها.\n2. تطبيق الشروط المحددة في السؤال خطوة بخطوة.\n3. إرجاع النتيجة بالهيئة المطابقة للمتوقع تماماً.\nنقطة هامة: تأكد من مراعاة نوع المتغير (مصفوفة أو كائن).`
            : `Here is the core logic: \n1. Inspect each element of the provided input.\n2. Apply the filtering / transformation rule specified in the challenge.\n3. Verify your return statement matches the exact format specified in the test cases.\nFocus on chaining functional operations cleanly!`;
      } else if (
        lowerQ.includes('hint') ||
        lowerQ.includes('راهنما') ||
        lowerQ.includes('تلميح') ||
        lowerQ.includes('structure') ||
        lowerQ.includes('algorithm')
      ) {
        mentorResponse =
          language === 'fa'
            ? `راهنمای الگوریتمی:\nبرای زبان ${challenge.language}، استفاده از متدهای توکار استاندارد بهترین عملکرد را دارد. مثلاً اگر نیاز به فیلتر و تبدیل دارید، ترکیب دو متد مستقیم باعث کوتاه‌تر شدن کد و خطای کمتر می‌شود. همچنین می‌توانید از یک حلقه ساده استفاده کنید.`
            : language === 'ar'
            ? `تلميح خوارزمي:\nفي لغة ${challenge.language}، الاعتماد على الدوال المضمنة هو الأفضل. إذا كنت بحاجة لفلترة البيانات ثم تحويلها، يمكنك الدمج بينهما بسلاسة، أو استخدام حلقة تكرار بسيطة لتجميع النتائج في مصفوفة جديدة.`
            : `Algorithmic Hint:\nFor ${challenge.language}, consider the time complexity. Are you modifying an array in place or returning a new transformed copy? Check if methods like filter/map or a single accumulator loop can achieve this in O(N) time.`;
      } else if (
        lowerQ.includes('error') ||
        lowerQ.includes('خطا') ||
        lowerQ.includes('فشل') ||
        testError
      ) {
        mentorResponse =
          language === 'fa'
            ? `بررسی خطای احتمالی:\nدلیل عدم پاس شدن تست اغلب به مقادیر مرزی برمی‌گردد: مثلاً آرایه خالی، اعداد منفی یا فرمت تبدیل JSON. مطمئن شوید که تابع شما صریحاً مقدار نهایی را return می‌کند و undefined برنمی‌گرداند.`
            : language === 'ar'
            ? `تحليل سبب عدم اجتياز الاختبار:\nغالباً ما يرجع ذلك إلى الحالات الخاصة (Edge Cases) مثل المصفوفات الفارغة أو الصفر. تأكد من أن الدالة ترجع (return) القيمة بوضوح وليست undefined.`
            : `Debugging Diagnosis:\nTest failures commonly occur when edge cases (e.g. empty collections, negative numbers, or missing return statements) are unhandled. Verify your function explicitly returns the transformed result rather than undefined!`;
      } else {
        mentorResponse =
          language === 'fa'
            ? `سوال عالی‌ای است! در این چالش، ورودی‌ها را تک‌به‌تک ردگیری کنید. تست اول را دستی روی کاغذ اجرا کنید تا ببینید متغیر در کدام خط مقدار غیرمنتظره می‌گیرد.`
            : language === 'ar'
            ? `سؤال ذكي! أنصحك بتتبع سير البيانات في كل سطر برمجياً لمعرفة أين بالضبط تبدأ القيمة في الاختلاف عن النتيجة المتوقعة.`
            : `Great question! Try tracing the execution with the first test case input step by step. What is the value of your variables after the first loop or method invocation?`;
      }

      setMessages((prev) => [...prev, { sender: 'mentor', text: mentorResponse }]);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <span>{t.aiMentor.title}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Socratic Mode
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.aiMentor.subtitle} · {challenge.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'mentor' && (
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  m.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-tr-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-xs border border-slate-200/50 dark:border-slate-700/50'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-2.5 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <span>Reasoning through challenge semantics...</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Quick Prompts */}
        <div className="p-3 bg-slate-50/80 dark:bg-slate-950/60 border-t border-slate-200/60 dark:border-slate-800/60">
          <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Recommended Questions:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {t.aiMentor.suggestedQuestions.map((sq, i) => (
              <button
                key={i}
                onClick={() => handleSend(sq)}
                className="text-xs text-start bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 transition-all cursor-pointer"
              >
                {sq}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.aiMentor.prompt}
            className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm rounded-xl px-4 py-2.5 border-0 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};
