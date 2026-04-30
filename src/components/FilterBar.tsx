import React from 'react';
import { FilterState, HeritageType, Region, Category } from '../data/types';
import { Translations } from '../i18n';

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  t: Translations;
  totalCount: number;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  setFilters,
  t,
  totalCount,
  searchQuery,
  setSearchQuery,
}) => {
  const typeOptions: { value: HeritageType | 'all'; label: string }[] = [
    { value: 'all', label: t.filter.all },
    { value: 'tangible', label: t.filter.tangible },
    { value: 'intangible', label: t.filter.intangible },
  ];

  const regionOptions: { value: Region | 'all'; label: string }[] = [
    { value: 'all', label: t.filter.all },
    { value: 'asia', label: t.filter.asia },
    { value: 'europe', label: t.filter.europe },
    { value: 'africa', label: t.filter.africa },
    { value: 'northAmerica', label: t.filter.northAmerica },
    { value: 'southAmerica', label: t.filter.southAmerica },
    { value: 'oceania', label: t.filter.oceania },
  ];

  const categoryOptions: { value: Category | 'all'; label: string }[] = [
    { value: 'all', label: t.filter.all },
    { value: 'architecture', label: t.filter.architecture },
    { value: 'naturalLandscape', label: t.filter.naturalLandscape },
    { value: 'historicalSite', label: t.filter.historicalSite },
    { value: 'performingArt', label: t.filter.performingArt },
    { value: 'traditionalCraft', label: t.filter.traditionalCraft },
    { value: 'ritualFestival', label: t.filter.ritualFestival },
    { value: 'traditionalMedicine', label: t.filter.traditionalMedicine },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-3">
      {/* 搜索框 */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.search.placeholder}
          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* 筛选器 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* 类型筛选 */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">{t.filter.type}</label>
          <select
            value={filters.type}
            onChange={(e) => setFilters((prev) => ({ ...prev, type: e.target.value as HeritageType | 'all' }))}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {typeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* 地区筛选 */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">{t.filter.region}</label>
          <select
            value={filters.region}
            onChange={(e) => setFilters((prev) => ({ ...prev, region: e.target.value as Region | 'all' }))}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {regionOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* 类别筛选 */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">{t.filter.category}</label>
          <select
            value={filters.category}
            onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value as Category | 'all' }))}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 结果计数 */}
      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>
          {t.total} <span className="font-semibold text-slate-700">{totalCount}</span> {t.items}
        </span>
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <span>{t.legend.tangible}</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[8px] border-l-transparent border-r-transparent border-b-amber-500"></span>
            <span>{t.legend.intangible}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
