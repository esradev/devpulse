import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  Printer,
  Share2,
  X,
  Check,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Certificate } from '../types';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../i18n/translations';

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  onClose,
}) => {
  const { language } = useApp();
  const t = getTranslation(language);
  const [copied, setCopied] = useState(false);

  if (!certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const fakeUrl = `https://devpulse.academy/verify/${certificate.credentialId}`;
    navigator.clipboard.writeText(fakeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-10 my-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Printable Canvas */}
        <div className="relative rounded-2xl border-4 border-double border-amber-600/30 dark:border-amber-500/40 p-6 sm:p-10 bg-radial from-amber-500/5 via-transparent to-transparent text-center space-y-6">
          {/* Top Seal & Academy Header */}
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-amber-400">
                <Award className="w-8 h-8" />
              </div>
            </div>
            <div className="uppercase tracking-[0.25em] text-xs font-bold text-amber-600 dark:text-amber-400">
              DevPulse International Code Academy
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-serif tracking-tight">
              Certificate of Completion
            </h2>
          </div>

          {/* Body Statement */}
          <div className="space-y-3 py-2">
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 italic">
              {t.certificates.criteria}
            </p>
            <div className="text-xs uppercase tracking-widest text-slate-400">
              {t.certificates.recipient}
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white border-b-2 border-slate-200 dark:border-slate-700 pb-2 inline-block px-8">
              {certificate.recipientName}
            </div>
          </div>

          {/* Course Name */}
          <div className="space-y-1">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              For demonstrably mastering the rigorous professional track:
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {certificate.courseTitle}
            </h3>
            <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">
              {certificate.badgeTitle} · Passed with Distinction (98% Test Score)
            </p>
          </div>

          {/* Signatures & Seal */}
          <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500 dark:text-slate-400">
            <div className="text-center sm:text-start space-y-1">
              <div className="font-mono text-[11px] text-slate-400">
                {t.certificates.issueDate}: {certificate.issueDate}
              </div>
              <div className="flex items-center gap-1 font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>{certificate.credentialId}</span>
              </div>
            </div>

            {/* Official Stamp */}
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-amber-500/50 flex flex-col items-center justify-center p-1 text-[9px] uppercase font-bold text-amber-600 dark:text-amber-400 select-none">
              <Sparkles className="w-4 h-4 mb-0.5" />
              <span>Verified</span>
              <span>Authentic</span>
            </div>

            <div className="text-center sm:text-end space-y-1">
              <div className="font-serif italic text-base text-slate-800 dark:text-slate-200">
                Dr. Linus M. Vance
              </div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400">
                Director of Academic Evaluation
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Digital credential cryptographically verified</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Link Copied!' : 'Share Credential'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{t.certificates.downloadPdf}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
