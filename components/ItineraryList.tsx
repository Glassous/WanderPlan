import React, { useState } from 'react';
import { Itinerary, Activity } from '../types';
import { MapPin, Clock, Edit3, Save, X, History, Plus, Share2, Trash2, RotateCcw, ArrowLeft } from 'lucide-react';
import { shareItinerary } from '../services/community'

interface ItineraryListProps {
  itinerary: Itinerary | null;
  partialItinerary: Partial<Itinerary> | null;
  streaming: boolean;
  history: Itinerary[];
  selectedDay: number | null;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  onSelectDay: (day: number | null) => void;
  onReplan: () => void;
  onUpdateItinerary: (itinerary: Itinerary) => void;
  onSelectHistory: (itinerary: Itinerary) => void;
  onDeleteHistory: (id: string, e: React.MouseEvent) => void;
  onImportItinerary: (itinerary: Itinerary) => void;
  onOpenShareModal: () => void;
  onActivityClick?: (activity: Activity) => void;
  mobileMapMode?: boolean;
}

const ItineraryList: React.FC<ItineraryListProps> = ({ 
  itinerary, 
  partialItinerary,
  streaming,
  history,
  selectedDay, 
  isEditing,
  setIsEditing,
  onSelectDay, 
  onReplan,
  onUpdateItinerary,
  onSelectHistory,
  onDeleteHistory,
  onImportItinerary,
  onOpenShareModal,
  onActivityClick,
  mobileMapMode = false
}) => {
  const [editedItinerary, setEditedItinerary] = useState<Itinerary | null>(null);
  const [sharing, setSharing] = useState(false)

  const handleExport = () => {
    if (!itinerary) return;
    const data = JSON.stringify(isEditing && editedItinerary ? editedItinerary : itinerary, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const a = document.createElement('a');
    const safeTitle = (itinerary.tripTitle || 'itinerary').replace(/[^\w\u4e00-\u9fa5]+/g, '-');
    a.href = URL.createObjectURL(blob);
    a.download = `wanderplan-${safeTitle}-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const startEditing = () => {
    if (itinerary) {
      setEditedItinerary(JSON.parse(JSON.stringify(itinerary)));
      setIsEditing(true);
    }
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditedItinerary(null);
  };

  const saveEditing = () => {
    if (editedItinerary) {
      const next = editedItinerary.inCommunity ? { ...editedItinerary, inCommunity: false } : editedItinerary
      onUpdateItinerary(next);
      setIsEditing(false);
      setEditedItinerary(null);
    }
  };

  const addDay = () => {
    if (!editedItinerary) return;
    const nextDay = (editedItinerary.days?.length || 0) + 1;
    const newDays = [...editedItinerary.days, { day: nextDay, theme: '', activities: [] }];
    setEditedItinerary({ ...editedItinerary, days: newDays });
  };

  const removeDay = (dayIdx: number) => {
    if (!editedItinerary) return;
    const newDays = editedItinerary.days.filter((_, idx) => idx !== dayIdx).map((d, i) => ({ ...d, day: i + 1 }));
    setEditedItinerary({ ...editedItinerary, days: newDays });
  };

  const addActivity = (dayIdx: number) => {
    if (!editedItinerary) return;
    const newItinerary = { ...editedItinerary };
    const acts = newItinerary.days[dayIdx].activities || [];
    acts.push({
      time: '09:00',
      activityName: '新活动',
      description: '',
      locationName: '',
      coordinates: { latitude: 0, longitude: 0 }
    });
    newItinerary.days[dayIdx].activities = acts;
    setEditedItinerary(newItinerary);
  };

  const removeActivity = (dayIdx: number, actIdx: number) => {
    if (!editedItinerary) return;
    const newItinerary = { ...editedItinerary };
    newItinerary.days[dayIdx].activities = newItinerary.days[dayIdx].activities.filter((_, i) => i !== actIdx);
    setEditedItinerary(newItinerary);
  };

  const handleCoordChange = (dayIdx: number, actIdx: number, field: 'latitude' | 'longitude', value: string) => {
    if (!editedItinerary) return;
    const num = parseFloat(value);
    const newItinerary = { ...editedItinerary };
    const current = newItinerary.days[dayIdx].activities[actIdx].coordinates || { latitude: 0, longitude: 0 };
    newItinerary.days[dayIdx].activities[actIdx].coordinates = {
      ...current,
      [field]: isNaN(num) ? 0 : num
    };
    setEditedItinerary(newItinerary);
  };

  const handleActivityChange = (dayIndex: number, actIndex: number, field: keyof Activity, value: string) => {
    if (!editedItinerary) return;
    const newItinerary = { ...editedItinerary };
    newItinerary.days[dayIndex].activities[actIndex] = {
      ...newItinerary.days[dayIndex].activities[actIndex],
      [field]: value
    };
    setEditedItinerary(newItinerary);
  };

  const handleLocationClick = (locationName: string) => {
    if (!locationName || locationName === "位置规划中") return;
    const searchQuery = encodeURIComponent(locationName);
    window.open(`https://www.bing.com/search?q=${searchQuery}`, '_blank');
  };

  const displayItinerary = isEditing && editedItinerary ? editedItinerary : 
                          streaming ? partialItinerary : itinerary;

  // --- Sub-Components ---
  
  const HeaderSection = () => (
    <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md rounded-2xl p-4 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center justify-between gap-4 transition-all duration-300">
      <h2 className="text-lg md:text-xl font-serif font-bold text-stone-800 dark:text-stone-100 truncate flex items-center gap-2">
        <span className="w-1.5 h-6 rounded-full bg-emerald-600 inline-block"></span>
        行程概览
      </h2>
      
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Return button - only visible on desktop */}
        <button 
          onClick={onReplan}
          className="hidden md:flex p-2 rounded-full text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800/50 transition-colors border border-transparent hover:border-stone-200 dark:hover:border-stone-700"
          title="返回"
        >
          <ArrowLeft size={18} />
        </button>
        
        {/* Share buttons - now visible on all screen sizes */}
        {/* 增加 !streaming 判断，流式生成过程中不显示分享按钮 */}
        {!(displayItinerary?.inCommunity) && !streaming && (
          <button
            onClick={async () => {
              if (!itinerary || sharing) return
              try {
                setSharing(true)
                const id = await shareItinerary(itinerary)
                onUpdateItinerary({ ...(isEditing && editedItinerary ? editedItinerary : itinerary), shareId: id, inCommunity: true })
              } catch (e) {
                alert('分享失败，请稍后重试')
              } finally {
                setSharing(false)
              }
            }}
            disabled={sharing}
            className="p-2 rounded-full text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors border border-transparent hover:border-amber-100 dark:hover:border-amber-900/30"
            title="分享到社区"
          >
            <Share2 size={18} className={sharing ? "animate-pulse" : ""} />
          </button>
        )}
        {/* 增加 !streaming 判断，流式生成过程中不显示分享链接按钮 */}
        {displayItinerary?.inCommunity && displayItinerary.shareId && !streaming && (
          <button
            onClick={onOpenShareModal}
            className="p-2 rounded-full text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors border border-transparent hover:border-emerald-100 dark:hover:border-emerald-900/50"
            title="分享链接"
          >
            <Share2 size={18} />
          </button>
        )}

        <button 
          onClick={startEditing}
          disabled={streaming}
          className={`p-2 rounded-full text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors border border-transparent hover:border-emerald-100 dark:hover:border-emerald-900/50 ${streaming ? 'opacity-50 cursor-not-allowed' : ''}`}
          title="编辑"
        >
          <Edit3 size={18} />
        </button>
        <button
          onClick={handleExport}
          disabled={streaming}
          className={`p-2 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/50 transition-colors border border-transparent hover:border-stone-200 dark:hover:border-stone-700 ${streaming ? 'opacity-50 cursor-not-allowed' : ''}`}
          title="导出"
        >
          <Save size={18} />
        </button>
      </div>
    </div>
  );



  const editInputTitle = "w-full text-4xl font-serif font-bold text-stone-900 dark:text-white bg-transparent border-0 border-b-2 border-stone-200 dark:border-stone-700/60 focus:border-emerald-600 focus:ring-0 px-0 py-2 placeholder-stone-300 transition-all";
  const editInputSummary = "w-full text-lg leading-relaxed text-stone-600 dark:text-stone-300 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200 dark:border-stone-700/60 p-4 focus:ring-2 focus:ring-emerald-500/20 outline-none resize-none transition-all";
  const editInputStandard = "w-full bg-transparent border-b border-stone-200 dark:border-stone-700/60 focus:border-emerald-500 text-stone-700 dark:text-stone-200 px-0 py-1 outline-none text-sm transition-colors";
  const editLabel = "text-[10px] uppercase font-bold text-stone-400 tracking-wider mb-1 block";

  // --- Main Render Logic ---

  if (streaming && !displayItinerary) {
    return (
      <div className="space-y-6 animate-fade-in mt-4">
        {/* Loading Skeleton */}
        <div className="relative bg-white dark:bg-stone-900/70 backdrop-blur-md rounded-3xl p-8 border border-stone-100 dark:border-stone-800/50 overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-700"></div>
           <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-stone-900 dark:text-white leading-tight">
              正在生成行程...
            </h1>
            <div className="w-12 h-12 border-4 border-emerald-200 dark:border-emerald-800 border-t-4 border-t-emerald-600 dark:border-t-emerald-400 rounded-full animate-spin mb-3"></div>
           </div>
        </div>
      </div>
    );
  }

  if (!displayItinerary) {
    // History View
    if (history.length > 0) {
       return (
         <div className="space-y-6 animate-fade-in mt-4">
           <h3 className="text-lg font-serif font-bold text-stone-800 dark:text-stone-200 flex items-center gap-3 border-b border-stone-200 dark:border-stone-800/50 pb-3">
             <History size={18} className="text-amber-500" />
             往期旅程
           </h3>
           <div className="grid gap-4">
             {history.map(item => (
               <div 
                 key={item.id} 
                 onClick={() => onSelectHistory(item)}
                 className="group relative p-6 bg-white dark:bg-stone-900/70 backdrop-blur-md rounded-2xl border border-stone-100 dark:border-stone-800/50 hover:border-emerald-500/30 transition-all duration-300 cursor-pointer"
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
         </div>
       )
    }
    return null; 
  }

  // Edit Mode
  if (isEditing) {
    return (
      <div className="animate-fade-in space-y-8 pb-20 max-w-4xl mx-auto h-full overflow-y-auto custom-scrollbar px-1">
        <div className="sticky top-0 z-20 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-sm py-4 px-8 rounded-3xl border-b border-stone-200 dark:border-stone-800/50 flex justify-between items-center mb-6 shadow-sm">
           <h2 className="text-xl font-serif text-stone-500 dark:text-stone-400 flex items-center gap-2">
             <Edit3 size={18} />
             编辑模式
           </h2>
           <div className="flex items-center gap-3">
             <button 
               onClick={cancelEditing}
               className="flex items-center gap-2 px-5 py-2 rounded-full text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800/50 transition-colors font-medium text-sm"
             >
               <X size={16} /> 取消
             </button>
             <button 
               onClick={saveEditing}
               className="flex items-center gap-2 px-6 py-2 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white transition-all font-medium text-sm shadow-lg hover:shadow-emerald-900/20"
             >
               <Save size={16} /> 保存变更
             </button>
           </div>
        </div>
        {/* Editing Form Content */}
        <div className="bg-white dark:bg-stone-900/80 backdrop-blur-md p-8 rounded-3xl border border-stone-100 dark:border-stone-800/50">
           <label className={editLabel}>行程标题</label>
           <input 
             value={displayItinerary.tripTitle}
             onChange={(e) => setEditedItinerary({...displayItinerary, tripTitle: e.target.value})}
             className={editInputTitle}
           />
           <div className="mt-8">
             <label className={editLabel}>行程简介</label>
             <textarea 
               value={displayItinerary.summary}
               onChange={(e) => setEditedItinerary({...displayItinerary, summary: e.target.value})}
               className={editInputSummary}
               rows={4}
             />
           </div>
           
           <div className="mt-8">
             <label className={editLabel}>视觉主题 (Visual Theme)</label>
             <select
               value={displayItinerary.visualTheme || 'default'}
               onChange={(e) => setEditedItinerary({...displayItinerary, visualTheme: e.target.value})}
               className="w-full bg-transparent border-b border-stone-200 dark:border-stone-700/60 focus:border-emerald-500 text-stone-700 dark:text-stone-200 px-0 py-2 outline-none text-base transition-colors"
             >
               {[
                 { value: 'default', label: '默认 (Default)' },
                 { value: 'urban', label: '城市 (Urban)' },
                 { value: 'beach', label: '海滩 (Beach)' },
                 { value: 'rainforest', label: '雨林 (Rainforest)' },
                 { value: 'desert', label: '沙漠 (Desert)' },
                 { value: 'snow', label: '雪景 (Snow)' },
                 { value: 'ancient_town', label: '古镇 (Ancient Town)' },
                 { value: 'mountain', label: '山脉 (Mountain)' },
                 { value: 'countryside', label: '田园 (Countryside)' },
                 { value: 'sakura', label: '樱花 (Sakura)' },
                 { value: 'autumn', label: '深秋 (Autumn)' },
               ].map(option => (
                 <option key={option.value} value={option.value} className="bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200">
                   {option.label}
                 </option>
               ))}
             </select>
           </div>
        </div>

        {displayItinerary.days.map((day, dayIdx) => (
           <div key={day.day} className="bg-white dark:bg-stone-900/80 backdrop-blur-md p-8 rounded-3xl border border-stone-100 dark:border-stone-800/50">
              <div className="flex items-center gap-4 mb-8">
                 <div className="text-3xl font-serif font-bold text-stone-300 dark:text-stone-700">D{day.day}</div>
                 <div className="flex-grow h-px bg-stone-100 dark:bg-stone-800/50"></div>
                 <input 
                    value={day.theme}
                    onChange={(e) => {
                      const newItinerary = {...displayItinerary};
                      newItinerary.days[dayIdx].theme = e.target.value;
                      setEditedItinerary(newItinerary);
                    }}
                    className="text-right font-serif text-emerald-800 dark:text-emerald-500 font-medium bg-transparent border-b border-dashed border-stone-300 focus:border-solid focus:border-emerald-500 outline-none w-48"
                 />
                 <button onClick={() => removeDay(dayIdx)} className="ml-4 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-stone-100 dark:bg-stone-800/50 text-stone-500 dark:text-stone-400">删除当日</button>
              </div>
              <div className="space-y-8">
                 {day.activities.map((activity, actIdx) => (
                  <div key={actIdx} className="relative pl-6 border-l-2 border-stone-100 dark:border-stone-800/50 rounded-2xl bg-stone-50 dark:bg-stone-800/30 p-4">
                     <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-stone-200 dark:bg-stone-700 border-2 border-white dark:border-stone-900"></div>
                     <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-3 space-y-4">
                           <div>
                              <label className={editLabel}>时间</label>
                              <div className="flex items-center gap-2 text-stone-600 dark:text-stone-300"><Clock size={14} /><input value={activity.time} onChange={(e) => handleActivityChange(dayIdx, actIdx, 'time', e.target.value)} className={editInputStandard} /></div>
                           </div>
                           <div>
                              <label className={editLabel}>地点</label>
                              <div className="flex items-center gap-2 text-stone-600 dark:text-stone-300"><MapPin size={14} /><input value={activity.locationName} onChange={(e) => handleActivityChange(dayIdx, actIdx, 'locationName', e.target.value)} className={editInputStandard} /></div>
                           </div>
                           <div>
                              <label className={editLabel}>坐标</label>
                              <div className="flex items-center gap-2">
                                <input type="number" step="0.000001" value={activity.coordinates?.latitude ?? 0} onChange={(e) => handleCoordChange(dayIdx, actIdx, 'latitude', e.target.value)} className="w-full bg-transparent border-b border-stone-200 dark:border-stone-700/60 focus:border-emerald-500 text-stone-700 dark:text-stone-200 px-0 py-1 outline-none text-xs" />
                                <input type="number" step="0.000001" value={activity.coordinates?.longitude ?? 0} onChange={(e) => handleCoordChange(dayIdx, actIdx, 'longitude', e.target.value)} className="w-full bg-transparent border-b border-stone-200 dark:border-stone-700/60 focus:border-emerald-500 text-stone-700 dark:text-stone-200 px-0 py-1 outline-none text-xs" />
                              </div>
                           </div>
                        </div>
                        <div className="md:col-span-9 space-y-4">
                           <div><label className={editLabel}>活动名称</label><input value={activity.activityName} onChange={(e) => handleActivityChange(dayIdx, actIdx, 'activityName', e.target.value)} className="w-full text-xl font-bold text-stone-800 dark:text-stone-100 bg-transparent border-b border-stone-200 dark:border-stone-700/60 focus:border-emerald-500 outline-none py-1" /></div>
                           <div><label className={editLabel}>详情描述</label><textarea value={activity.description} onChange={(e) => handleActivityChange(dayIdx, actIdx, 'description', e.target.value)} className="w-full text-stone-600 dark:text-stone-300 bg-stone-50 dark:bg-stone-800/30 rounded-lg p-3 border-0 resize-none text-sm leading-relaxed focus:ring-1 focus:ring-emerald-500/50" rows={3} /></div>
                           <div className="flex justify-end"><button onClick={() => removeActivity(dayIdx, actIdx)} className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 border border-red-Vm00/60">删除活动</button></div>
                        </div>
                     </div>
                  </div>
                ))}
                 <div className="flex justify-center"><button onClick={() => addActivity(dayIdx)} className="mt-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-800 text-white hover:bg-emerald-900 shadow"><Plus size={14} className="inline mr-1" /> 新增活动</button></div>
              </div>
           </div>
        ))}
        <div className="flex justify-center gap-3"><button onClick={addDay} className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-800 text-white hover:bg-emerald-900 shadow">新增天数</button></div>
        <div className="flex justify-center pt-8 pb-12"><button onClick={saveEditing} className="px-12 py-3 bg-emerald-800 text-white rounded-full font-serif text-lg hover:scale-105 transition-transform">保存所有变更</button></div>
      </div>
    );
  }

  // Mobile Map Mode: Only return the Header
  if (mobileMapMode) {
    return <HeaderSection />;
  }

  // Standard View: Split Layout (Header Fixed, Body Scrollable if height constrained)
  return (
    <div className="flex flex-col h-full gap-4 relative">
      {/* 1. Fixed Header Section */}
      <div className="flex-shrink-0 z-10">
        <HeaderSection />
      </div>

      {/* 2. Scrollable Content Section */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 pb-10 min-h-0">
        <div className="space-y-6">
          {/* Summary Card */}
          <div className="relative bg-white dark:bg-stone-900/70 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-stone-100 dark:border-stone-800/50 overflow-hidden group shadow-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-700"></div>
            <div className="relative z-10">
              <h1 className="text-2xl md:text-4xl font-serif font-bold mb-4 text-stone-900 dark:text-white leading-tight">
                {displayItinerary.tripTitle || "正在生成行程..."}
              </h1>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed font-light text-sm md:text-base border-l-2 border-amber-400 pl-4 italic">
                {displayItinerary.summary || "AI正在为您规划完美的旅行体验..."}
              </p>
              
              {/* 模型信息显示 */}
              {displayItinerary.model && (
                <div className="mt-3 text-xs text-stone-500 dark:text-stone-400">
                  {displayItinerary.model}
                </div>
              )}
              
              {streaming && (
                <div className="mt-4 flex items-center text-xs text-emerald-600 dark:text-emerald-400">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                  <span className="ml-2 font-medium">AI正在生成行程...</span>
                </div>
              )}
              
              {/* 注意事项展开折叠组件 */}
              {displayItinerary.notes && displayItinerary.notes.length > 0 && (
                <div className="mt-3">
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer list-none text-sm font-medium text-stone-700 dark:text-stone-300 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors">
                      <span>旅行注意事项</span>
                      <svg className="w-4 h-4 transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="mt-3 text-sm text-stone-600 dark:text-stone-400 space-y-2 pl-5 border-l-2 border-stone-100 dark:border-stone-800/50">
                      {displayItinerary.notes.map((note, index) => (
                        <div key={index} className="flex gap-2">
                          <span className="text-emerald-500 dark:text-emerald-400 mt-1">•</span>
                          <span>{note}</span>
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              )}
            </div>
          </div>

          {/* Day Filters */}
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-hide sticky top-0 z-20 pt-2 -mt-2 bg-transparent pointer-events-auto">
             <button 
               onClick={() => onSelectDay(null)}
               className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${
                 selectedDay === null 
                   ? 'bg-stone-800 text-white' 
                   : 'bg-white dark:bg-stone-900/90 backdrop-blur text-stone-500 dark:text-stone-400 border border-stone-200 dark:border-stone-700/50 hover:border-emerald-500'
               }`}
             >
               All Days
             </button>
             {(displayItinerary.days || []).map((day, dayIdx) => {
               if (!day || day.day === undefined) return null;
               return (
                 <button
                   key={`filter-${day.day || dayIdx}`}
                   onClick={() => onSelectDay(day.day)}
                   className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap shadow-sm ${
                     selectedDay === day.day
                       ? 'bg-emerald-800 text-white'
                       : 'bg-white dark:bg-stone-900/90 backdrop-blur text-stone-500 dark:text-stone-400 border border-stone-200 dark:border-stone-700/50 hover:border-emerald-500'
                   }`}
                 >
                   Day {day.day}
                 </button>
               );
             })}
          </div>

          {/* Days List */}
          <div className="space-y-8">
            {(displayItinerary.days || []).map((day, dayIdx) => {
              if (!day || typeof day !== 'object' || day.day === undefined) return null;
              if (selectedDay !== null && day.day !== selectedDay) return null;

              return (
                <div key={day.day || dayIdx} className="bg-white dark:bg-stone-900/70 backdrop-blur-md rounded-3xl border border-stone-100 dark:border-stone-800/50 overflow-hidden shadow-sm">
                  <div 
                    className="bg-stone-50/50 dark:bg-stone-800/30 px-6 py-4 md:px-8 md:py-5 border-b border-stone-100 dark:border-stone-800/50 flex items-center justify-between cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                    onClick={() => onSelectDay(selectedDay === (day.day || dayIdx + 1) ? null : (day.day || dayIdx + 1))}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-serif font-bold text-2xl text-stone-300 dark:text-stone-600">
                        {(day.day || dayIdx + 1).toString().padStart(2, '0')}
                      </span>
                      <h3 className="font-serif font-bold text-lg text-stone-800 dark:text-white">Day {(day.day || dayIdx + 1)}</h3>
                    </div>
                    <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full uppercase tracking-wide border border-emerald-100 dark:border-emerald-900/30 truncate max-w-[120px]">
                      {day.theme || "规划中"}
                    </span>
                  </div>
                  
                  <div className="p-2">
                    {(day.activities || []).map((activity, actIdx) => {
                      if (!activity) return null;
                      // 新增：判断是否可点击
                      const isClickable = !isEditing && !streaming;
                      return (
                        <div 
                          key={actIdx} 
                          onClick={() => isClickable && onActivityClick?.(activity)}
                          className={`group flex items-stretch p-3 md:p-4 rounded-2xl transition-colors ${
                            isClickable 
                              ? 'hover:bg-stone-50 dark:hover:bg-stone-800/50 cursor-pointer active:scale-[0.99] transition-transform' 
                              : 'opacity-80 cursor-default'
                          }`}
                        >
                          <div className="w-16 md:w-20 pt-1 flex flex-col items-center border-r border-stone-100 dark:border-stone-800/50 mr-4 md:mr-5 pr-4 md:pr-5">
                             <span className="text-xs md:text-sm font-bold text-stone-800 dark:text-stone-200">{activity.time || "--:--"}</span>
                             <div className="h-full w-px bg-stone-100 dark:bg-stone-800/50 my-2 group-last:hidden"></div>
                          </div>

                          <div className="flex-grow pb-2 min-w-0">
                            <h4 className="font-bold text-stone-800 dark:text-stone-100 mb-2 text-sm md:text-base group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors truncate">
                              {activity.activityName || "活动规划中"}
                            </h4>
                            <p className="text-xs md:text-sm text-stone-500 dark:text-stone-400 leading-relaxed mb-3 line-clamp-2 md:line-clamp-3">
                              {activity.description || "正在生成活动详情..."}
                            </p>
                            <div className="flex items-center text-xs text-stone-400 dark:text-stone-500 font-medium truncate">
                              <MapPin className="w-3.5 h-3.5 mr-1.5 text-amber-500 flex-shrink-0" />
                              <span 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // 同样判断是否可点击
                                  if (isClickable) {
                                    handleLocationClick(activity.locationName || "");
                                  }
                                }}
                                className={`${isClickable ? 'hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline cursor-pointer' : 'cursor-default'} transition-colors truncate`}
                              >
                                {activity.locationName || "位置规划中"}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {streaming && (day.activities || []).length === 0 && (
                      <div className="p-4 text-center text-stone-500 dark:text-stone-400">
                        <div className="flex justify-center space-x-1 mb-2">
                          <div className="w-2 h-2 bg-stone-300 dark:bg-stone-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                          <div className="w-2 h-2 bg-stone-300 dark:bg-stone-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                          <div className="w-2 h-2 bg-stone-300 dark:bg-stone-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                        </div>
                        <p className="text-sm">正在生成活动...</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {streaming && (displayItinerary.days || []).length === 0 && (
              <div className="bg-white dark:bg-stone-900/70 backdrop-blur-md rounded-3xl border border-stone-100 dark:border-stone-800/50 p-8 text-center">
                <div className="flex justify-center space-x-1 mb-4">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
                <p className="text-stone-500 dark:text-stone-400">AI正在为您规划行程天数...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryList;