import React from 'react';
import { Language, Translations } from '../i18n';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const Header: React.FC<HeaderProps> = ({ lang, setLang, t }) => {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight">{t.title}</h1>
              <p className="text-xs sm:text-sm text-blue-200 hidden sm:block">{t.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setLang('zh')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                lang === 'zh'
                  ? 'bg-white text-slate-900'
                  : 'text-blue-200 hover:bg-white/10'
              }`}
            >
              中文
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                lang === 'en'
                  ? 'bg-white text-slate-900'
                  : 'text-blue-200 hover:bg-white/10'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
