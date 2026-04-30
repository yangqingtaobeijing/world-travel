import React, { useMemo, useCallback } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import { Heritage } from '../data/types';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

interface WorldMapProps {
  heritages: Heritage[];
  onSelect: (heritage: Heritage) => void;
  selectedId?: string;
}

const WorldMap: React.FC<WorldMapProps> = ({ heritages, onSelect, selectedId }) => {
  const tangibleHeritages = useMemo(
    () => heritages.filter((h) => h.type === 'tangible' && h.coordinates),
    [heritages]
  );

  const intangibleHeritages = useMemo(
    () => heritages.filter((h) => h.type === 'intangible' && h.coordinates),
    [heritages]
  );

  const handleMarkerClick = useCallback(
    (heritage: Heritage) => () => {
      onSelect(heritage);
    },
    [onSelect]
  );

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-blue-50 to-slate-100 rounded-xl overflow-hidden border border-slate-200">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 130,
          center: [20, 20],
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <ZoomableGroup>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#e2e8f0"
                  stroke="#cbd5e1"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none', fill: '#cbd5e1' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {tangibleHeritages.map((heritage) => {
            const isSelected = selectedId === heritage.id;
            return (
              <Marker
                key={heritage.id}
                coordinates={heritage.coordinates!}
                onClick={handleMarkerClick(heritage)}
              >
                <g>
                  {/* 扩大的透明点击区域 */}
                  <circle r={12} fill="transparent" />
                  {/* 可见标记 */}
                  <circle
                    r={isSelected ? 6 : 4}
                    fill={isSelected ? '#1d4ed8' : '#3B82F6'}
                    stroke="#fff"
                    strokeWidth={1.5}
                    style={{
                      filter: isSelected
                        ? 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.6))'
                        : 'none',
                    }}
                  />
                  {/* 原生 tooltip */}
                  <title>{heritage.name.zh} | {heritage.name.en}</title>
                </g>
              </Marker>
            );
          })}

          {intangibleHeritages.map((heritage) => {
            const isSelected = selectedId === heritage.id;
            return (
              <Marker
                key={heritage.id}
                coordinates={heritage.coordinates!}
                onClick={handleMarkerClick(heritage)}
              >
                <g>
                  {/* 扩大的透明点击区域 */}
                  <circle r={12} fill="transparent" />
                  {/* 可见标记 */}
                  <path
                    d="M0,-8 L6,4 L-6,4 Z"
                    fill={isSelected ? '#d97706' : '#F59E0B'}
                    stroke="#fff"
                    strokeWidth={1.5}
                    style={{
                      filter: isSelected
                        ? 'drop-shadow(0 0 4px rgba(245, 158, 11, 0.6))'
                        : 'none',
                    }}
                  />
                  {/* 原生 tooltip */}
                  <title>{heritage.name.zh} | {heritage.name.en}</title>
                </g>
              </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default WorldMap;
