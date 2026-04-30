import React, { useState, useMemo } from 'react';
import { Language, translations } from './i18n';
import { FilterState, Heritage } from './data/types';
import { heritageData } from './data/heritage';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import WorldMap from './components/WorldMap';
import HeritageList from './components/HeritageList';
import HeritageDetail from './components/HeritageDetail';
import Footer from './components/Footer';

function App() {
  const [lang, setLang] = useState<Language>('zh');
  const [filters, setFilters] = useState<FilterState>({
    type: 'all',
    region: 'all',
    category: 'all',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHeritage, setSelectedHeritage] = useState<Heritage | null>(null);

  const t = translations[lang];

  // 过滤遗产数据
  const filteredHeritages = useMemo(() => {
    return heritageData.filter((heritage) => {
      // 类型筛选
      if (filters.type !== 'all' && heritage.type !== filters.type) return false;

      // 地区筛选
      if (filters.region !== 'all' && heritage.region !== filters.region) return false;

      // 类别筛选
      if (filters.category !== 'all' && heritage.category !== filters.category) return false;

      // 搜索筛选
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const nameMatch =
          heritage.name.zh.toLowerCase().includes(query) ||
          heritage.name.en.toLowerCase().includes(query);
        const countryMatch =
          heritage.country.zh.toLowerCase().includes(query) ||
          heritage.country.en.toLowerCase().includes(query);
        if (!nameMatch && !countryMatch) return false;
      }

      return true;
    });
  }, [filters, searchQuery]);

  const handleSelectHeritage = (heritage: Heritage) => {
    setSelectedHeritage(heritage);
  };

  const handleCloseDetail = () => {
    setSelectedHeritage(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header lang={lang} setLang={setLang} t={t} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* 筛选栏 */}
        <div className="mb-6">
          <FilterBar
            filters={filters}
            setFilters={setFilters}
            t={t}
            totalCount={filteredHeritages.length}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        {/* 地图 + 列表布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* 地图区域 */}
          <div className="lg:col-span-3">
            <div className="h-[400px] lg:h-[600px]">
              <WorldMap
                heritages={filteredHeritages}
                onSelect={handleSelectHeritage}
                selectedId={selectedHeritage?.id}
              />
            </div>
          </div>

          {/* 列表区域 */}
          <div className="lg:col-span-2 lg:h-[600px] lg:overflow-y-auto">
            <HeritageList
              heritages={filteredHeritages}
              lang={lang}
              t={t}
              selectedId={selectedHeritage?.id}
              onSelect={handleSelectHeritage}
            />
          </div>
        </div>
      </main>

      <Footer t={t} />

      {/* 详情弹窗 */}
      {selectedHeritage && (
        <HeritageDetail
          heritage={selectedHeritage}
          lang={lang}
          t={t}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
}

export default App;
