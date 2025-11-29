import React, { useState, useRef, useEffect } from 'react';
import { TripFormData, Itinerary } from '../types';
import { Plane, Sparkles, History as HistoryIcon, Trash2, Upload, User, Heart, Users, Clock, Loader2, RefreshCw } from 'lucide-react';
import { listCommunityItems, CommunityItem, fetchSharedItinerary } from '../services/community'

interface TravelFormProps {
  onSubmit: (data: TripFormData) => void;
  isLoading: boolean;
  history: Itinerary[];
  onSelectHistory: (itinerary: Itinerary) => void;
  onDeleteHistory: (id: string, e: React.MouseEvent) => void;
  onImportItinerary: (itinerary: Itinerary) => void;
  onTabChange?: (tab: 'plan' | 'history' | 'custom' | 'community') => void;
  initialTab?: 'plan' | 'history' | 'custom' | 'community';
}

const TravelForm: React.FC<TravelFormProps> = ({ 
  onSubmit, 
  isLoading, 
  history, 
  onSelectHistory, 
  onDeleteHistory, 
  onImportItinerary,
  onTabChange,
  initialTab = 'plan'
}) => {
  const [formData, setFormData] = useState<TripFormData>({
    destination: '',
    duration: 5,
    travelers: '',
    budget: '中等',
    interests: '',
    startTime: '',
    endTime: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // 优化移动端输入框样式
  const inputClasses = "w-full bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/60 focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-0 px-3 py-3 transition-colors rounded-xl text-stone-800 dark:text-stone-100 placeholder-stone-400 text-sm md:text-base";
  const labelClasses = "block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1 ml-1";
  
  const [view, setView] = useState<'plan' | 'history' | 'custom' | 'community'>(initialTab);
  
  useEffect(() => {
    setView(initialTab);
  }, [initialTab]);
  
  useEffect(() => {
    onTabChange?.(view);
  }, [view, onTabChange]);

  const importInputRef = useRef<HTMLInputElement>(null);
  const [community, setCommunity] = useState<CommunityItem[]>([])
  const [communityLoading, setCommunityLoading] = useState(false)
  const [communityQuery, setCommunityQuery] = useState('')
  const [loadingCommunityId, setLoadingCommunityId] = useState<string | null>(null)
  const CACHE_KEY = 'wanderplan_community_cache'
  const CACHE_EXPIRY_TIME = 5 * 60 * 1000; 

  const budgetPlaceholders: Record<string, string> = {
    '经济型': '例如：偏向公交与步行，小吃街与公园，免费或低价景点',
    '中等': '例如：经典必去景点+本地特色餐厅，适度购物与文化体验',
    '奢华': '例如：米其林餐厅，高端SPA，精品酒店下午茶与私享导览'
  };

  const budgetPresets: Record<string, string[]> = {
    '经济型': ['街头美食', '免费博物馆', '公交优先'],
    '中等': ['经典景点', '特色餐厅', '文化体验'],
    '奢华': ['米其林', '高端SPA', '包车']
  };

  const applyPreset = (text: string) => {
    setFormData(prev => {
      const current = (prev.interests || '').trim();
      if (!current) return { ...prev, interests: text };
      if (current.includes(text)) return prev;
      const sep = /[；;，,]\s*$/.test(current) ? '' : '；';
      return { ...prev, interests: `${current}${sep}${text}` };
    });
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!parsed || !Array.isArray(parsed.days)) throw new Error('invalid');
      const imported: Itinerary = {
        id: parsed.id || (crypto as any).randomUUID?.() || `${Date.now()}`,
        createdAt: parsed.createdAt || Date.now(),
        tripTitle: parsed.tripTitle || '未命名行程',
        summary: parsed.summary || '',
        days: parsed.days,
        visualTheme: parsed.visualTheme || 'default'
      };
      onImportItinerary(imported);
      setView('plan');
    } catch {
      alert('导入失败：请提供有效的行程JSON文件');
    } finally {
      e.target.value = '';
    }
  };

  useEffect(() => {
    let active = true
    const run = async () => {
      if (view !== 'community') return
      
      const now = Date.now()
      let cachedData = null
      try {
        const stored = localStorage.getItem(CACHE_KEY)
        if (stored) {
          cachedData = JSON.parse(stored)
        }
      } catch (e) {
        console.error('Failed to read community cache:', e)
      }
      
      if (cachedData && (now - cachedData.timestamp < CACHE_EXPIRY_TIME)) {
        if (active) {
          setCommunity(cachedData.items)
          setCommunityLoading(false)
        }
        return
      }
      
      try {
        setCommunityLoading(true)
        const items = await listCommunityItems(50)
        if (active) {
          setCommunity(items)
          const cacheData = { items, timestamp: now }
          localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
        }
      } catch {
        if (active) setCommunity([])
      } finally {
        if (active) setCommunityLoading(false)
      }
    }
    run()
    return () => { active = false }
  }, [view])

  const handleCommunityItemClick = async (itemId: string) => {
    setLoadingCommunityId(itemId);
    try {
      const data = await fetchSharedItinerary(itemId);
      if (data) {
        onImportItinerary({ ...data, inCommunity: true, shareId: itemId });
        setView('plan');
      }
    } finally {
      setLoadingCommunityId(null);
    }
  };

  return (
    <div className="bg-white dark:bg-stone-900/70 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-black/40 border border-stone-100 dark:border-stone-800/50">
      
      {/* 响应式头部：移动端垂直排列，桌面端水平排列 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-800 dark:text-stone-100 flex items-center gap-3">
          <Sparkles className="text-amber-500 flex-shrink-0" size={24} />
          <span className="bg-gradient-to-r from-emerald-800 to-stone-600 dark:from-emerald-400 dark:to-stone-300 bg-clip-text text-transparent whitespace-nowrap">
            {view === 'community' ? '社区' : '定制您的旅程'}
          </span>
        </h2>
        
        {/* 按钮组：移动端支持水平滚动 */}
        <div className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide -mx-2 px-2 md:mx-0 md:px-0 w-full md:w-auto">
          <div className="flex items-center bg-stone-100 dark:bg-stone-800/50 rounded-full p-1 border border-stone-200 dark:border-stone-700/50 flex-shrink-0">
            {['plan', 'custom', 'history'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setView(tab as any)}
                className={`px-3 md:px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-colors whitespace-nowrap ${
                  view === tab 
                    ? 'bg-white dark:bg-stone-900 text-emerald-800 dark:text-emerald-400 shadow' 
                    : 'text-stone-500 dark:text-stone-400'
                }`}
              >
                {tab === 'plan' ? '规划' : tab === 'custom' ? '自定义' : '历史'}
              </button>
            ))}
          </div>
          
          <div className="w-px h-6 bg-stone-200 dark:bg-stone-700/50 flex-shrink-0 mx-1"></div>

          <button
            type="button"
            onClick={() => setView('community')}
            className={`px-3 md:px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-colors flex-shrink-0 ${
              view === 'community' 
                ? 'bg-white dark:bg-stone-900 text-emerald-800 dark:text-emerald-400 shadow' 
                : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/50 border border-stone-200 dark:border-stone-700/50'
            }`}
          >
            社区
          </button>
          
          <input ref={importInputRef} type="file" accept="application/json" className="hidden" onChange={handleImportFile} />
          <button
            type="button"
            onClick={() => importInputRef.current?.click()}
            className="px-3 md:px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-colors text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/50 border border-stone-200 dark:border-stone-700/50 flex items-center gap-1 flex-shrink-0"
          >
            <Upload size={14} /> 导入
          </button>
        </div>
      </div>

      {view === 'plan' ? (
        <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
        
        {/* Destination */}
        <div>
          <label className={labelClasses}>目的地</label>
          <div className="relative">
            <input
              type="text"
              name="destination"
              required
              placeholder="心之所向 (例如: 巴黎)"
              value={formData.destination}
              onChange={handleChange}
              className={inputClasses}
            />
            <Plane className="absolute right-3 top-3 w-5 h-5 text-stone-300 pointer-events-none" />
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className={labelClasses}>天数</label>
          <div className="relative">
            <input
              type="number"
              name="duration"
              min="1"
              max="30"
              required
              value={formData.duration}
              onChange={handleChange}
              className={inputClasses}
            />
            <span className="absolute right-3 top-3 text-sm text-stone-400 pointer-events-none">Days</span>
          </div>
          <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
            {[3,5,7,10].map(d => (
              <button
                key={d}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, duration: d }))}
                className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex-shrink-0 ${
                  formData.duration === d ? 'bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 shadow' : 'bg-stone-100 dark:bg-stone-800/50 text-stone-500 dark:text-stone-400'
                }`}
              >
                {d} 天
              </button>
            ))}
          </div>
        </div>

        {/* Travelers */}
        <div>
          <label className={labelClasses}>同行者</label>
          <input
            type="text"
            name="travelers"
            value={formData.travelers}
            onChange={handleChange}
            placeholder="自定义填写，如：独自一人 / 情侣 / 家庭出游"
            className={inputClasses}
          />
          <div className="grid grid-cols-2 gap-2 md:gap-3 mt-2">
            {[
              { label: '独自一人', icon: <User size={16} /> },
              { label: '情侣/夫妻', icon: <Heart size={16} /> },
              { label: '家庭出游', icon: <Users size={16} /> },
              { label: '朋友结伴', icon: <Users size={16} /> },
            ].map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, travelers: opt.label }))}
                className={`py-2 px-2 md:px-4 rounded-xl text-xs md:text-sm font-medium transition-all flex items-center gap-1.5 md:gap-2 justify-center ${
                  formData.travelers === opt.label 
                    ? 'bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 shadow-lg' 
                    : 'bg-stone-100 dark:bg-stone-800/50 text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700/50'
                }`}
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Times */}
        <div className="grid grid-cols-2 gap-4 md:gap-8">
          <div>
             <label className={labelClasses}>首日出发 (可选)</label>
             <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className={inputClasses}
              />
          </div>
          <div>
             <label className={labelClasses}>末日返程 (可选)</label>
             <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className={inputClasses}
              />
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className={labelClasses}>预算等级</label>
          <div className="grid grid-cols-3 gap-2 md:gap-3 mt-2">
             {['经济型', '中等', '奢华'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, budget: opt }))}
                  className={`py-2 px-2 md:px-4 rounded-xl text-xs md:text-sm font-medium transition-all ${
                    formData.budget === opt 
                      ? 'bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 shadow-lg' 
                      : 'bg-stone-100 dark:bg-stone-800/50 text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700/50'
                  }`}
                >
                  {opt}
                </button>
             ))}
          </div>
        </div>

        {/* Interests */}
        <div>
          <label className={labelClasses}>旅行偏好 & 备注</label>
          <textarea
            name="interests"
            rows={3}
            placeholder={budgetPlaceholders[formData.budget] || '例如：想要体验米其林餐厅...'}
            value={formData.interests}
            onChange={handleChange}
            className={`${inputClasses} resize-none`}
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {(budgetPresets[formData.budget] || budgetPresets['中等']).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => applyPreset(p)}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-stone-100 dark:bg-stone-800/50 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700/50 border border-stone-200 dark:border-stone-700/50"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 md:py-4 px-6 rounded-2xl text-white font-serif font-bold tracking-widest shadow-xl transition-all duration-300 mt-4 md:mt-6 text-sm md:text-base ${
              isLoading
                ? 'bg-stone-400 cursor-not-allowed'
                : 'bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 hover:shadow-2xl hover:-translate-y-1'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-3">
                 <Loader2 className="animate-spin" size={18} />
                 <span className="animate-pulse">AI 正在构思...</span>
              </span>
            ) : (
              '开启规划'
            )}
          </button>
        </form>
      ) : view === 'history' ? (
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
          {history.length === 0 ? (
            <div className="text-sm text-stone-400 dark:text-stone-500 italic text-center py-8">暂无历史记录</div>
          ) : (
            <div className="grid gap-4">
              {history.map(item => (
                <div 
                  key={item.id} 
                  onClick={() => onSelectHistory(item)}
                  className="group relative p-5 bg-stone-50/50 dark:bg-stone-800/30 rounded-xl border border-stone-100 dark:border-stone-700/50 hover:border-emerald-500/30 hover:bg-white dark:hover:bg-stone-800 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="font-serif font-bold text-stone-800 dark:text-stone-100 mb-1 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors truncate">
                        {item.tripTitle}
                      </div>
                      <div className="text-xs font-medium text-stone-400 uppercase tracking-wider">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <button 
                      onClick={(e) => onDeleteHistory(item.id, e)}
                      className="p-2 text-stone-300 hover:text-red-500 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-full transition-colors flex-shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : view === 'community' ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="搜索社区..."
              value={communityQuery}
              onChange={(e) => setCommunityQuery(e.target.value)}
              className="flex-1 bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/60 focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-0 px-3 py-2 transition-colors rounded-xl text-stone-800 dark:text-stone-100 placeholder-stone-400 text-sm"
            />
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem(CACHE_KEY);
                setCommunityLoading(true);
                listCommunityItems(50)
                  .then(items => {
                    setCommunity(items);
                    localStorage.setItem(CACHE_KEY, JSON.stringify({ items, timestamp: Date.now() }));
                  })
                  .catch(() => setCommunity([]))
                  .finally(() => setCommunityLoading(false));
              }}
              className="p-2 bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/60 hover:border-emerald-600 dark:hover:border-emerald-500 transition-colors rounded-xl text-stone-600 dark:text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              <RefreshCw size={18} />
            </button>
          </div>
          <div className="max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
            {communityLoading ? (
               <div className="flex justify-center py-8 text-stone-400"><Loader2 className="animate-spin" /></div>
            ) : community.length === 0 ? (
              <div className="text-sm text-stone-400 dark:text-stone-500 italic text-center py-8">暂无内容</div>
            ) : (
              <div className="grid gap-3">
                {(communityQuery ? community.filter(c => c.trip_title.toLowerCase().includes(communityQuery.toLowerCase())) : community).map(item => (
                  <div
                    key={item.id}
                    className={`group p-4 bg-stone-50/50 dark:bg-stone-800/30 rounded-xl border border-stone-100 dark:border-stone-700/50 hover:bg-white dark:hover:bg-stone-800 transition-all cursor-pointer ${loadingCommunityId === item.id ? 'opacity-60' : ''}`}
                    onClick={() => handleCommunityItemClick(item.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1 min-w-0">
                        <div className="font-serif font-bold text-stone-800 dark:text-stone-100 truncate text-sm md:text-base">
                          {item.trip_title}
                        </div>
                        <div className="text-xs text-stone-400 mt-1">
                          {new Date(item.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      {loadingCommunityId === item.id && (
                        <Loader2 className="animate-spin text-emerald-600 ml-2" size={16} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4 md:space-y-6">
          {/* Custom Form Content */}
           <div>
            <label className={labelClasses}>行程标题</label>
            <input
              type="text"
              placeholder="例如：东京美食与文化之旅"
              value={(formData as any).manualTitle || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, manualTitle: e.target.value } as any))}
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>天数</label>
            <input
              type="number"
              min={1}
              max={30}
              value={(formData as any).manualDays ?? 5}
              onChange={(e) => setFormData(prev => ({ ...prev, manualDays: Number(e.target.value || 1) } as any))}
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>行程简介（可选）</label>
            <textarea
              rows={3}
              placeholder="简单描述此行程的主题与风格"
              value={(formData as any).manualSummary || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, manualSummary: e.target.value } as any))}
              className={`${inputClasses} resize-none`}
            />
          </div>
          <button
            type="button"
            onClick={() => {
              const daysCount = (formData as any).manualDays ?? 5;
              const title = (formData as any).manualTitle || '自定义行程';
              const summary = (formData as any).manualSummary || '';
              const manual: Itinerary = {
                id: (crypto as any).randomUUID?.() || `${Date.now()}`,
                createdAt: Date.now(),
                tripTitle: title,
                summary,
                days: Array.from({ length: Math.max(1, Number(daysCount)) }, (_, i) => ({ day: i + 1, theme: '', activities: [] })),
                visualTheme: 'default'
              };
              onImportItinerary(manual);
            }}
            className="w-full py-3 md:py-4 px-6 rounded-2xl text-white font-serif font-bold tracking-widest shadow-xl transition-all duration-300 bg-emerald-800 hover:bg-emerald-900 text-sm md:text-base"
          >
            创建空白行程
          </button>
        </div>
      )}
    </div>
  );
};

export default TravelForm;