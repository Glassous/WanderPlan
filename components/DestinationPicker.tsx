import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { X, ChevronRight, ArrowLeft, Check, Layers, RefreshCcw } from 'lucide-react';
import { DOMESTIC_CITIES, DestinationItem, Coordinate } from '../data/domesticCities';
import { INTERNATIONAL_DATA, CountryNode, ContinentNode } from '../data/internationalCities';

// --- 图片URL生成器 ---
// 使用 oss 处理参数进行 1:1 居中裁剪缩略图，w_400,h_400 既保证清晰度又节省流量
const getImgUrl = (enName: string) => 
  `https://cityimage.glassous.top/${enName.toLowerCase()}.jpg?x-oss-process=image/resize,m_fill,w_400,h_400`;

// --- 地图源配置 ---
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

// --- 地图子组件：自动缩放 & 视图控制 ---
const MapController: React.FC<{ markers: Coordinate[], resetTrigger: number }> = ({ markers, resetTrigger }) => {
  const map = useMap();
  
  useEffect(() => {
    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers.map(m => [m.lat, m.lng]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13, animate: true });
    }
  }, [markers, map, resetTrigger]);

  return null;
};

// --- 主组件 ---
interface DestinationPickerProps {
  onClose: () => void;
  onConfirm: (destination: string) => void;
  initialSelection?: string;
}

const DestinationPicker: React.FC<DestinationPickerProps> = ({ onClose, onConfirm, initialSelection }) => {
  const [activeTab, setActiveTab] = useState<'domestic' | 'international'>('domestic');
  const [navStack, setNavStack] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<DestinationItem[]>([]);
  
  // 地图控制状态
  const [currentSource, setCurrentSource] = useState<TileSourceKey>('carto');
  const [isLayerMenuOpen, setIsLayerMenuOpen] = useState(false);
  const [resetCount, setResetCount] = useState(0);

  // 默认图标
  const defaultIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const toggleSelection = (item: DestinationItem) => {
    setSelectedItems(prev => {
      const exists = prev.find(i => i.name === item.name);
      if (exists) {
        return prev.filter(i => i.name !== item.name);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleConfirm = () => {
    const text = selectedItems.map(i => i.fullName || i.name).join('; ');
    onConfirm(text);
    onClose();
  };
  
  const handleResetView = () => {
    setResetCount(c => c + 1);
  };

  // 渲染国内列表
  const renderDomestic = () => (
    <div className="p-1 space-y-2">
      {DOMESTIC_CITIES.map(city => (
        <div 
          key={city.name}
          onClick={() => toggleSelection(city)}
          className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
            selectedItems.find(i => i.name === city.name) 
              ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' 
              : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:border-stone-300 dark:hover:border-stone-600'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-serif font-bold text-base text-stone-800 dark:text-stone-200">{city.name}</span>
            {selectedItems.find(i => i.name === city.name) && (
              <div className="bg-emerald-600 text-white rounded-full p-1 shadow-md animate-in zoom-in">
                <Check size={12} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  // 渲染国际列表
  const renderInternational = () => {
    // Level 1: 洲
    if (navStack.length === 0) {
      return (
        <div className="p-1 space-y-2">
          {INTERNATIONAL_DATA.map(continent => (
            <div 
              key={continent.name}
              onClick={() => setNavStack([continent])}
              className="relative p-4 rounded-xl border-2 cursor-pointer transition-all border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:border-stone-300 dark:hover:border-stone-600"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-lg text-stone-800 dark:text-stone-200">{continent.name}</span>
                <ChevronRight size={16} className="text-stone-400" />
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    // Level 2: 国家
    if (navStack.length === 1) {
      const continent = navStack[0] as ContinentNode;
      return (
        <div className="p-1 space-y-2">
          {continent.countries.map(country => (
            <div 
              key={country.name}
              onClick={() => setNavStack([...navStack, country])}
              className="relative p-4 rounded-xl border-2 cursor-pointer transition-all border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:border-stone-300 dark:hover:border-stone-600"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-lg text-stone-800 dark:text-stone-200">{country.name}</span>
                <ChevronRight size={16} className="text-stone-400" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Level 3: 城市
    if (navStack.length === 2) {
      const country = navStack[1] as CountryNode;
      return (
        <div className="p-1 space-y-2">
          {country.cities.map(city => (
            <div 
              key={city.name}
              onClick={() => toggleSelection(city)}
              className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedItems.find(i => i.name === city.name) 
                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' 
                  : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:border-stone-300 dark:hover:border-stone-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-serif font-bold text-base text-stone-800 dark:text-stone-200">{city.name}</span>
                  <span className="text-sm text-stone-500 dark:text-stone-400 ml-2">{country.name}</span>
                </div>
                {selectedItems.find(i => i.name === city.name) && (
                  <div className="bg-emerald-600 text-white rounded-full p-1 shadow-md">
                    <Check size={12} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Container - 加大宽度至 max-w-[90vw] 和 md:max-w-7xl */}
      <div className="relative bg-white dark:bg-stone-900 w-full max-w-[90vw] md:max-w-7xl h-[85vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300">
        
        {/* Left Side: Navigation & List */}
        <div className="w-full md:w-[400px] flex flex-col h-full bg-stone-50 dark:bg-stone-950 border-r border-stone-100 dark:border-stone-800">
          {/* Header */}
          <div className="p-4 border-b border-stone-100 dark:border-stone-800 flex-shrink-0">
             <div className="flex items-center justify-between mb-4">
               <h3 className="font-serif font-bold text-xl text-stone-800 dark:text-stone-100 flex items-center gap-2">
                 <span className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600">🧭</span>
                 灵感罗盘
               </h3>
               <button onClick={onClose} className="p-2 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-full transition-colors">
                 <X size={20} className="text-stone-500" />
               </button>
             </div>
             
             {/* Tabs */}
             <div className="bg-stone-200 dark:bg-stone-800 p-1 rounded-xl flex gap-1">
               <button 
                 onClick={() => { setActiveTab('domestic'); setNavStack([]); }}
                 className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'domestic' ? 'bg-white dark:bg-stone-700 shadow text-emerald-800 dark:text-emerald-400' : 'text-stone-500 dark:text-stone-400 hover:text-stone-700'}`}
               >
                 国内探索
               </button>
               <button 
                 onClick={() => { setActiveTab('international'); setNavStack([]); }}
                 className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'international' ? 'bg-white dark:bg-stone-700 shadow text-emerald-800 dark:text-emerald-400' : 'text-stone-500 dark:text-stone-400 hover:text-stone-700'}`}
               >
                 世界漫游
               </button>
             </div>
          </div>

          {/* Breadcrumb for International */}
          {activeTab === 'international' && navStack.length > 0 && (
             <div className="px-4 py-2 flex items-center gap-2 text-sm text-stone-500 bg-white dark:bg-stone-900/50 border-b border-stone-100 dark:border-stone-800">
                <button 
                  onClick={() => setNavStack(prev => prev.slice(0, -1))}
                  className="p-1 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full"
                >
                  <ArrowLeft size={16} />
                </button>
                <div className="flex items-center gap-1 font-medium">
                  <span className="cursor-pointer hover:text-emerald-600" onClick={() => setNavStack([])}>世界</span>
                  {navStack.map((item, idx) => (
                    <React.Fragment key={item.name}>
                      <ChevronRight size={14} />
                      <span className={idx === navStack.length - 1 ? 'text-stone-800 dark:text-stone-200' : 'cursor-pointer hover:text-emerald-600'} onClick={() => setNavStack(prev => prev.slice(0, idx + 1))}>
                        {item.name}
                      </span>
                    </React.Fragment>
                  ))}
                </div>
             </div>
          )}

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            {activeTab === 'domestic' ? renderDomestic() : renderInternational()}
          </div>

          {/* Selection Bar */}
          <div className="p-4 bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800 flex-shrink-0 z-10 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
             <div className="mb-3">
               <label className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2 block">已选择目的地</label>
               <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto custom-scrollbar">
                 {selectedItems.length === 0 ? (
                   <span className="text-sm text-stone-400 italic">点击上方选项选择...</span>
                 ) : (
                   selectedItems.map(item => (
                     <span key={item.name} className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-medium border border-emerald-100 dark:border-emerald-900/50">
                       {item.name}
                       <button onClick={() => toggleSelection(item)} className="hover:bg-emerald-200 dark:hover:bg-emerald-800 rounded-full p-0.5">
                         <X size={10} />
                       </button>
                     </span>
                   ))
                 )}
               </div>
             </div>
             <div className="flex gap-3">
               <button onClick={onClose} className="flex-1 py-2.5 rounded-xl text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 font-medium text-sm transition-colors">
                 取消
               </button>
               <button 
                 onClick={handleConfirm}
                 disabled={selectedItems.length === 0}
                 className="flex-[2] py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 确认添加 ({selectedItems.length})
               </button>
             </div>
          </div>
        </div>

        {/* Right Side: Map (Hidden on mobile) */}
        <div className="hidden md:block flex-1 bg-stone-100 relative h-full">
           <MapContainer 
             center={[35, 105]} 
             zoom={4} 
             className="h-full w-full outline-none"
             zoomControl={false}
           >
             <TileLayer
               key={currentSource}
               attribution={TILE_SOURCES[currentSource].attribution}
               url={TILE_SOURCES[currentSource].url}
             />
             
             <MapController markers={selectedItems.map(i => i.coords)} resetTrigger={resetCount} />
             
             {/* Dynamic Markers from Selection */}
             {selectedItems.map(item => (
               <Marker 
                  key={item.name} 
                  position={[item.coords.lat, item.coords.lng]} 
                  icon={defaultIcon}
               >
                 <Popup offset={[0, -30]} className="font-sans">
                   <div className="text-center p-2 min-w-[120px]">
                     <h3 className="font-bold text-stone-800 dark:text-stone-200">{item.fullName || item.name}</h3>
                   </div>
                 </Popup>
               </Marker>
             ))}
           </MapContainer>
           
           {/* Map Controls (Top Right) */}
           <div className="absolute top-4 right-4 z-[400] flex items-start gap-2">
             <div className="relative">
               <button
                 onClick={() => setIsLayerMenuOpen(!isLayerMenuOpen)}
                 className={`bg-white p-2.5 rounded-full shadow-lg border border-stone-200 hover:bg-stone-50 transition-colors ${
                   isLayerMenuOpen ? 'text-emerald-600 ring-2 ring-emerald-500/20' : 'text-stone-600'
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
                   <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-stone-200 overflow-hidden py-1 animate-in fade-in zoom-in-95">
                     {(Object.keys(TILE_SOURCES) as TileSourceKey[]).map((key) => (
                       <button
                         key={key}
                         onClick={() => { setCurrentSource(key); setIsLayerMenuOpen(false); }}
                         className={`w-full text-left px-4 py-2 text-xs font-medium flex items-center justify-between hover:bg-stone-100 transition-colors ${
                           currentSource === key ? 'text-emerald-600 bg-emerald-50' : 'text-stone-600'
                         }`}
                       >
                         {TILE_SOURCES[key].name}
                         {currentSource === key && <Check size={14} />}
                       </button>
                     ))}
                   </div>
                 </>
               )}
             </div>

             <button
               onClick={handleResetView}
               className="bg-white p-2.5 rounded-full shadow-lg border border-stone-200 hover:bg-stone-50 transition-colors text-stone-600"
               title="重置视图"
             >
               <RefreshCcw size={18} />
             </button>
           </div>
           
           {/* Map Overlay Info */}
           <div className="absolute bottom-6 right-6 z-[400] bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-lg border border-stone-200 text-xs text-stone-500 font-medium">
             支持多选 • 实时预览
           </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationPicker;