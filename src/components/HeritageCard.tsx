import React from 'react';
import { Heritage } from '../data/types';
import { Language, Translations } from '../i18n';

interface HeritageCardProps {
  heritage: Heritage;
  lang: Language;
  t: Translations;
  isSelected: boolean;
  onClick: () => void;
}

const HeritageCard: React.FC<HeritageCardProps> = ({
  heritage,
  lang,
  t,
  isSelected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer rounded-xl overflow-hidden transition-all duration-200 ${
        isSelected
          ? 'ring-2 ring-blue-500 shadow-lg scale-[1.02]'
          : 'shadow-sm hover:shadow-md hover:scale-[1.01]'
      }`}
    >
      <div className="relative h-32 overflow-hidden">
        <img
          src={heritage.image}
          alt={heritage.name[lang]}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://via.placeholder.com/400x200/3B82F6/FFFFFF?text=${encodeURIComponent(heritage.name[lang])}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-2 left-2 right-2">
          <h3 className="text-white font-semibold text-sm leading-tight">{heritage.name[lang]}</h3>
          <p className="text-blue-200 text-xs mt-0.5">{heritage.name[lang === 'zh' ? 'en' : 'zh']}</p>
        </div>
        <div className="absolute top-2 right-2">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
              heritage.type === 'tangible'
                ? 'bg-blue-500/90 text-white'
                : 'bg-amber-500/90 text-white'
            }`}
          >
            {heritage.type === 'tangible' ? t.filter.tangible : t.filter.intangible}
          </span>
        </div>
      </div>
      <div className="p-3 bg-white">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{heritage.country[lang]}</span>
          <span>{heritage.year}</span>
        </div>
      </div>
    </div>
  );
};

export default HeritageCard;
