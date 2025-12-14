import { ThemeDefinition } from './types';
import { COMMON_SHAPES } from './common';

export const beachTheme: ThemeDefinition = {
  day: {
    bg: 'linear-gradient(180deg, #bae6fd 0%, #7dd3fc 40%, #fef3c7 40%, #fde68a 60%, #fcd34d 100%)', // Sky -> Horizon -> Sand
    shapes: [
      COMMON_SHAPES.sun,
      // Ocean gradient
      { 
        type: 'gradient', 
        style: { 
          top: '40%', 
          left: 0, 
          width: '100%', 
          height: '20%', 
          background: 'linear-gradient(180deg, #0ea5e9 0%, #38bdf8 50%, #7dd3fc 100%)', 
          opacity: 0.8
        } 
      },
      // Horizon line/haze
      { 
        type: 'gradient', 
        style: { 
          top: '38%', 
          left: 0, 
          width: '100%', 
          height: '4%', 
          background: '#fff', 
          filter: 'blur(2px)',
          opacity: 0.3
        } 
      },
      // Sand texture/dunes
      { 
        type: 'circle', 
        style: { 
          bottom: '-20%', 
          left: '-20%', 
          width: '80vw', 
          height: '50vh', 
          background: '#fbbf24', 
          filter: 'blur(40px)', 
          borderRadius: '50% 50% 0 0',
          opacity: 0.6 
        } 
      },
      { 
        type: 'circle', 
        style: { 
          bottom: '-30%', 
          right: '-10%', 
          width: '90vw', 
          height: '60vh', 
          background: '#f59e0b', 
          filter: 'blur(50px)', 
          borderRadius: '50% 50% 0 0',
          opacity: 0.5 
        } 
      },
      // Wave foam hints
      {
        type: 'gradient',
        style: {
            top: '58%',
            width: '100%',
            height: '5%',
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.6) 0%, transparent 70%)',
            filter: 'blur(5px)',
            opacity: 0.7
        }
      }
    ]
  },
  night: {
    bg: 'linear-gradient(180deg, #020617 0%, #1e3a8a 45%, #172554 50%, #374151 100%)',
    shapes: [
      COMMON_SHAPES.stars,
      COMMON_SHAPES.moon,
      // Dark Ocean
      { 
        type: 'gradient', 
        style: { 
          top: '50%', 
          left: 0, 
          width: '100%', 
          height: '15%', 
          background: 'linear-gradient(180deg, #1e3a8a 0%, #172554 100%)', 
          opacity: 0.9
        } 
      },
      // Moon reflection
      { 
        type: 'gradient', 
        style: { 
          top: '50%', 
          left: 0, 
          width: '100%', 
          height: '20%', 
          background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)', 
          filter: 'blur(20px)' 
        } 
      },
      // Dark Sand
      {
        type: 'circle',
        style: {
            bottom: '-10%',
            right: '-10%',
            width: '60vw',
            height: '40vh',
            background: '#1f2937',
            filter: 'blur(40px)',
            opacity: 0.9
        }
      }
    ]
  }
};
