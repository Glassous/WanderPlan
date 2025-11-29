import React, { useState, useEffect } from 'react';
import TravelForm from './components/TravelForm';
import ItineraryList from './components/ItineraryList';
import MapDisplay from './components/MapDisplay';
import ThemeBackground from './components/ThemeBackground';
import { generateItinerary } from './services/qwenservice';
import { fetchSharedItinerary } from './services/community'
import { TripFormData, Itinerary } from './types';
import { Map as MapIcon, Compass, Moon, Sun, Monitor, Feather, Github } from 'lucide-react';

type Theme = 'system' | 'light' | 'dark';

const App: React.FC = () => {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [partialItinerary, setPartialItinerary] = useState<Partial<Itinerary> | null>(null);
  const [history, setHistory] = useState<Itinerary[]>([]);
  const [historyInitialized, setHistoryInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // 移动端默认视图：'plan' (列表) 或 'map' (地图)
  const [activeTab, setActiveTab] = useState<'plan' | 'map'>('plan'); 
  
  // UI State
  const [theme, setTheme] = useState<Theme>('system');
  const [activeMode, setActiveMode] = useState<'light' | 'dark'>('light'); 
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  
  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareModalLink, setShareModalLink] = useState<string>('');
  const [navigationSource, setNavigationSource] = useState<'form' | 'history' | 'community' | 'import'>('form');
  const [activeFormTab, setActiveFormTab] = useState<'plan' | 'history' | 'custom' | 'community'>('plan');

  // Load History on Mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('wanderplan_history');
      if (savedHistory) {
        const parsed = JSON.parse(savedHistory);
        if (Array.isArray(parsed)) {
          setHistory(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load history', e);
    } finally {
      setHistoryInitialized(true);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const share = params.get('share')
    if (!share) return
    ;(async () => {
      try {
        const data = await fetchSharedItinerary(share)
        if (data) {
          setItinerary({ ...data, shareId: share, inCommunity: true })
          setIsFormVisible(false)
          setSelectedDay(null)
          setIsEditing(false)
          setActiveTab('plan')
          setNavigationSource('community')
        }
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  // Save History when it changes
  useEffect(() => {
    if (!historyInitialized) return;
    try {
      localStorage.setItem('wanderplan_history', JSON.stringify(history));
    } catch (e) {
      console.error('Failed to save history', e);
    }
  }, [history, historyInitialized]);

  // Theme Logic
  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      let resolvedMode: 'light' | 'dark' = 'light';
      if (theme === 'dark' || (theme === 'system' && mediaQuery.matches)) {
        root.classList.add('dark');
        resolvedMode = 'dark';
      } else {
        root.classList.remove('dark');
        resolvedMode = 'light';
      }
      setActiveMode(resolvedMode);
    };

    applyTheme();
    mediaQuery.addEventListener('change', applyTheme);
    return () => mediaQuery.removeEventListener('change', applyTheme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(current => {
      if (current === 'system') return 'light';
      if (current === 'light') return 'dark';
      return 'system';
    });
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return <Sun size={18} />;
      case 'dark': return <Moon size={18} />;
      default: return <Monitor size={18} />;
    }
  };

  const handleFormSubmit = async (data: TripFormData) => {
    setLoading(true);
    setStreaming(true);
    setError(null);
    setPartialItinerary(null);
    setItinerary(null);
    
    // 立即隐藏表单，显示行程卡片
    setIsFormVisible(false);
    setSelectedDay(null);
    setIsEditing(false); 
    // 强制切换到计划视图，防止移动端停留在Map导致白屏
    setActiveTab('plan');
    setNavigationSource('form');
    
    // 根据duration预先生成天数结构
    const duration = parseInt(data.duration.toString()) || 1;
    const preGeneratedDays = Array.from({ length: duration }, (_, i) => ({
      day: i + 1,
      theme: "",
      activities: []
    }));
    
    const initialPartialItinerary: Partial<Itinerary> = {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      tripTitle: `前往${data.destination}的${duration}天行程`,
      summary: "AI正在生成行程摘要...",
      days: preGeneratedDays,
      visualTheme: "default"
    };
    
    setPartialItinerary(initialPartialItinerary);
    
    try {
      const result = await generateItinerary(data, (partialResult, isDone) => {
        const updatedPartialItinerary = {
          ...initialPartialItinerary,
          ...partialResult,
          days: partialResult.days || initialPartialItinerary.days
        };
        
        setPartialItinerary(updatedPartialItinerary);
        
        if (isDone) {
          setItinerary(updatedPartialItinerary as Itinerary);
          setHistory(prev => [updatedPartialItinerary as Itinerary, ...prev]);
          setStreaming(false);
        }
      });
    } catch (err) {
      setError("生成行程失败，请重试。");
      setStreaming(false);
      setIsFormVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReplan = () => {
    setIsFormVisible(true);
    setIsEditing(false);
    setItinerary(null);
    setActiveTab('plan');
    
    let targetTab: 'plan' | 'history' | 'custom' | 'community' = 'plan';
    switch (navigationSource) {
      case 'history': targetTab = 'history'; break;
      case 'community': targetTab = 'community'; break;
      case 'form': case 'import': default: targetTab = 'plan'; break;
    }
    setActiveFormTab(targetTab);
  };

  const handleUpdateItinerary = (updatedItinerary: Itinerary) => {
    setItinerary(updatedItinerary);
    setHistory(prev => prev.map(item => item.id === updatedItinerary.id ? updatedItinerary : item));
  };

  const handleOpenShareModal = () => {
    if (!itinerary?.shareId) return;
    const link = `${window.location.origin}${window.location.pathname}?share=${itinerary.shareId}`;
    setShareModalLink(link);
    setShareModalOpen(true);
  };

  const handleImportItinerary = (imported: Itinerary) => {
    const normalized: Itinerary = {
      ...imported,
      id: imported.id || (crypto as any).randomUUID?.() || `${Date.now()}`,
      createdAt: imported.createdAt || Date.now(),
      visualTheme: imported.visualTheme || 'default'
    };
    setItinerary(normalized);
    setHistory(prev => {
      const idx = prev.findIndex(i => i.id === normalized.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = normalized;
        return copy;
      }
      return [normalized, ...prev];
    });
    setIsFormVisible(false);
    setSelectedDay(null);
    setIsEditing(false);
    setActiveTab('plan');
    setNavigationSource(imported.inCommunity ? 'community' : 'import');
  };

  const handleSelectHistory = (historyItem: Itinerary) => {
    setItinerary(historyItem);
    setIsFormVisible(false);
    setSelectedDay(null);
    setIsEditing(false);
    setActiveTab('plan');
    setNavigationSource('history');
  };

  const handleDeleteHistory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConfirmDeleteId(id);
  };

  const confirmDelete = () => {
    if (!confirmDeleteId) return;
    const id = confirmDeleteId;
    setHistory(prev => prev.filter(item => item.id !== id));
    if (itinerary?.id === id) {
      setItinerary(null);
      setIsFormVisible(true);
    }
    setConfirmDeleteId(null);
  };

  const cancelDelete = () => setConfirmDeleteId(null);

  // Map 只有在非表单模式、非编辑模式、且有行程数据时才完全可用
  // 但在流式传输时，itinerary 可能是 null，但 partialItinerary 存在
  // 因此我们主要依据 isFormVisible 来判断是否进入结果页面
  const hasResultData = !!(itinerary || partialItinerary);
  const showMap = !isFormVisible && !isEditing && hasResultData;

  // Visual Theme Determination
  const currentVisualTheme = isFormVisible || !hasResultData ? 'default' : 
    (itinerary?.visualTheme || partialItinerary?.visualTheme || 'default');

  return (
    <ThemeBackground theme={currentVisualTheme} mode={activeMode}>
      <div className="flex flex-col font-sans min-h-screen">
        {/* Header */}
        <header className={`bg-white/80 dark:bg-stone-900/60 backdrop-blur-md border border-stone-200 dark:border-stone-800/50 fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-30 transition-all duration-500 ease-in-out rounded-2xl shadow-xl w-[calc(100%-1.5rem)] ${showMap ? 'max-w-[1800px]' : 'max-w-4xl'}`}>
          <div className="w-full px-4 md:px-8 h-14 md:h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3 cursor-pointer group" onClick={() => { setIsFormVisible(true); setItinerary(null); setIsEditing(false); }}>
              <div className="bg-emerald-800 dark:bg-emerald-700 p-1.5 md:p-2 rounded-full text-white shadow-lg group-hover:shadow-emerald-900/20 transition-all duration-300">
                <Feather size={16} className="md:w-5 md:h-5" />
              </div>
              <h1 className="text-xl md:text-2xl font-serif font-bold text-stone-800 dark:text-stone-100 tracking-tight">WanderPlan</h1>
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
              <div className="text-xs font-serif italic text-stone-500 dark:text-stone-400 hidden sm:block">Curated by Qwen AI</div>
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => window.open('https://github.com/Glassous/WanderPlan', '_blank', 'noopener')}
                  className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800/50 text-stone-600 dark:text-stone-400 transition-colors"
                  aria-label="Open GitHub"
                >
                  <Github size={18} />
                </button>
                <button 
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800/50 text-stone-600 dark:text-stone-400 transition-colors"
                >
                  {getThemeIcon()}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        {/* 增加顶部 padding 以避开 fixed header */}
        <main className="flex-grow p-3 md:p-6 lg:p-8 max-w-[1800px] mx-auto w-full mt-20 md:mt-24 pb-24 md:pb-8">
          
          <div className={`grid grid-cols-1 ${showMap ? 'lg:grid-cols-12' : 'lg:grid-cols-1'} gap-6 transition-all duration-500 ease-in-out ${showMap ? 'lg:h-[calc(100vh-8rem)]' : 'h-auto'}`}>
            
            {/* Left Panel: Form or Itinerary List */}
            <div className={`
              flex flex-col gap-6 transition-all duration-500
              ${showMap ? 'lg:col-span-4 lg:overflow-hidden' : 'max-w-4xl mx-auto w-full'}
              
              /* 移动端显示逻辑：如果是表单模式，始终显示；如果是结果模式，根据 activeTab 判断 */
              ${!isFormVisible && activeTab === 'map' ? 'hidden lg:flex' : 'flex'}
            `}>
              
              {isFormVisible ? (
                <div className="flex flex-col h-full animate-fade-in">
                   <TravelForm 
                      onSubmit={handleFormSubmit} 
                      isLoading={loading} 
                      history={history}
                      onSelectHistory={handleSelectHistory}
                      onDeleteHistory={handleDeleteHistory}
                      onImportItinerary={handleImportItinerary}
                      onTabChange={setActiveFormTab}
                      initialTab={activeFormTab}
                    />
                    {error && (
                      <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-xl border border-red-200 dark:border-red-900/50 text-sm">
                        {error}
                      </div>
                    )}
                </div>
              ) : (
                <div className="flex-grow lg:overflow-y-auto pr-1 pb-4 scroll-smooth">
                  <ItineraryList 
                      itinerary={itinerary} 
                      partialItinerary={partialItinerary}
                      streaming={streaming}
                      history={history}
                      selectedDay={selectedDay}
                      isEditing={isEditing}
                      setIsEditing={setIsEditing}
                      onSelectDay={setSelectedDay}
                      onReplan={handleReplan}
                      onUpdateItinerary={handleUpdateItinerary}
                      onSelectHistory={handleSelectHistory}
                      onDeleteHistory={handleDeleteHistory}
                      onImportItinerary={handleImportItinerary}
                      onOpenShareModal={handleOpenShareModal}
                  />
                </div>
              )}
            </div>

            {/* Right Panel: Map */}
            {/* 桌面端：有数据时显示；移动端：有数据且Tab切到map时显示 */}
            {hasResultData && !isFormVisible && (
              <div className={`
                 lg:col-span-8 h-[60vh] lg:h-full rounded-3xl overflow-hidden shadow-2xl shadow-stone-200/50 dark:shadow-black/40 border border-stone-200 dark:border-stone-800/50 relative bg-stone-100 dark:bg-stone-900/50
                 ${activeTab === 'map' ? 'block' : 'hidden lg:block'}
              `}>
                <MapDisplay itinerary={itinerary} selectedDay={selectedDay} />
              </div>
            )}

          </div>
        </main>

        {/* Mobile Tab Bar (Only show if we have results and not in form mode) */}
        {!isFormVisible && hasResultData && (
          <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-stone-800/90 backdrop-blur-md border border-stone-200 dark:border-stone-700 p-1.5 rounded-full flex shadow-xl z-50 gap-1">
            <button 
              onClick={() => setActiveTab('plan')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeTab === 'plan' 
                  ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-md' 
                  : 'text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700/50'
              }`}
            >
              <Compass size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">行程</span>
            </button>
            <button 
              onClick={() => setActiveTab('map')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeTab === 'map' 
                  ? 'bg-emerald-800 dark:bg-emerald-600 text-white shadow-md' 
                  : 'text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700/50'
              }`}
            >
              <MapIcon size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">地图</span>
            </button>
          </div>
        )}
      </div>
      
      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 backdrop-blur-sm bg-stone-950/30" onClick={cancelDelete}></div>
          <div className="relative bg-white dark:bg-stone-900/90 backdrop-blur-md rounded-3xl border border-stone-100 dark:border-stone-800/50 shadow-2xl p-6 w-full max-w-sm animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 flex-shrink-0">
                <span className="font-serif font-bold">!</span>
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-800 dark:text-stone-100">确认删除</h3>
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-300 mb-6 leading-relaxed">
              确定要删除这条行程记录吗？此操作无法撤销。
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={cancelDelete} className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-stone-100 dark:bg-stone-800/50 text-stone-600 dark:text-stone-300">取消</button>
              <button onClick={confirmDelete} className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600 text-white shadow">删除</button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {shareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 backdrop-blur-sm bg-stone-950/30" onClick={() => setShareModalOpen(false)}></div>
          <div className="relative bg-white dark:bg-stone-900/90 backdrop-blur-md rounded-3xl border border-stone-100 dark:border-stone-800/50 shadow-2xl p-6 w-full max-w-sm animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 flex-shrink-0">
                <span className="font-serif font-bold">🔗</span>
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-800 dark:text-stone-100">分享链接</h3>
            </div>
            <div className="space-y-3">
              <input
                readOnly
                value={shareModalLink}
                className="w-full bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/60 px-3 py-2 rounded-xl text-stone-800 dark:text-stone-100 text-sm font-mono"
              />
              <div className="flex justify-end gap-3">
                <button onClick={() => setShareModalOpen(false)} className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-stone-100 dark:bg-stone-800/50 text-stone-600 dark:text-stone-300">关闭</button>
                <button onClick={async () => { await navigator.clipboard.writeText(shareModalLink) }} className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-600 text-white shadow">复制</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </ThemeBackground>
  );
};

export default App;