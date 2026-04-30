export type HeritageType = 'tangible' | 'intangible';

export type Region = 'asia' | 'europe' | 'africa' | 'northAmerica' | 'southAmerica' | 'oceania';

export type Category =
  | 'architecture'
  | 'naturalLandscape'
  | 'historicalSite'
  | 'performingArt'
  | 'traditionalCraft'
  | 'ritualFestival'
  | 'traditionalMedicine';

export interface LocalizedText {
  zh: string;
  en: string;
}

export interface Heritage {
  id: string;
  type: HeritageType;
  name: LocalizedText;
  region: Region;
  country: LocalizedText;
  category: Category;
  year: number;
  description: LocalizedText;
  coordinates?: [number, number]; // [longitude, latitude]
  image: string;
  officialUrl: string;
}

export interface FilterState {
  type: HeritageType | 'all';
  region: Region | 'all';
  category: Category | 'all';
}
