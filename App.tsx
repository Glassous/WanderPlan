import React, { useState, useEffect } from 'react';
import TravelForm from './components/TravelForm';
import ItineraryList from './components/ItineraryList';
import MapDisplay from './components/MapDisplay';
import { generateItinerary } from './services/geminiService';
import { TripFormData, Itinerary } from './types';
import { Map as MapIcon, Compass, Moon, Sun, Monitor, Feather } from 'lucide-react';

type Theme = 'system' | 'light' | 'dark';

const App: React.FC = () => {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [history, setHistory] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'plan' | 'map'>('plan'); // For mobile view
  
  // UI State
  const [theme, setTheme] = useState<Theme>('system');
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  
  // Edit State
  const [isEditing, setIsEditing] = useState(false);

  // Load History on Mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('wanderplan_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  // Save History when it changes
  useEffect(() => {
    localStorage.setItem('wanderplan_history', JSON.stringify(history));
  }, [history]);

  // Theme Logic
  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      if (theme === 'dark' || (theme === 'system' && mediaQuery.matches)) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
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
    setError(null);
    try {
      const result = await generateItinerary(data);
      setItinerary(result);
      setHistory(prev => [result, ...prev]);
      
      setIsFormVisible(false);
      setSelectedDay(null);
      setIsEditing(false); // Ensure not editing when new one generates
      setActiveTab('plan');
    } catch (err) {
      setError("生成行程失败，请重试。");
    } finally {
      setLoading(false);
    }
  };

  const handleReplan = () => {
    setIsFormVisible(true);
    setIsEditing(false);
    setItinerary(null);
    setActiveTab('plan');
  };

  const handleUpdateItinerary = (updatedItinerary: Itinerary) => {
    setItinerary(updatedItinerary);
    setHistory(prev => prev.map(item => item.id === updatedItinerary.id ? updatedItinerary : item));
    // Note: isEditing is set to false inside ItineraryList or we can do it here if we passed a callback
  };

  const handleSelectHistory = (historyItem: Itinerary) => {
    setItinerary(historyItem);
    setIsFormVisible(false);
    setSelectedDay(null);
    setIsEditing(false);
    setActiveTab('plan');
  };

  const handleDeleteHistory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('确定要删除这条行程记录吗？')) {
      setHistory(prev => prev.filter(item => item.id !== id));
      if (itinerary?.id === id) {
        setItinerary(null);
        setIsFormVisible(true);
      }
    }
  };

  // Logic to determine if map should be shown
  // Map is hidden on Homepage (isFormVisible) AND during Editing
  const showMap = !isFormVisible && !isEditing;

  return (
    <div className="min-h-screen bg-stone-50 bg-starry flex flex-col font-sans transition-colors duration-500">
      {/* Header */}
      <header className="bg-white/80 dark:bg-stone-900/60 backdrop-blur-md border-b border-stone-200 dark:border-stone-800/50 sticky top-0 z-30 transition-colors">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => { setIsFormVisible(true); setItinerary(null); setIsEditing(false); }}>
            <div className="bg-emerald-800 dark:bg-emerald-700 p-2 rounded-full text-white shadow-lg group-hover:shadow-emerald-900/20 transition-all duration-300">
              <Feather size={20} />
            </div>
            <h1 className="text-2xl font-serif font-bold text-stone-800 dark:text-stone-100 tracking-tight">WanderPlan</h1>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="text-xs font-serif italic text-stone-500 dark:text-stone-400 hidden sm:block">
              Curated by Gemini AI
            </div>
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800/50 text-stone-600 dark:text-stone-400 transition-colors border border-transparent hover:border-stone-200 dark:hover:border-stone-700"
            >
              {getThemeIcon()}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 sm:p-6 lg:p-8 max-w-[1800px] mx-auto w-full">
        {/* 
          Layout Logic:
          - Homepage (Form Visible) OR Editing: Single column, centered content.
          - Result View (Map Visible): 12-column grid for split view.
        */}
        <div className={`grid grid-cols-1 ${showMap ? 'lg:grid-cols-12' : 'lg:grid-cols-1'} gap-8 h-[calc(100vh-8rem)] min-h-[600px] transition-all duration-500 ease-in-out`}>
          
          {/* Main Panel (Form / Itinerary List) */}
          <div className={`
            flex flex-col gap-6 overflow-hidden transition-all duration-500
            ${showMap ? 'lg:col-span-4' : 'max-w-4xl mx-auto w-full'}
            ${/* Mobile: Hide this panel if map tab is active AND map is available */
              activeTab === 'map' && showMap ? 'hidden lg:flex' : 'flex'}
          `}>
            
            {isFormVisible ? (
               <div className="flex flex-col h-full overflow-hidden">
                 <div className="flex-shrink-0 animate-fade-in mb-8">
                   <TravelForm onSubmit={handleFormSubmit} isLoading={loading} />
                   {error && (
                     <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-none border-l-4 border-red-500 text-sm">
                       {error}
                     </div>
                   )}
                 </div>
                 
                 <div className="flex-grow overflow-y-auto pr-1">
                    <ItineraryList 
                      itinerary={null} 
                      history={history}
                      selectedDay={null}
                      isEditing={false}
                      setIsEditing={setIsEditing}
                      onSelectDay={() => {}}
                      onReplan={() => {}}
                      onUpdateItinerary={() => {}}
                      onSelectHistory={handleSelectHistory}
                      onDeleteHistory={handleDeleteHistory}
                    />
                 </div>
               </div>
            ) : (
               <div className="flex-grow overflow-y-auto pr-1 pb-4 scroll-smooth">
                 <ItineraryList 
                    itinerary={itinerary} 
                    history={history}
                    selectedDay={selectedDay}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    onSelectDay={setSelectedDay}
                    onReplan={handleReplan}
                    onUpdateItinerary={handleUpdateItinerary}
                    onSelectHistory={handleSelectHistory}
                    onDeleteHistory={handleDeleteHistory}
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
  );
};

export default App;