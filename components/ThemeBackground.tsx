
import React, { useMemo } from 'react';
import { getThemeStyles } from '../utils/themeData';

interface ThemeBackgroundProps {
  theme: string;
  mode: 'light' | 'dark';
  children: React.ReactNode;
}

const ThemeBackground: React.FC<ThemeBackgroundProps> = ({ theme, mode, children }) => {
  const config = useMemo(() => getThemeStyles(theme, mode), [theme, mode]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden transition-all duration-1000 ease-in-out">
      {/* Base Background Layer */}
      <div 
        className="absolute inset-0 z-0 transition-all duration-1000"
        style={{ background: config.bg }}
      />

      {/* Shapes Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {config.shapes.map((shape, idx) => (
          <div
            key={`${theme}-${mode}-${idx}`}
            className={`absolute transition-all duration-1000 ease-in-out ${shape.type === 'circle' ? 'rounded-full' : ''}`}
            style={{
              ...shape.style,
              // Ensure smooth transitions for these elements
              transition: 'all 1s ease-in-out'
            }}
          />
        ))}
        
        {/* Special 'Stars' overlay for Night modes globally if not explicit */}
        {mode === 'dark' && (
           <div className="absolute inset-0 opacity-70 mix-blend-screen"
             style={{
               backgroundImage: `
                 radial-gradient(1.5px 1.5px at 10% 10%, white, transparent), 
                 radial-gradient(1px 1px at 20% 40%, white, transparent), 
                 radial-gradient(1.5px 1.5px at 50% 80%, white, transparent), 
                 radial-gradient(1px 1px at 80% 20%, white, transparent),
                 radial-gradient(1.5px 1.5px at 15% 65%, white, transparent),
                 radial-gradient(1px 1px at 35% 15%, white, transparent),
                 radial-gradient(1.5px 1.5px at 60% 30%, white, transparent),
                 radial-gradient(1px 1px at 85% 75%, white, transparent),
                 radial-gradient(1.5px 1.5px at 90% 10%, white, transparent),
                 radial-gradient(1px 1px at 45% 55%, white, transparent)
               `,
               backgroundSize: '500px 500px'
             }}
           />
        )}
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ThemeBackground;
