import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Itinerary, Activity } from '../types';
import { RefreshCcw, Layers, Check } from 'lucide-react';

// 默认蓝色图标
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// 新增：高亮红色图标 (用于聚焦)
const activeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const DAY_COLORS = [
  '#059669', // Emerald
  '#d97706', // Amber
  '#0891b2', // Cyan
  '#be123c', // Rose
  '#4f46e5', // Indigo
  '#7c3aed', // Violet
  '#db2777', // Pink
  '#ea580c', // Orange
  '#1d4ed8', // Blue
  '#0f766e', // Teal
];

const TILE_SOURCES = {
  carto: {
    name: 'CartoDB',
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; CARTO'
  },
  amap: {
    name: '高德地图 (仅中国)',
    url: 'https://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
    attribution: '&copy; 高德地图'
  },
  osm: {
    name: 'OpenStreetMap',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OSM Contributors'
  },
  google_road: {
    name: '谷歌地图 (道路)',
    url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    attribution: '&copy; Google Maps'
  },
  google_sat: {
    name: '谷歌地图 (卫星)',
    url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    attribution: '&copy; Google Maps'
  }
};

type TileSourceKey = keyof typeof TILE_SOURCES;

interface MapDisplayProps {
  itinerary: Itinerary | null;
  selectedDay: number | null;
  focusedActivity?: Activity | null; // 新增属性
}

// 地图控制器：负责缩放和定位
const MapController: React.FC<{ 
  targetActivities: Activity[] | null, 
  resetTrigger: number 
}> = ({ targetActivities, resetTrigger }) => {
  const map = useMap();

  const fitMapBounds = (acts: Activity[]) => {
    if (acts && acts.length > 0) {
      // 逻辑升级：如果是单个点（聚焦模式），则放大到层级 16
      if (acts.length === 1) {
        const a = acts[0];
        map.setView([a.coordinates.latitude, a.coordinates.longitude], 16, { animate: true });
        return;
      }
      
      // 多个点时，自动适配边界
      const bounds = L.latLngBounds(
        acts.map(a => [a.coordinates.latitude, a.coordinates.longitude])
      );
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15, animate: true });
      }
    }
  };

  useEffect(() => {
    if (targetActivities) {
      fitMapBounds(targetActivities);
    }
  }, [targetActivities, resetTrigger]); 

  // 处理窗口大小变化时的地图重绘
  useEffect(() => {
    map.invalidateSize();
    const timer = setTimeout(() => {
      map.invalidateSize();
      if (targetActivities) fitMapBounds(targetActivities);
    }, 600);

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(map.getContainer());

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
    };
  }, [map]);

  return null;
};

const DirectionArrows: React.FC<{ positions: [number, number][], color: string }> = ({ positions, color }) => {
  if (positions.length < 2) return null;
  const arrows = [];
  for (let i = 0; i < positions.length - 1; i++) {
    const start = positions[i];
    const end = positions[i + 1];
    const dx = end[1] - start[1];
    const dy = end[0] - start[0];
    const angle = Math.atan2(dx, dy) * (180 / Math.PI) - 90; 
    const midLat = (start[0] + end[0]) / 2;
    const midLng = (start[1] + end[1]) / 2;
    const arrowIcon = L.divIcon({
      className: 'arrow-icon',
      html: `<div style="transform: rotate(${angle}deg); color: ${color}; font-size: 20px; text-shadow: 0 0 2px white; opacity: 0.8;">➤</div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
    arrows.push(<Marker key={`arrow-${i}`} position={[midLat, midLng]} icon={arrowIcon} interactive={false} />);
  }
  return <>{arrows}</>;
};

const MapDisplay: React.FC<MapDisplayProps> = ({ itinerary, selectedDay, focusedActivity }) => {
  const daysToDisplay = itinerary?.days?.filter(d => selectedDay === null || d.day === selectedDay) || [];
  const allVisibleActivities = daysToDisplay.flatMap(d => d.activities);

  const [zoomTarget, setZoomTarget] = useState<Activity[] | null>(null);
  const [resetCount, setResetCount] = useState(0);
  
  const [currentSource, setCurrentSource] = useState<TileSourceKey>('carto');
  const [isLayerMenuOpen, setIsLayerMenuOpen] = useState(false);

  // 当行程或选中天数变化时，重置视图目标
  useEffect(() => {
    setZoomTarget(allVisibleActivities);
  }, [itinerary, selectedDay]); 

  // 当聚焦活动变化时，设置缩放目标为该单一活动
  useEffect(() => {
    if (focusedActivity) {
      setZoomTarget([focusedActivity]);
      setResetCount(c => c + 1);
    }
  }, [focusedActivity]);

  const handleResetView = () => {
    setZoomTarget(allVisibleActivities);
    setResetCount(c => c + 1); 
  };

  const handleDayClick = (dayNum: number) => {
    const dayData = itinerary?.days.find(d => d.day === dayNum);
    if (dayData && dayData.activities.length > 0) {
      setZoomTarget(dayData.activities);
      setResetCount(c => c + 1);
    }
  };

  const defaultCenter: [number, number] = [20, 0]; 
  const defaultZoom = 2;
  const mapKey = itinerary ? `map-${itinerary.tripTitle}-${selectedDay}-${itinerary.days.length}` : 'map-empty';

  return (
    <div className="h-full w-full relative z-0 bg-stone-100 dark:bg-stone-900 group">
      <MapContainer 
        key={mapKey}
        center={defaultCenter} 
        zoom={defaultZoom} 
        scrollWheelZoom={true} 
        className="h-full w-full outline-none"
      >
        <MapController targetActivities={zoomTarget} resetTrigger={resetCount} />

        <TileLayer
          key={currentSource} 
          attribution={TILE_SOURCES[currentSource].attribution}
          url={TILE_SOURCES[currentSource].url}
        />
        
        {daysToDisplay.map((day, dayIndex) => {
           const color = DAY_COLORS[(day.day - 1) % DAY_COLORS.length];
           const positions = day.activities.map(a => [a.coordinates.latitude, a.coordinates.longitude] as [number, number]);
           
           return (
             <React.Fragment key={`day-group-${day.day}`}>
               {day.activities.map((activity, idx) => {
                  // 判断当前 Marker 是否为聚焦目标
                  const isFocused = focusedActivity && 
                                    activity.activityName === focusedActivity.activityName && 
                                    activity.time === focusedActivity.time;
                  
                  return (
                    <Marker 
                      key={`${day.day}-${idx}`}
                      position={[activity.coordinates.latitude, activity.coordinates.longitude]}
                      // 颜色变换：聚焦时使用 activeIcon (红色)，否则使用 customIcon (蓝色)
                      icon={isFocused ? activeIcon : customIcon}
                      // 聚焦时提升层级，防止被遮挡
                      zIndexOffset={isFocused ? 1000 : 0}
                    >
                      <Popup className="font-sans">
                        <div className="p-1 min-w-[150px]">
                          <h3 className="font-serif font-bold text-stone-800 text-base mb-1">{activity.activityName}</h3>
                          <p className="text-xs text-stone-600 mb-2">{activity.locationName}</p>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ background: color }}></span>
                            <p className="text-xs font-mono font-medium text-stone-500">
                                Day {day.day} • {activity.time}
                            </p>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  );
               })}
               {positions.length > 1 && (
                 <>
                    <Polyline positions={positions} color={color} weight={3} opacity={0.7} dashArray="5, 10" />
                    <DirectionArrows positions={positions} color={color} />
                 </>
               )}
             </React.Fragment>
           );
        })}
      </MapContainer>
      
      {itinerary && (
        <div className="absolute top-4 right-4 z-[400] flex items-start gap-2">
          
          <div className="relative">
            <button
              onClick={() => setIsLayerMenuOpen(!isLayerMenuOpen)}
              className={`bg-white dark:bg-stone-800 p-2.5 rounded-full shadow-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors ${
                isLayerMenuOpen 
                  ? 'text-emerald-600 dark:text-emerald-400 ring-2 ring-emerald-500/20' 
                  : 'text-stone-600 dark:text-stone-300'
              }`}
              title="切换地图源"
            >
              <Layers size={18} />
            </button>
            
            {isLayerMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 cursor-default" 
                  style={{ zIndex: -1 }} 
                  onClick={() => setIsLayerMenuOpen(false)}
                />
                
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-stone-800 rounded-xl shadow-xl border border-stone-200 dark:border-stone-700 overflow-hidden py-1 animate-fade-in">
                  {(Object.keys(TILE_SOURCES) as TileSourceKey[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => { setCurrentSource(key); setIsLayerMenuOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-xs font-medium flex items-center justify-between hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors ${
                        currentSource === key 
                          ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20' 
                          : 'text-stone-600 dark:text-stone-300'
                      }`}
                    >
                      {TILE_SOURCES[key].name}
                      {currentSource === key && <Check size={14} />}
                    </button>
                  ))}
                  {currentSource === 'amap' && (
                    <div className="px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 text-[10px] text-amber-600 dark:text-amber-400 border-t border-amber-100 dark:border-amber-900/30">
                      注意：高德地图可能存在坐标偏移
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <button
            onClick={handleResetView}
            className="bg-white dark:bg-stone-800 p-2.5 rounded-full shadow-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors text-stone-600 dark:text-stone-300"
            title="重置视图"
          >
            <RefreshCcw size={18} />
          </button>
        </div>
      )}
      
      {!itinerary && (
        <div className="absolute inset-0 z-[400] bg-stone-50/50 dark:bg-stone-950/50 backdrop-blur-sm flex items-center justify-center pointer-events-none">
          <p className="bg-white/90 dark:bg-stone-800/90 px-6 py-3 rounded-full shadow-lg text-stone-500 dark:text-stone-400 text-sm font-medium border border-stone-200 dark:border-stone-700 tracking-wide font-serif">
            等待行程生成...
          </p>
        </div>
      )}

      {itinerary && selectedDay === null && itinerary.days.length > 1 && (
         <div className="hidden md:block absolute bottom-6 left-4 z-[400] bg-white/90 dark:bg-stone-900/90 backdrop-blur p-3 rounded-xl shadow-lg border border-stone-200 dark:border-stone-800 max-h-48 overflow-y-auto w-32 custom-scrollbar">
            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-2 text-stone-500 dark:text-stone-400 border-b border-stone-100 dark:border-stone-800 pb-1">点击聚焦</h4>
            {itinerary.days.map(day => (
              <div 
                key={day.day} 
                onClick={() => handleDayClick(day.day)}
                className="flex items-center gap-2 mb-1.5 last:mb-0 cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-800 p-1 rounded transition-colors"
              >
                <span className="w-2.5 h-2.5 rounded-full shadow-sm flex-shrink-0" style={{ backgroundColor: DAY_COLORS[(day.day - 1) % DAY_COLORS.length] }}></span>
                <span className="text-xs font-medium text-stone-600 dark:text-stone-300">Day {day.day}</span>
              </div>
            ))}
         </div>
      )}

      {itinerary && selectedDay && (
         <div className="absolute bottom-6 left-4 z-[400]">
            <span 
              className="text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-xl tracking-wider font-serif"
              style={{ backgroundColor: DAY_COLORS[(selectedDay - 1) % DAY_COLORS.length] }}
            >
              Day {selectedDay}
            </span>
         </div>
      )}
    </div>
  );
};

export default MapDisplay;