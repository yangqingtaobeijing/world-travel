import React from 'react';
import { Heritage } from '../data/types';
import { Language, Translations } from '../i18n';
import HeritageCard from './HeritageCard';

interface HeritageListProps {
  heritages: Heritage[];
  lang: Language;
  t: Translations;
  selectedId?: string;
  onSelect: (heritage: Heritage) => void;
}

const HeritageList: React.FC<HeritageListProps> = ({
  heritages,
  lang,
  t,
  selectedId,
  onSelect,
}) => {
  if (heritages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-400">
        <svg className="w-12 h-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-sm">{t.noResults}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {heritages.map((heritage) => (
        <HeritageCard
          key={heritage.id}
          heritage={heritage}
          lang={lang}
          t={t}
          isSelected={selectedId === heritage.id}
          onClick={() => onSelect(heritage)}
        />
      ))}
    </div>
  );
};

export default HeritageList;
