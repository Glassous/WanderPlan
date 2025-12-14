import { ThemeDefinition } from './types';
import { COMMON_SHAPES } from './common';

export const beachTheme: ThemeDefinition = {
  day: {
    bg: 'linear-gradient(180deg, #bae6fd 0%, #e0f2fe 50%, #fef3c7 50%, #fde68a 100%)',
    shapes: [
      COMMON_SHAPES.sun,
      { 
        type: 'gradient', 
        style: { 
          top: '40%', 
          left: 0, 
          width: '100%', 
          height: '20%', 
          background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)', 
          opacity: 0.6,
          filter: 'blur(10px)'
        } 
      }, // Horizon haze
      { 
        type: 'circle', 
        style: { 
          bottom: '-20%', 
          left: '-10%', 
          width: '60vw', 
          height: '60vw', 
          background: '#fbbf24', 
          filter: 'blur(80px)', 
          opacity: 0.3 
        } 
      },
      {
        type: 'gradient',
        style: {
            bottom: '0',
            width: '100%',
            height: '15%',
            background: 'linear-gradient(to top, #fcd34d 0%, transparent 100%)',
            opacity: 0.4
        }
      }
    ]
  },
  night: {
    bg: 'linear-gradient(180deg, #0f172a 0%, #1e3a8a 50%, #374151 50%, #1f2937 100%)',
    shapes: [
      COMMON_SHAPES.stars,
      COMMON_SHAPES.moon,
      { 
        type: 'gradient', 
        style: { 
          top: '50%', 
          left: 0, 
          width: '100%', 
          height: '200px', 
          background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)', 
          filter: 'blur(30px)' 
        } 
      }, // Moon reflection on water
      {
        type: 'circle',
        style: {
            bottom: '-10%',
            right: '-10%',
            width: '50vw',
            height: '40vh',
            background: '#111827',
            filter: 'blur(60px)',
            opacity: 0.8
        }
      }
    ]
  }
};
