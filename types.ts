
export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface Activity {
  time: string;
  activityName: string;
  description: string;
  locationName: string;
  coordinates: LocationCoordinates;
}

export interface DayPlan {
  day: number;
  theme: string;
  activities: Activity[];
}

export interface Itinerary {
  id: string; // Unique ID for history
  createdAt: number; // Timestamp
  tripTitle: string;
  summary: string;
  days: DayPlan[];
  visualTheme: string; // New field for background theme
  model?: string; // 生成行程的模型
  notes?: string[]; // 注意事项
  shareId?: string;
  inCommunity?: boolean;
}

export interface TripFormData {
  destination: string;
  duration: number;
  travelers: string;
  interests: string;
  budget: string;
  startTime: string; // Start time for day 1
  endTime: string;   // End time for last day
}
