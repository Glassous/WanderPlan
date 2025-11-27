import React, { useState } from 'react';
import { TripFormData } from '../types';
import { Plane, Calendar, Wallet, Users, Heart, Clock, Sparkles } from 'lucide-react';

interface TravelFormProps {
  onSubmit: (data: TripFormData) => void;
  isLoading: boolean;
}

const TravelForm: React.FC<TravelFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<TripFormData>({
    destination: '',
    duration: 5,
    travelers: '情侣/夫妻',
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

  const inputClasses = "w-full bg-stone-50 dark:bg-stone-800/50 border-0 border-b-2 border-stone-200 dark:border-stone-700 focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-0 px-2 py-3 transition-colors rounded-t-sm text-stone-800 dark:text-stone-100 placeholder-stone-400";
  const labelClasses = "block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1 ml-1";

  return (
    <div className="bg-white dark:bg-stone-900 p-8 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-black/40 border border-stone-100 dark:border-stone-800">
      <h2 className="text-3xl font-serif font-bold mb-8 text-stone-800 dark:text-stone-100 flex items-center gap-3">
        <Sparkles className="text-amber-500" size={24} />
        <span className="bg-gradient-to-r from-emerald-800 to-stone-600 dark:from-emerald-400 dark:to-stone-300 bg-clip-text text-transparent">
          定制您的旅程
        </span>
      </h2>
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

        {/* Duration & Travelers */}
        <div className="grid grid-cols-2 gap-8">
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
          </div>
          <div>
            <label className={labelClasses}>同行者</label>
            <div className="relative">
               <select
                name="travelers"
                value={formData.travelers}
                onChange={handleChange}
                className={inputClasses}
              >
                <option value="独自一人">独自一人</option>
                <option value="情侣/夫妻">情侣/夫妻</option>
                <option value="家庭出游">家庭出游</option>
                <option value="朋友结伴">朋友结伴</option>
              </select>
            </div>
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
          <div className="grid grid-cols-3 gap-3 mt-2">
             {['经济型', '中等', '奢华'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, budget: opt }))}
                  className={`py-2 px-4 rounded-xl text-sm font-medium transition-all ${
                    formData.budget === opt 
                      ? 'bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 shadow-lg' 
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
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
            placeholder="例如：想要体验米其林餐厅，参观小众博物馆..."
            value={formData.interests}
            onChange={handleChange}
            className={`${inputClasses} resize-none`}
          />
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
    </div>
  );
};

export default TravelForm;