import React, { useState, useRef, useEffect } from 'react';
import { TripFormData, Itinerary } from '../types';
import { Plane, Sparkles, History as HistoryIcon, Trash2, Upload, User, Heart, Users, Clock } from 'lucide-react';
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

  const inputClasses = "w-full bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/60 focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-0 px-3 py-3 transition-colors rounded-xl text-stone-800 dark:text-stone-100 placeholder-stone-400";
  const labelClasses = "block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1 ml-1";
  const [view, setView] = useState<'plan' | 'history' | 'custom' | 'community'>(initialTab);
  
  // Update view when initialTab changes (from parent)
  useEffect(() => {
    setView(initialTab);
  }, [initialTab]);
  
  // Call onTabChange when view changes
  useEffect(() => {
    onTabChange?.(view);
  }, [view, onTabChange]);
  const importInputRef = useRef<HTMLInputElement>(null);
  const [community, setCommunity] = useState<CommunityItem[]>([])
  const [communityLoading, setCommunityLoading] = useState(false)
  const [communityQuery, setCommunityQuery] = useState('')
  const [openingCommunityItem, setOpeningCommunityItem] = useState<string | null>(null) // 跟踪正在打开的社区行程ID
  const CACHE_KEY = 'wanderplan_community_cache'
  const CACHE_EXPIRY_TIME = 5 * 60 * 1000; // 5分钟缓存过期时间
  const budgetPlaceholders: Record<string, string> = {
    '经济型': '例如：偏向公交与步行，小吃街与公园，免费或低价景点',
    '中等': '例如：经典必去景点+本地特色餐厅，适度购物与文化体验',
    '奢华': '例如：米其林餐厅，高端SPA，精品酒店下午茶与私享导览'
  };

  const budgetPresets: Record<string, string[]> = {
    '经济型': [
      '街头美食与本地市集',
      '免费博物馆与公园散步',
      '公交+步行优先，节约交通成本'
    ],
    '中等': [
      '经典景点与特色餐厅搭配',
      '文化体验与小众博物馆',
      '适度购物与咖啡馆休憩'
    ],
    '奢华': [
      '米其林餐厅与高端SPA',
      '精品酒店下午茶体验',
      '私人导览与包车移动'
    ]
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
      
      // 从localStorage读取缓存
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
      
      // 检查缓存是否有效
      if (cachedData && (now - cachedData.timestamp < CACHE_EXPIRY_TIME)) {
        // 使用缓存数据
        if (active) {
          setCommunity(cachedData.items)
          setCommunityLoading(false)
        }
        return
      }
      
      // 缓存无效或不存在，从服务器获取数据
      try {
        setCommunityLoading(true)
        const items = await listCommunityItems(50)
        if (active) {
          setCommunity(items)
          // 更新localStorage缓存
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

  return (
    <div className="bg-white dark:bg-stone-900/70 backdrop-blur-md p-8 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-black/40 border border-stone-100 dark:border-stone-800/50">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-serif font-bold text-stone-800 dark:text-stone-100 flex items-center gap-3">
          <Sparkles className="text-amber-500" size={24} />
          <span className="bg-gradient-to-r from-emerald-800 to-stone-600 dark:from-emerald-400 dark:to-stone-300 bg-clip-text text-transparent">
            {view === 'community' ? '社区' : '定制您的旅程'}
          </span>
        </h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-stone-100 dark:bg-stone-800/50 rounded-full p-1 border border-stone-200 dark:border-stone-700/50">
            <button
              type="button"
              onClick={() => setView('plan')}
              className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-colors ${view === 'plan' ? 'bg-white dark:bg-stone-900 text-emerald-800 dark:text-emerald-400 shadow' : 'text-stone-500 dark:text-stone-400'}`}
            >
              规划
            </button>
            <button
              type="button"
              onClick={() => setView('custom')}
              className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-colors ${view === 'custom' ? 'bg-white dark:bg-stone-900 text-emerald-800 dark:text-emerald-400 shadow' : 'text-stone-500 dark:text-stone-400'}`}
            >
              自定义
            </button>
            <button
              type="button"
              onClick={() => setView('history')}
              className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-colors flex items-center gap-1 ${view === 'history' ? 'bg-white dark:bg-stone-900 text-emerald-800 dark:text-emerald-400 shadow' : 'text-stone-500 dark:text-stone-400'}`}
            >
              <HistoryIcon size={14} /> 历史记录
            </button>
          </div>
          <button
            type="button"
            onClick={() => setView('community')}
            className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-colors ${view === 'community' ? 'bg-white dark:bg-stone-900 text-emerald-800 dark:text-emerald-400 shadow' : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/50 border border-stone-200 dark:border-stone-700/50'}`}
          >
            社区
          </button>
          <div className="flex items-center">
            <input ref={importInputRef} type="file" accept="application/json" className="hidden" onChange={handleImportFile} />
            <button
              type="button"
              onClick={() => importInputRef.current?.click()}
              className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-colors text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/50 border border-stone-200 dark:border-stone-700/50 flex items-center gap-1"
            >
              <Upload size={14} /> 导入
            </button>
          </div>
        </div>
      </div>
      {view === 'plan' ? (
        <form onSubmit={handleSubmit} className="space-y-6">
        
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

        {/* Duration (Standalone) */}
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
          <div className="flex gap-2 mt-2">
            {[3,5,7,10].map(d => (
              <button
                key={d}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, duration: d }))}
                className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                  formData.duration === d ? 'bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 shadow' : 'bg-stone-100 dark:bg-stone-800/50 text-stone-500 dark:text-stone-400'
                }`}
              >
                {d} 天
              </button>
            ))}
          </div>
        </div>

        {/* Travelers (Standalone) */}
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
          <div className="grid grid-cols-2 gap-3 mt-2">
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
                className={`py-2 px-4 rounded-xl text-sm font-medium transition-all flex items-center gap-2 justify-center ${
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
        <div className="grid grid-cols-2 gap-8">
          <div>
             <label className={labelClasses}>首日出发 (可选)</label>
             <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className={inputClasses}
              />
             <div className="flex gap-2 mt-2">
               {["08:00","10:00","14:00"].map(t => (
                 <button
                   key={t}
                   type="button"
                   onClick={() => setFormData(prev => ({ ...prev, startTime: t }))}
                   className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${
                     formData.startTime === t ? 'bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 shadow' : 'bg-stone-100 dark:bg-stone-800/50 text-stone-500 dark:text-stone-400'
                   }`}
                 >
                   <Clock size={12} /> {t}
                 </button>
               ))}
             </div>
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
             <div className="flex gap-2 mt-2">
               {["16:00","18:00","20:00"].map(t => (
                 <button
                   key={t}
                   type="button"
                   onClick={() => setFormData(prev => ({ ...prev, endTime: t }))}
                   className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${
                     formData.endTime === t ? 'bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 shadow' : 'bg-stone-100 dark:bg-stone-800/50 text-stone-500 dark:text-stone-400'
                   }`}
                 >
                   <Clock size={12} /> {t}
                 </button>
               ))}
             </div>
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className={labelClasses}>预算等级</label>
          <div className="grid grid-cols-3 gap-3 mt-2">
             {['经济型', '中等', '奢华'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, budget: opt }))}
                  className={`py-2 px-4 rounded-xl text-sm font-medium transition-all ${
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
            placeholder={budgetPlaceholders[formData.budget] || '例如：想要体验米其林餐厅，参观小众博物馆...'}
            value={formData.interests}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === 'Tab') {
                const ph = (e.currentTarget.placeholder || '');
                const sanitized = ph.replace(/^例如[:：]\s*/i, '').replace(/\.\.\.$/, '');
                if (!formData.interests.trim()) {
                  e.preventDefault();
                  setFormData(prev => ({ ...prev, interests: sanitized }));
                }
              }
            }}
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
            className={`w-full py-4 px-6 rounded-2xl text-white font-serif font-bold tracking-widest shadow-xl transition-all duration-300 mt-4 ${
              isLoading
                ? 'bg-stone-400 cursor-not-allowed'
                : 'bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 hover:shadow-2xl hover:-translate-y-1'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-3">
                 <span className="animate-pulse">AI 正在构思...</span>
              </span>
            ) : (
              '开启规划'
            )}
          </button>
        </form>
      ) : view === 'history' ? (
        <div className="space-y-4">
          {history.length === 0 ? (
            <div className="text-sm text-stone-400 dark:text-stone-500 italic">暂无历史记录</div>
          ) : (
            <div className="grid gap-4">
              {history.map(item => (
                <div 
                  key={item.id} 
                  onClick={() => onSelectHistory(item)}
                  className="group relative p-6 bg-white dark:bg-stone-900/70 backdrop-blur-md rounded-2xl border border-stone-100 dark:border-stone-800/50 hover:border-emerald-500/30 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-serif text-lg font-bold text-stone-800 dark:text-stone-100 mb-2 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors">
                        {item.tripTitle}
                      </div>
                      <div className="text-xs font-medium text-stone-400 uppercase tracking-wider">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <button 
                      onClick={(e) => onDeleteHistory(item.id, e)}
                      className="p-2 text-stone-300 hover:text-red-500 hover:bg-stone-50 dark:hover:bg-stone-800/50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
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
              placeholder="搜索社区行程标题"
              value={communityQuery}
              onChange={(e) => setCommunityQuery(e.target.value)}
              className="w-full bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/60 focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-0 px-3 py-2 transition-colors rounded-xl text-stone-800 dark:text-stone-100 placeholder-stone-400"
            />
          </div>
          {communityLoading ? (
            <div className="text-sm text-stone-400 dark:text-stone-500 italic">加载社区内容中…</div>
          ) : community.length === 0 ? (
            <div className="text-sm text-stone-400 dark:text-stone-500 italic">暂无社区分享</div>
          ) : (
            <div className="grid gap-4">
              {(communityQuery ? community.filter(c => c.trip_title.toLowerCase().includes(communityQuery.toLowerCase())) : community).map(item => (
                <div
                  key={item.id}
                  className={`group relative p-6 bg-white dark:bg-stone-900/70 backdrop-blur-md rounded-2xl border border-stone-100 dark:border-stone-800/50 hover:border-emerald-500/30 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer ${openingCommunityItem === item.id ? 'opacity-70 cursor-not-allowed' : ''}`}
                  onClick={async () => {
                    if (openingCommunityItem) return; // 防止重复点击
                    
                    try {
                      setOpeningCommunityItem(item.id); // 设置加载状态
                      const data = await fetchSharedItinerary(item.id)
                      if (data) {
                        onImportItinerary({ ...data, inCommunity: true, shareId: item.id })
                        setView('plan')
                      }
                    } finally {
                      setOpeningCommunityItem(null); // 清除加载状态
                    }
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-serif text-lg font-bold text-stone-800 dark:text-stone-100 mb-2 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors">
                        {item.trip_title}
                      </div>
                      <div className="text-xs font-medium text-stone-400 uppercase tracking-wider">
                        {new Date(item.created_at).toLocaleDateString()} 创建
                      </div>
                    </div>
                    {openingCommunityItem === item.id ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-emerald-600 dark:border-emerald-400"></div>
                    ) : (
                      <Users className="text-stone-400 dark:text-stone-500" size={16} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
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
            className="w-full py-4 px-6 rounded-2xl text-white font-serif font-bold tracking-widest shadow-xl transition-all duration-300 bg-emerald-800 hover:bg-emerald-900"
          >
            创建空白行程
          </button>
        </div>
      )}
    </div>
  );
};

export default TravelForm;
  
