import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { X, ChevronRight, ArrowLeft, Check, Layers, RefreshCcw } from 'lucide-react';

// --- 类型定义 ---
interface Coordinate {
  lat: number;
  lng: number;
}

interface DestinationItem {
  name: string;
  enName: string; // 新增英文名字段用于图片
  fullName?: string;
  coords: Coordinate;
}

interface CountryNode {
  name: string;
  enName: string;
  cities: DestinationItem[];
}

interface ContinentNode {
  name: string;
  enName: string;
  countries: CountryNode[];
}

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

const DOMESTIC_CITIES: DestinationItem[] = [
  // 热门一线
  { name: '北京', enName: 'beijing', coords: { lat: 39.9042, lng: 116.4074 } },
  { name: '上海', enName: 'shanghai', coords: { lat: 31.2304, lng: 121.4737 } },
  { name: '广州', enName: 'guangzhou', coords: { lat: 23.1291, lng: 113.2644 } },
  { name: '深圳', enName: 'shenzhen', coords: { lat: 22.5431, lng: 114.0579 } },
  // 西南风情
  { name: '成都', enName: 'chengdu', coords: { lat: 30.5728, lng: 104.0668 } },
  { name: '重庆', enName: 'chongqing', coords: { lat: 29.5630, lng: 106.5516 } },
  { name: '大理', enName: 'dali', coords: { lat: 25.6065, lng: 100.2676 } },
  { name: '丽江', enName: 'lijiang', coords: { lat: 26.8550, lng: 100.2257 } },
  { name: '拉萨', enName: 'lhasa', coords: { lat: 29.6525, lng: 91.1721 } },
  // 历史人文
  { name: '西安', enName: 'xian', coords: { lat: 34.3416, lng: 108.9398 } },
  { name: '南京', enName: 'nanjing', coords: { lat: 32.0603, lng: 118.7969 } },
  { name: '苏州', enName: 'suzhou', coords: { lat: 31.2989, lng: 120.5853 } },
  { name: '杭州', enName: 'hangzhou', coords: { lat: 30.2741, lng: 120.1551 } },
  { name: '敦煌', enName: 'dunhuang', coords: { lat: 40.1421, lng: 94.6620 } },
  // 海滨度假
  { name: '三亚', enName: 'sanya', coords: { lat: 18.2528, lng: 109.5120 } },
  { name: '厦门', enName: 'xiamen', coords: { lat: 24.4798, lng: 118.0894 } },
  { name: '青岛', enName: 'qingdao', coords: { lat: 36.0671, lng: 120.3826 } },
  // 北国风光
  { name: '哈尔滨', enName: 'harbin', coords: { lat: 45.8038, lng: 126.5349 } },
  // 自然山水
  { name: '桂林', enName: 'guilin', coords: { lat: 25.2345, lng: 110.1800 } },
  { name: '张家界', enName: 'zhangjiajie', coords: { lat: 29.1170, lng: 110.4789 } },
  { name: '长沙', enName: 'changsha', coords: { lat: 28.2282, lng: 112.9388 } },
  { name: '武汉', enName: 'wuhan', coords: { lat: 30.5928, lng: 114.3055 } },
];

const INTERNATIONAL_DATA: ContinentNode[] = [
  {
    name: '亚洲',
    enName: 'asia',
    countries: [
      {
        name: '日本',
        enName: 'japan',
        cities: [
          { name: '东京', enName: 'tokyo', fullName: '东京, 日本', coords: { lat: 35.6762, lng: 139.6503 } },
          { name: '大阪', enName: 'osaka', fullName: '大阪, 日本', coords: { lat: 34.6937, lng: 135.5023 } },
          { name: '京都', enName: 'kyoto', fullName: '京都, 日本', coords: { lat: 35.0116, lng: 135.7681 } },
          { name: '北海道', enName: 'hokkaido', fullName: '北海道, 日本', coords: { lat: 43.2203, lng: 142.8635 } },
        ]
      },
      {
        name: '韩国',
        enName: 'korea',
        cities: [
          { name: '首尔', enName: 'seoul', fullName: '首尔, 韩国', coords: { lat: 37.5665, lng: 126.9780 } },
          { name: '釜山', enName: 'busan', fullName: '釜山, 韩国', coords: { lat: 35.1796, lng: 129.0756 } },
        ]
      },
      {
        name: '泰国',
        enName: 'thailand',
        cities: [
          { name: '曼谷', enName: 'bangkok', fullName: '曼谷, 泰国', coords: { lat: 13.7563, lng: 100.5018 } },
          { name: '清迈', enName: 'chiangmai', fullName: '清迈, 泰国', coords: { lat: 18.7883, lng: 98.9853 } },
          { name: '普吉岛', enName: 'phuket', fullName: '普吉岛, 泰国', coords: { lat: 7.8804, lng: 98.3923 } },
        ]
      },
      {
        name: '新加坡',
        enName: 'singapore',
        cities: [
          { name: '新加坡', enName: 'singapore', fullName: '新加坡', coords: { lat: 1.3521, lng: 103.8198 } },
        ]
      },
      {
        name: '印度尼西亚',
        enName: 'indonesia',
        cities: [
          { name: '巴厘岛', enName: 'bali', fullName: '巴厘岛, 印尼', coords: { lat: -8.4095, lng: 115.1889 } },
          { name: '雅加达', enName: 'jakarta', fullName: '雅加达, 印尼', coords: { lat: -6.2088, lng: 106.8456 } },
        ]
      }
    ]
  },
  {
    name: '欧洲',
    enName: 'europe',
    countries: [
      {
        name: '法国',
        enName: 'france',
        cities: [
          { name: '巴黎', enName: 'paris', fullName: '巴黎, 法国', coords: { lat: 48.8566, lng: 2.3522 } },
          { name: '尼斯', enName: 'nice', fullName: '尼斯, 法国', coords: { lat: 43.7102, lng: 7.2620 } },
        ]
      },
      {
        name: '英国',
        enName: 'uk',
        cities: [
          { name: '伦敦', enName: 'london', fullName: '伦敦, 英国', coords: { lat: 51.5074, lng: -0.1278 } },
          { name: '爱丁堡', enName: 'edinburgh', fullName: '爱丁堡, 英国', coords: { lat: 55.9533, lng: -3.1883 } },
        ]
      },
      {
        name: '意大利',
        enName: 'italy',
        cities: [
          { name: '罗马', enName: 'rome', fullName: '罗马, 意大利', coords: { lat: 41.9028, lng: 12.4964 } },
          { name: '威尼斯', enName: 'venice', fullName: '威尼斯, 意大利', coords: { lat: 45.4408, lng: 12.3155 } },
          { name: '佛罗伦萨', enName: 'florence', fullName: '佛罗伦萨, 意大利', coords: { lat: 43.7696, lng: 11.2558 } },
          { name: '米兰', enName: 'milan', fullName: '米兰, 意大利', coords: { lat: 45.4642, lng: 9.1900 } },
        ]
      },
      {
        name: '西班牙',
        enName: 'spain',
        cities: [
          { name: '巴塞罗那', enName: 'barcelona', fullName: '巴塞罗那, 西班牙', coords: { lat: 41.3851, lng: 2.1734 } },
          { name: '马德里', enName: 'madrid', fullName: '马德里, 西班牙', coords: { lat: 40.4168, lng: -3.7038 } },
        ]
      },
      {
        name: '德国',
        enName: 'germany',
        cities: [
          { name: '柏林', enName: 'berlin', fullName: '柏林, 德国', coords: { lat: 52.5200, lng: 13.4050 } },
          { name: '慕尼黑', enName: 'munich', fullName: '慕尼黑, 德国', coords: { lat: 48.1351, lng: 11.5820 } },
        ]
      },
      {
        name: '瑞士',
        enName: 'switzerland',
        cities: [
          { name: '苏黎世', enName: 'zurich', fullName: '苏黎世, 瑞士', coords: { lat: 47.3769, lng: 8.5417 } },
          { name: '日内瓦', enName: 'geneva', fullName: '日内瓦, 瑞士', coords: { lat: 46.2044, lng: 6.1432 } },
        ]
      },
      {
        name: '荷兰',
        enName: 'netherlands',
        cities: [
          { name: '阿姆斯特丹', enName: 'amsterdam', fullName: '阿姆斯特丹, 荷兰', coords: { lat: 52.3676, lng: 4.9041 } },
        ]
      }
    ]
  },
  {
    name: '北美洲',
    enName: 'north_america',
    countries: [
      {
        name: '美国',
        enName: 'usa',
        cities: [
          { name: '纽约', enName: 'newyork', fullName: '纽约, 美国', coords: { lat: 40.7128, lng: -74.0060 } },
          { name: '洛杉矶', enName: 'losangeles', fullName: '洛杉矶, 美国', coords: { lat: 34.0522, lng: -118.2437 } },
          { name: '旧金山', enName: 'sanfrancisco', fullName: '旧金山, 美国', coords: { lat: 37.7749, lng: -122.4194 } },
          { name: '拉斯维加斯', enName: 'lasvegas', fullName: '拉斯维加斯, 美国', coords: { lat: 36.1699, lng: -115.1398 } },
        ]
      },
      {
        name: '加拿大',
        enName: 'canada',
        cities: [
          { name: '多伦多', enName: 'toronto', fullName: '多伦多, 加拿大', coords: { lat: 43.6510, lng: -79.3470 } },
          { name: '温哥华', enName: 'vancouver', fullName: '温哥华, 加拿大', coords: { lat: 49.2827, lng: -123.1207 } },
        ]
      }
    ]
  },
  {
    name: '大洋洲',
    enName: 'oceania',
    countries: [
      {
        name: '澳大利亚',
        enName: 'australia',
        cities: [
          { name: '悉尼', enName: 'sydney', fullName: '悉尼, 澳大利亚', coords: { lat: -33.8688, lng: 151.2093 } },
          { name: '墨尔本', enName: 'melbourne', fullName: '墨尔本, 澳大利亚', coords: { lat: -37.8136, lng: 144.9631 } },
        ]
      },
      {
        name: '新西兰',
        enName: 'newzealand',
        cities: [
          { name: '奥克兰', enName: 'auckland', fullName: '奥克兰, 新西兰', coords: { lat: -36.8485, lng: 174.7633 } },
          { name: '皇后镇', enName: 'queenstown', fullName: '皇后镇, 新西兰', coords: { lat: -45.0312, lng: 168.6626 } },
        ]
      }
    ]
  }
];

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
    <div className="grid grid-cols-2 md:grid-cols-2 gap-3 p-1">
      {DOMESTIC_CITIES.map(city => (
        <div 
          key={city.name}
          onClick={() => toggleSelection(city)}
          className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer group border-2 transition-all ${
            selectedItems.find(i => i.name === city.name) ? 'border-emerald-600' : 'border-transparent'
          }`}
        >
          <img src={getImgUrl(city.enName)} alt={city.name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
             <span className="text-white font-serif font-bold text-sm md:text-base">{city.name}</span>
          </div>
          {selectedItems.find(i => i.name === city.name) && (
            <div className="absolute top-2 right-2 bg-emerald-600 text-white rounded-full p-1 shadow-md animate-in zoom-in">
              <Check size={12} />
            </div>
          )}
        </div>
      ))}
    </div>
  );

  // 渲染国际列表
  const renderInternational = () => {
    // Level 1: 洲
    if (navStack.length === 0) {
      return (
        <div className="grid grid-cols-2 gap-3 p-1">
          {INTERNATIONAL_DATA.map(continent => (
            <div 
              key={continent.name}
              onClick={() => setNavStack([continent])}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
            >
              <img src={getImgUrl(continent.enName)} alt={continent.name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                 <span className="text-white font-serif font-bold text-lg">{continent.name}</span>
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
        <div className="grid grid-cols-2 gap-3 p-1">
          {continent.countries.map(country => (
            <div 
              key={country.name}
              onClick={() => setNavStack([...navStack, country])}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
            >
              <img src={getImgUrl(country.enName)} alt={country.name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                 <span className="text-white font-serif font-bold text-lg">{country.name}</span>
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
        <div className="grid grid-cols-2 gap-3 p-1">
          {country.cities.map(city => (
            <div 
              key={city.name}
              onClick={() => toggleSelection(city)}
              className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer group border-2 transition-all ${
                selectedItems.find(i => i.name === city.name) ? 'border-emerald-600' : 'border-transparent'
              }`}
            >
              <img src={getImgUrl(city.enName)} alt={city.name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
                 <span className="text-white font-serif font-bold text-sm">{city.name}</span>
                 <span className="text-white/80 text-[10px] uppercase tracking-wider">{country.name}</span>
              </div>
              {selectedItems.find(i => i.name === city.name) && (
                <div className="absolute top-2 right-2 bg-emerald-600 text-white rounded-full p-1 shadow-md">
                  <Check size={12} />
                </div>
              )}
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
                   <span className="text-sm text-stone-400 italic">点击上方图片选择...</span>
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
                   <div className="text-center p-1">
                     <img src={getImgUrl(item.enName)} alt={item.name} className="w-20 h-20 object-cover rounded-lg mb-2 mx-auto" />
                     <h3 className="font-bold text-stone-800">{item.fullName || item.name}</h3>
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