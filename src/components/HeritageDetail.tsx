import React from 'react';
import { Heritage } from '../data/types';
import { Language, Translations } from '../i18n';

interface HeritageDetailProps {
  heritage: Heritage;
  lang: Language;
  t: Translations;
  onClose: () => void;
}

const HeritageDetail: React.FC<HeritageDetailProps> = ({
  heritage,
  lang,
  t,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 背景遮罩 */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 弹窗内容 */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-fadeIn">
        {/* 头部图片 */}
        <div className="relative h-48 sm:h-64 overflow-hidden">
          <img
            src={heritage.image}
            alt={heritage.name[lang]}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=${encodeURIComponent(heritage.name[lang])}`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* 关闭按钮 */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* 标题 */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center space-x-2 mb-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  heritage.type === 'tangible'
                    ? 'bg-blue-500 text-white'
                    : 'bg-amber-500 text-white'
                }`}
              >
                {heritage.type === 'tangible' ? t.filter.tangible : t.filter.intangible}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{heritage.name[lang]}</h2>
            <p className="text-blue-200 text-sm mt-1">{heritage.name[lang === 'zh' ? 'en' : 'zh']}</p>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-16rem)]">
          {/* 元信息 */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-50 rounded-lg p-3 text-center">
              <p className="text-xs text-slate-500 mb-1">{t.detail.year}</p>
              <p className="text-lg font-semibold text-slate-800">{heritage.year}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 text-center">
              <p className="text-xs text-slate-500 mb-1">{t.detail.country}</p>
              <p className="text-sm font-semibold text-slate-800">{heritage.country[lang]}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 text-center">
              <p className="text-xs text-slate-500 mb-1">{t.detail.category}</p>
              <p className="text-sm font-semibold text-slate-800">
                {t.filter[heritage.category as keyof typeof t.filter] || heritage.category}
              </p>
            </div>
          </div>

          {/* 描述 */}
          <div className="mb-6">
            <p className="text-slate-600 leading-relaxed">{heritage.description[lang]}</p>
          </div>

          {/* 操作按钮 */}
          <div className="flex space-x-3">
            <a
              href={heritage.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              {t.detail.visitOfficial}
            </a>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors"
            >
              {t.detail.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeritageDetail;
