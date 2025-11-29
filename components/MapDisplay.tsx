import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Itinerary, Activity } from '../types';

// Fix for default Leaflet marker icons in React
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Vibrant but sophisticated colors for different days
const DAY_COLORS = [
  '#059669', // Emerald
  '#d97706', // Amber
  '#0891b2', // Cyan
  '#be123c', // Rose
  '#4f46e5', // Indigo
  '#7c3aed', // Violet
  '#db2777', // Pink
  '#ea580c', // Orange
  '#1d4ed8', // Blue
  '#0f766e', // Teal
];

interface MapDisplayProps {
  itinerary: Itinerary | null;
  selectedDay: number | null;
}

// Component to handle map view updates
const MapUpdater: React.FC<{ activities: Activity[] }> = ({ activities }) => {
  const map = useMap();

  useEffect(() => {
    if (activities.length > 0) {
      const bounds = L.latLngBounds(
        activities.map(a => [a.coordinates.latitude, a.coordinates.longitude])
      );
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }
  }, [activities, map]);

  return null;
};

const MapRevalidator: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    // 1. 挂载时立即刷新
    map.invalidateSize();

    // 2. 监听容器大小变化（处理 tab 切换、窗口缩放、CSS 动画）
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });

    const container = map.getContainer();
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [map]);

  return null;
};

// Component to render arrows along the path
const DirectionArrows: React.FC<{ positions: [number, number][], color: string }> = ({ positions, color }) => {
  if (positions.length < 2) return null;

  const arrows = [];
  
  // Create an arrow for each segment
  for (let i = 0; i < positions.length - 1; i++) {
    const start = positions[i];
    const end = positions[i + 1];
    
    // Calculate angle
    const dx = end[1] - start[1];
    const dy = end[0] - start[0];
    const angle = Math.atan2(dx, dy) * (180 / Math.PI); // Convert to degrees
    
    // Calculate midpoint
    const midLat = (start[0] + end[0]) / 2;
    const midLng = (start[1] + end[1]) / 2;
    
    // Create a rotated arrow icon using DivIcon
    const arrowIcon = L.divIcon({
      className: 'arrow-icon',
      html: `<div style="transform: rotate(${angle}deg); color: ${color}; font-size: 20px; text-shadow: 0 0 2px white; opacity: 0.8;">➤</div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    arrows.push(
      <Marker key={`arrow-${i}`} position={[midLat, midLng]} icon={arrowIcon} interactive={false} />
    );
  }

  return <>{arrows}</>;
};

const MapDisplay: React.FC<MapDisplayProps> = ({ itinerary, selectedDay }) => {
  // If we have an itinerary, we need to process days to display
  const daysToDisplay = itinerary?.days?.filter(d => selectedDay === null || d.day === selectedDay) || [];
  
  // All visible activities for bounds calculation
  const allVisibleActivities = daysToDisplay.flatMap(d => d.activities);

  const defaultCenter: [number, number] = [20, 0]; // World view
  const defaultZoom = 2;

  const mapKey = itinerary ? `map-${itinerary.tripTitle}-${selectedDay}-${itinerary.days.length}` : 'map-empty';

  return (
    <div className="h-full w-full relative z-0 bg-stone-100 dark:bg-stone-900">
      <MapContainer 
        key={mapKey}
        center={defaultCenter} 
        zoom={defaultZoom} 
        scrollWheelZoom={true} 
        className="h-full w-full outline-none"
      >
        {/* 在此处启用自动刷新 */}
        <MapRevalidator />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {daysToDisplay.map((day, dayIndex) => {
           const color = DAY_COLORS[(day.day - 1) % DAY_COLORS.length];
           const positions = day.activities.map(a => [a.coordinates.latitude, a.coordinates.longitude] as [number, number]);
           
           return (
             <React.Fragment key={`day-group-${day.day}`}>
               {/* Markers */}
               {day.activities.map((activity, idx) => (
                  <Marker 
                    key={`${day.day}-${idx}`}
                    position={[activity.coordinates.latitude, activity.coordinates.longitude]}
                    icon={customIcon}
                  >
                    <Popup className="font-sans">
                      <div className="p-1 min-w-[150px]">
                        <h3 className="font-serif font-bold text-stone-800 text-base mb-1">{activity.activityName}</h3>
                        <p className="text-xs text-stone-600 mb-2">{activity.locationName}</p>
                        <div className="flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full" style={{ background: color }}></span>
                           <p className="text-xs font-mono font-medium text-stone-500">
                              Day {day.day} • {activity.time}
                           </p>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
               ))}

               {/* Polylines */}
               {positions.length > 1 && (
                 <>
                    <Polyline 
                      positions={positions} 
                      color={color}
                      weight={3}
                      opacity={0.7}
                      dashArray="5, 10" 
                    />
                    <DirectionArrows positions={positions} color={color} />
                 </>
               )}
             </React.Fragment>
           );
        })}

        <MapUpdater activities={allVisibleActivities} />
      </MapContainer>
      
      {!itinerary && (
        <div className="absolute inset-0 z-[400] bg-stone-50/50 dark:bg-stone-950/50 backdrop-blur-sm flex items-center justify-center pointer-events-none">
          <p className="bg-white/90 dark:bg-stone-800/90 px-6 py-3 rounded-full shadow-lg text-stone-500 dark:text-stone-400 text-sm font-medium border border-stone-200 dark:border-stone-700 tracking-wide font-serif">
            等待行程生成...
          </p>
        </div>
      )}

      {/* Legend for Day Colors if multiple days are shown */}
      {itinerary && selectedDay === null && itinerary.days.length > 1 && (
         <div className="absolute bottom-6 left-4 z-[400] bg-white/90 dark:bg-stone-900/90 backdrop-blur p-3 rounded-xl shadow-lg border border-stone-200 dark:border-stone-800 max-h-48 overflow-y-auto w-32">
            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-2 text-stone-500 dark:text-stone-400 border-b border-stone-100 dark:border-stone-800 pb-1">Day Guide</h4>
            {itinerary.days.map(day => (
              <div key={day.day} className="flex items-center gap-2 mb-1.5 last:mb-0">
                <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: DAY_COLORS[(day.day - 1) % DAY_COLORS.length] }}></span>
                <span className="text-xs font-medium text-stone-600 dark:text-stone-300">Day {day.day}</span>
              </div>
            ))}
         </div>
      )}

      {itinerary && selectedDay && (
         <div className="absolute top-4 right-4 z-[400]">
            <span 
              className="text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-xl tracking-wider font-serif"
              style={{ backgroundColor: DAY_COLORS[(selectedDay - 1) % DAY_COLORS.length] }}
            >
              Day {selectedDay}
            </span>
         </div>
      )}
    </div>
  );
};

export default MapDisplay;