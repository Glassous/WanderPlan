import React, { useState, useRef } from 'react';
import { Itinerary, Activity } from '../types';
import { MapPin, Clock, Edit3, Save, RotateCcw, X, History, Plus, Share2, Trash2 } from 'lucide-react';
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
  onActivityClick?: (activity: Activity) => void; // 新增属性
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

  const displayItinerary = isEditing && editedItinerary ? editedItinerary : 
                          streaming ? partialItinerary : itinerary;

  if (streaming && !displayItinerary) {
    return (
      <div className="space-y-6 animate-fade-in mt-4">
        <div className="relative bg-white dark:bg-stone-900/70 backdrop-blur-md rounded-3xl p-8 border border-stone-100 dark:border-stone-800/50 overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-700"></div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-stone-900 dark:text-white leading-tight">
              正在生成行程...
            </h1>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed font-light text-sm md:text-base border-l-2 border-amber-400 pl-4 italic">
              AI正在为您规划完美的旅行体验...
            </p>
            <div className="mt-6 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-emerald-200 dark:border-emerald-800 border-t-4 border-t-emerald-600 dark:border-t-emerald-400 rounded-full animate-spin mb-3"></div>
                <p className="text-sm text-stone-500 dark:text-stone-400">AI正在思考中...</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-stone-900/70 backdrop-blur-md rounded-3xl p-8 border border-stone-100 dark:border-stone-800/50">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-stone-500 dark:text-stone-400">生成行程结构</span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400">进行中</span>
            </div>
            <div className="w-full bg-stone-200 dark:bg-stone-800/50 rounded-full h-2">
              <div className="bg-emerald-600 h-2 rounded-full animate-pulse" style={{ width: '30%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-stone-500 dark:text-stone-400">生成每日行程</span>
              <span className="text-xs text-stone-400 dark:text-stone-500">等待中</span>
            </div>
            <div className="w-full bg-stone-200 dark:bg-stone-800/50 rounded-full h-2">
              <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-stone-500 dark:text-stone-400">优化行程细节</span>
              <span className="text-xs text-stone-400 dark:text-stone-500">等待中</span>
            </div>
            <div className="w-full bg-stone-200 dark:bg-stone-800/50 rounded-full h-2">
              <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!displayItinerary) {
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

  const editInputTitle = "w-full text-4xl font-serif font-bold text-stone-900 dark:text-white bg-transparent border-0 border-b-2 border-stone-200 dark:border-stone-700/60 focus:border-emerald-600 focus:ring-0 px-0 py-2 placeholder-stone-300 transition-all";
  const editInputSummary = "w-full text-lg leading-relaxed text-stone-600 dark:text-stone-300 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200 dark:border-stone-700/60 p-4 focus:ring-2 focus:ring-emerald-500/20 outline-none resize-none transition-all";
  const editInputStandard = "w-full bg-transparent border-b border-stone-200 dark:border-stone-700/60 focus:border-emerald-500 text-stone-700 dark:text-stone-200 px-0 py-1 outline-none text-sm transition-colors";
  const editLabel = "text-[10px] uppercase font-bold text-stone-400 tracking-wider mb-1 block";

  if (isEditing) {
    return (
      <div className="animate-fade-in space-y-8 pb-20 max-w-4xl mx-auto">
        <div className="sticky top-0 z-20 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-sm py-4 border-b border-stone-200 dark:border-stone-800/50 flex justify-between items-center mb-6">
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
               className="flex items-center gap-2 px-6 py-2 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white transition-all font-medium text-sm"
             >
               <Save size={16} /> 保存变更
             </button>
           </div>
        </div>

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
                 <button
                   onClick={() => removeDay(dayIdx)}
                   className="ml-4 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-stone-100 dark:bg-stone-800/50 text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700/50 border border-stone-200 dark:border-stone-700/50"
                 >
                   删除当日
                 </button>
              </div>

              <div className="space-y-8">
                 {day.activities.map((activity, actIdx) => (
                  <div key={actIdx} className="relative pl-6 border-l-2 border-stone-100 dark:border-stone-800/50 rounded-2xl bg-stone-50 dark:bg-stone-800/30 p-4">
                     <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-stone-200 dark:bg-stone-700 border-2 border-white dark:border-stone-900"></div>
                     <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-3 space-y-4">
                           <div>
                              <label className={editLabel}>时间</label>
                              <div className="flex items-center gap-2 text-stone-600 dark:text-stone-300">
                                <Clock size={14} />
                                <input 
                                  value={activity.time}
                                  onChange={(e) => handleActivityChange(dayIdx, actIdx, 'time', e.target.value)}
                                  className={editInputStandard}
                                />
                              </div>
                           </div>
                           <div>
                              <label className={editLabel}>地点</label>
                              <div className="flex items-center gap-2 text-stone-600 dark:text-stone-300">
                                <MapPin size={14} />
                                <input 
                                  value={activity.locationName}
                                  onChange={(e) => handleActivityChange(dayIdx, actIdx, 'locationName', e.target.value)}
                                  className={editInputStandard}
                                />
                              </div>
                           </div>
                           <div>
                              <label className={editLabel}>坐标</label>
                              <div className="flex items-center gap-2">
                                <input
                                  type="number"
                                  step="0.000001"
                                  value={activity.coordinates?.latitude ?? 0}
                                  onChange={(e) => handleCoordChange(dayIdx, actIdx, 'latitude', e.target.value)}
                                  placeholder="纬度"
                                  className="w-full bg-transparent border-b border-stone-200 dark:border-stone-700/60 focus:border-emerald-500 text-stone-700 dark:text-stone-200 px-0 py-1 outline-none text-xs"
                                />
                                <input
                                  type="number"
                                  step="0.000001"
                                  value={activity.coordinates?.longitude ?? 0}
                                  onChange={(e) => handleCoordChange(dayIdx, actIdx, 'longitude', e.target.value)}
                                  placeholder="经度"
                                  className="w-full bg-transparent border-b border-stone-200 dark:border-stone-700/60 focus:border-emerald-500 text-stone-700 dark:text-stone-200 px-0 py-1 outline-none text-xs"
                                />
                              </div>
                           </div>
                        </div>
                        <div className="md:col-span-9 space-y-4">
                           <div>
                             <label className={editLabel}>活动名称</label>
                             <input 
                                value={activity.activityName}
                                onChange={(e) => handleActivityChange(dayIdx, actIdx, 'activityName', e.target.value)}
                                className="w-full text-xl font-bold text-stone-800 dark:text-stone-100 bg-transparent border-b border-stone-200 dark:border-stone-700/60 focus:border-emerald-500 outline-none py-1"
                             />
                           </div>
                           <div>
                             <label className={editLabel}>详情描述</label>
                             <textarea 
                                value={activity.description}
                                onChange={(e) => handleActivityChange(dayIdx, actIdx, 'description', e.target.value)}
                                className="w-full text-stone-600 dark:text-stone-300 bg-stone-50 dark:bg-stone-800/30 rounded-lg p-3 border-0 resize-none text-sm leading-relaxed focus:ring-1 focus:ring-emerald-500/50"
                                rows={3}
                             />
                           </div>
                           <div className="flex justify-end">
                             <button
                               onClick={() => removeActivity(dayIdx, actIdx)}
                               className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 border border-red-200/60"
                             >
                               删除活动
                             </button>
                           </div>
                        </div>
                     </div>
                  </div>
                ))}
                 <div className="flex justify-center">
                   <button
                     onClick={() => addActivity(dayIdx)}
                     className="mt-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-800 text-white hover:bg-emerald-900 shadow"
                   >
                     <Plus size={14} className="inline mr-1" /> 新增活动
                   </button>
                 </div>
              </div>
           </div>
        ))}
        <div className="flex justify-center gap-3">
          <button 
            onClick={addDay}
            className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-800 text-white hover:bg-emerald-900 shadow"
          >
            新增天数
          </button>
        </div>
        
        <div className="flex justify-center pt-8 pb-12">
           <button 
             onClick={saveEditing}
             className="px-12 py-3 bg-emerald-800 text-white rounded-full font-serif text-lg hover:scale-105 transition-transform"
           >
             保存所有变更
           </button>
        </div>
      </div>
    );
  }

  const ShareActions = () => (
    <>
      {!(displayItinerary.inCommunity) && (
        <button
          onClick={async () => {
            if (!itinerary || sharing) return
            try {
              setSharing(true)
              const id = await shareItinerary(itinerary)
              const params = new URLSearchParams(window.location.search)
              params.set('share', id)
              window.history.replaceState(null, '', `?${params.toString()}`)
              onUpdateItinerary({ ...(isEditing && editedItinerary ? editedItinerary : itinerary), shareId: id, inCommunity: true })
            } catch (e) {
              alert('分享失败，请稍后重试')
            } finally {
              setSharing(false)
            }
          }}
          className="text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 px-4 py-2 rounded-full transition-colors border border-amber-100 dark:border-amber-900/30"
        >
          <Share2 size={14} />
          {sharing ? '分享中…' : '分享到社区'}
        </button>
      )}
      {displayItinerary.inCommunity && displayItinerary.shareId && (
        <button
          onClick={onOpenShareModal}
          className="text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 px-4 py-2 rounded-full transition-colors border border-emerald-100 dark:border-emerald-900/50"
        >
          分享链接
        </button>
      )}
    </>
  );

  const renderHeader = () => (
    <div className="sticky top-0 z-20 pb-4 pt-1 mb-4 transition-all duration-300">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-serif font-bold text-stone-800 dark:text-stone-100 truncate">行程概览</h2>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="hidden md:flex items-center gap-2">
             <ShareActions />
          </div>

          <button 
            onClick={startEditing}
            className="text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 px-4 py-2 rounded-full transition-colors border border-emerald-100 dark:border-emerald-900/50 whitespace-nowrap"
          >
            <Edit3 size={14} />
            编辑
          </button>
          <button
            onClick={handleExport}
            className="text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/50 px-4 py-2 rounded-full transition-colors whitespace-nowrap"
          >
            <Save size={14} />
            导出
          </button>
          <button 
            onClick={onReplan}
            className="text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800/50 px-4 py-2 rounded-full transition-colors whitespace-nowrap"
          >
            <RotateCcw size={14} />
            返回
          </button>
        </div>
      </div>
      
      <div className="flex md:hidden items-center justify-end gap-2 mt-3 animate-fade-in">
        <ShareActions />
      </div>
    </div>
  );

  if (mobileMapMode) {
    return (
      <div>
        {renderHeader()}
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {renderHeader()}

      <div className="relative bg-white dark:bg-stone-900/70 backdrop-blur-md rounded-3xl p-8 border border-stone-100 dark:border-stone-800/50 overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-700"></div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-stone-900 dark:text-white leading-tight">
            {displayItinerary.tripTitle || "正在生成行程..."}
          </h1>
          <p className="text-stone-600 dark:text-stone-400 leading-relaxed font-light text-sm md:text-base border-l-2 border-amber-400 pl-4 italic">
            {displayItinerary.summary || "AI正在为您规划完美的旅行体验..."}
          </p>
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
        </div>
      </div>

      <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-hide">
         <button 
           onClick={() => onSelectDay(null)}
           className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
             selectedDay === null 
               ? 'bg-stone-800 text-white' 
               : 'bg-white dark:bg-stone-900/60 text-stone-500 dark:text-stone-400 border border-stone-200 dark:border-stone-700/50 hover:border-emerald-500'
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
               className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                 selectedDay === day.day
                   ? 'bg-emerald-800 text-white'
                   : 'bg-white dark:bg-stone-900/60 text-stone-500 dark:text-stone-400 border border-stone-200 dark:border-stone-700/50 hover:border-emerald-500'
               }`}
             >
               Day {day.day}
             </button>
           );
         })}
      </div>

      <div className="space-y-8">
        {(displayItinerary.days || []).map((day, dayIdx) => {
          if (!day || typeof day !== 'object' || day.day === undefined) return null;
          if (selectedDay !== null && day.day !== selectedDay) return null;

          return (
            <div key={day.day || dayIdx} className="bg-white dark:bg-stone-900/70 backdrop-blur-md rounded-3xl border border-stone-100 dark:border-stone-800/50 overflow-hidden">
              <div 
                className="bg-stone-50/50 dark:bg-stone-800/30 px-8 py-5 border-b border-stone-100 dark:border-stone-800/50 flex items-center justify-between cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                onClick={() => onSelectDay(selectedDay === (day.day || dayIdx + 1) ? null : (day.day || dayIdx + 1))}
              >
                <div className="flex items-center gap-4">
                  <span className="font-serif font-bold text-2xl text-stone-300 dark:text-stone-600">
                    {(day.day || dayIdx + 1).toString().padStart(2, '0')}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-stone-800 dark:text-white">Day {(day.day || dayIdx + 1)}</h3>
                </div>
                <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full uppercase tracking-wide border border-emerald-100 dark:border-emerald-900/30">
                  {day.theme || "规划中"}
                </span>
              </div>
              
              <div className="p-2">
                {(day.activities || []).map((activity, actIdx) => {
                  if (!activity) return null;
                  return (
                    <div 
                      key={actIdx} 
                      onClick={() => !isEditing && onActivityClick?.(activity)}
                      className={`group flex items-stretch p-4 hover:bg-stone-50 dark:hover:bg-stone-800/50 rounded-2xl transition-colors ${!isEditing ? 'cursor-pointer active:scale-[0.99] transition-transform' : ''}`}
                    >
                      <div className="w-20 pt-1 flex flex-col items-center border-r border-stone-100 dark:border-stone-800/50 mr-5 pr-5">
                         <span className="text-sm font-bold text-stone-800 dark:text-stone-200">{activity.time || "--:--"}</span>
                         <div className="h-full w-px bg-stone-100 dark:bg-stone-800/50 my-2 group-last:hidden"></div>
                      </div>

                      <div className="flex-grow pb-2">
                        <h4 className="font-bold text-stone-800 dark:text-stone-100 mb-2 text-base group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors">
                          {activity.activityName || "活动规划中"}
                        </h4>
                        <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed mb-3 line-clamp-3">
                          {activity.description || "正在生成活动详情..."}
                        </p>
                        <div className="flex items-center text-xs text-stone-400 dark:text-stone-500 font-medium">
                          <MapPin className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
                          {activity.locationName || "位置规划中"}
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
  );
};

export default ItineraryList;