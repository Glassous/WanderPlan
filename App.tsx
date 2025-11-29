
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
  const [activeTab, setActiveTab] = useState<'plan' | 'map'>('plan'); // For mobile view
  
  // UI State
  const [theme, setTheme] = useState<Theme>('system');
  const [activeMode, setActiveMode] = useState<'light' | 'dark'>('light'); // Derived resolved mode
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
    setIsEditing(false); // Ensure not editing when new one generates
    setActiveTab('plan');
    setNavigationSource('form');
    
    // 根据duration预先生成天数结构
    const duration = parseInt(data.duration.toString()) || 1;
    const preGeneratedDays = Array.from({ length: duration }, (_, i) => ({
      day: i + 1,
      theme: "",
      activities: []
    }));
    
    // 创建初始的partialItinerary
    const initialPartialItinerary: Partial<Itinerary> = {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      tripTitle: `前往${data.destination}的${duration}天行程`,
      summary: "AI正在生成行程摘要...",
      days: preGeneratedDays,
      visualTheme: "default"
    };
    
    // 设置初始的partialItinerary，让用户立即看到行程结构
    setPartialItinerary(initialPartialItinerary);
    
    try {
      const result = await generateItinerary(data, (partialResult, isDone) => {
        // 更新部分行程数据，合并预先生成的天数结构
        const updatedPartialItinerary = {
          ...initialPartialItinerary,
          ...partialResult,
          // 确保天数结构保持一致
          days: partialResult.days || initialPartialItinerary.days
        };
        
        setPartialItinerary(updatedPartialItinerary);
        
        // 如果生成完成，更新最终行程
        if (isDone) {
          setItinerary(updatedPartialItinerary as Itinerary);
          setHistory(prev => [updatedPartialItinerary as Itinerary, ...prev]);
          setStreaming(false);
        }
      });
    } catch (err) {
      setError("生成行程失败，请重试。");
      setStreaming(false);
      // 错误时显示表单
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
    
    // 根据导航来源决定返回时显示的标签页
    let targetTab: 'plan' | 'history' | 'custom' | 'community' = 'plan';
    switch (navigationSource) {
      case 'history':
        targetTab = 'history';
        break;
      case 'community':
        targetTab = 'community';
        break;
      case 'form':
      case 'import':
      default:
        targetTab = 'plan';
        break;
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
    // 如果是从社区导入的行程，设置导航来源为community
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

  // Logic to determine if map should be shown
  const showMap = !isFormVisible && !isEditing && !streaming && itinerary;

  // Determine current visual theme
  const currentVisualTheme = isFormVisible || (!itinerary && !partialItinerary) ? 'default' : 
    (itinerary?.visualTheme || partialItinerary?.visualTheme || 'default');

  return (
    <ThemeBackground theme={currentVisualTheme} mode={activeMode}>
      <div className="flex flex-col font-sans min-h-screen">
        {/* Header */}
        <header className={`bg-white/80 dark:bg-stone-900/60 backdrop-blur-md border border-stone-200 dark:border-stone-800/50 fixed top-6 left-1/2 -translate-x-1/2 z-30 transition-all duration-500 ease-in-out rounded-2xl shadow-xl ${showMap ? 'w-[calc(100%-2rem)] max-w-[1800px]' : 'w-[calc(100%-2rem)] max-w-4xl'}`}>
          <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => { setIsFormVisible(true); setItinerary(null); setIsEditing(false); }}>
              <div className="bg-emerald-800 dark:bg-emerald-700 p-2 rounded-full text-white shadow-lg group-hover:shadow-emerald-900/20 transition-all duration-300">
                <Feather size={20} />
              </div>
              <h1 className="text-2xl font-serif font-bold text-stone-800 dark:text-stone-100 tracking-tight">WanderPlan</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-xs font-serif italic text-stone-500 dark:text-stone-400 hidden sm:block">Curated by Qwen AI</div>
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => window.open('https://github.com/Glassous/WanderPlan', '_blank', 'noopener')}
                  className="p-2.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800/50 text-stone-600 dark:text-stone-400 transition-colors border border-transparent hover:border-stone-200 dark:hover:border-stone-700"
                  aria-label="Open GitHub"
                >
                  <Github size={18} />
                </button>
                <button 
                  onClick={toggleTheme}
                  className="p-2.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800/50 text-stone-600 dark:text-stone-400 transition-colors border border-transparent hover:border-stone-200 dark:hover:border-stone-700"
                >
                  {getThemeIcon()}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow p-4 sm:p-6 lg:p-8 max-w-[1800px] mx-auto w-full mt-24">
          {/* 
            Layout Logic:
            - Homepage (Form Visible) OR Editing: Single column, centered content.
            - Result View (Map Visible): 12-column grid for split view.
          */}
          <div className={`grid grid-cols-1 ${showMap ? 'lg:grid-cols-12' : 'lg:grid-cols-1'} gap-8 ${showMap ? 'h-[calc(100vh-8rem)]' : 'h-auto'} min-h-[600px] transition-all duration-500 ease-in-out`}>
            
            {/* Main Panel (Form / Itinerary List) */}
            <div className={`
              flex flex-col gap-6 ${showMap ? 'overflow-hidden' : 'overflow-visible'} transition-all duration-500
              ${showMap ? 'lg:col-span-4' : 'max-w-4xl mx-auto w-full'}
              ${/* Mobile: Hide this panel if map tab is active AND map is available */
                activeTab === 'map' && showMap ? 'hidden lg:flex' : 'flex'}
            `}>
              
              {isFormVisible ? (
                <div className="flex flex-col h-full overflow-visible">
                  <div className="flex-shrink-0 animate-fade-in mb-8">
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
                      <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-none border-l-4 border-red-500 text-sm">
                        {error}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex-grow overflow-y-auto pr-1 pb-4 scroll-smooth">
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
            {/* Only rendered if showMap is true */}
            {showMap && (
              <div className={`lg:col-span-8 h-full rounded-3xl overflow-hidden shadow-2xl shadow-stone-200/50 dark:shadow-black/40 border border-stone-200 dark:border-stone-800/50 relative bg-stone-100 dark:bg-stone-900/50 ${activeTab === 'plan' ? 'hidden lg:block' : 'block'}`}>
                <MapDisplay itinerary={itinerary} selectedDay={selectedDay} />
              </div>
            )}

          </div>
        </main>

        {/* Mobile Tab Bar (Only show if map is available) */}
        {showMap && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-stone-900/80 backdrop-blur-md border-t border-stone-200 dark:border-stone-800 p-2 flex justify-around z-50 safe-area-bottom">
            <button 
              onClick={() => setActiveTab('plan')}
              className={`flex flex-col items-center p-2 rounded-full flex-1 transition-colors ${
                activeTab === 'plan' 
                  ? 'text-emerald-800 dark:text-emerald-400' 
                  : 'text-stone-400 dark:text-stone-500'
              }`}
            >
              <Compass size={20} />
              <span className="text-[10px] uppercase tracking-widest mt-1 font-semibold">Journey</span>
            </button>
            <button 
              onClick={() => setActiveTab('map')}
              className={`flex flex-col items-center p-2 rounded-full flex-1 transition-colors ${
                activeTab === 'map' 
                  ? 'text-emerald-800 dark:text-emerald-400' 
                  : 'text-stone-400 dark:text-stone-500'
              }`}
            >
              <MapIcon size={20} />
              <span className="text-[10px] uppercase tracking-widest mt-1 font-semibold">Map</span>
            </button>
          </div>
        )}
      </div>
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 backdrop-blur-sm bg-stone-950/30" onClick={cancelDelete}></div>
          <div className="relative bg-white dark:bg-stone-900/80 backdrop-blur-md rounded-3xl border border-stone-100 dark:border-stone-800/50 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] p-8 w-[90%] max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600">
                <span className="font-serif font-bold">!</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-800 dark:text-stone-100">删除确认</h3>
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-300 mb-6">
              确定要删除这条行程记录吗？此操作不可恢复。
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={cancelDelete} className="px-4 py-2 rounded-full text-sm font-medium bg-stone-100 dark:bg-stone-800/50 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700/50 border border-stone-200 dark:border-stone-700/50">取消</button>
              <button onClick={confirmDelete} className="px-5 py-2 rounded-full text-sm font-medium bg-red-600 hover:bg-red-700 text-white shadow">删除</button>
            </div>
          </div>
        </div>
      )}
      {shareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 backdrop-blur-sm bg-stone-950/30" onClick={() => setShareModalOpen(false)}></div>
          <div className="relative bg-white dark:bg-stone-900/80 backdrop-blur-md rounded-3xl border border-stone-100 dark:border-stone-800/50 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] p-8 w-[90%] max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                <span className="font-serif font-bold">🔗</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-800 dark:text-stone-100">分享链接</h3>
            </div>
            <div className="space-y-3">
              <input
                readOnly
                value={shareModalLink}
                className="w-full bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/60 px-3 py-2 rounded-xl text-stone-800 dark:text-stone-100"
              />
              <div className="flex justify-end gap-3">
                <button onClick={() => setShareModalOpen(false)} className="px-4 py-2 rounded-full text-sm font-medium bg-stone-100 dark:bg-stone-800/50 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700/50 border border-stone-200 dark:border-stone-700/50">关闭</button>
                <button onClick={async () => { await navigator.clipboard.writeText(shareModalLink) }} className="px-5 py-2 rounded-full text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white shadow">复制</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </ThemeBackground>
  );
};

export default App;
