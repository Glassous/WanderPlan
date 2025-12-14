import { ThemeDefinition } from './types';
import { COMMON_SHAPES } from './common';

export const snowTheme: ThemeDefinition = {
  day: {
    bg: 'linear-gradient(to bottom, #f0f9ff, #e0f2fe, #f8fafc)',
    shapes: [
      { 
        type: 'circle', 
        style: { 
          top: '-10%', 
          right: '10%', 
          width: '100px', 
          height: '100px', 
          background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 70%)', 
          filter: 'blur(20px)', 
          opacity: 0.8 
        } 
      }, // Pale sun
      { 
        type: 'circle', 
        style: { 
          bottom: '-25%', 
          left: '-15%', 
          width: '70vw', 
          height: '60vh', 
          background: '#cbd5e1', 
          filter: 'blur(50px)', 
          transform: 'rotate(-15deg)',
          opacity: 0.5
        } 
      }, // Slope
      { 
        type: 'circle', 
        style: { 
          bottom: '-25%', 
          right: '-15%', 
          width: '80vw', 
          height: '70vh', 
          background: '#ffffff', 
          filter: 'blur(60px)', 
          transform: 'rotate(20deg)',
          opacity: 0.8
        } 
      },
      // Ice crystals / Sparkles
      { type: 'circle', style: { top: '30%', left: '20%', width: '4px', height: '4px', background: '#fff', boxShadow: '0 0 5px 1px #e0f2fe', opacity: 0.6 } },
      { type: 'circle', style: { top: '50%', right: '30%', width: '3px', height: '3px', background: '#fff', boxShadow: '0 0 5px 1px #e0f2fe', opacity: 0.7 } },
      { type: 'circle', style: { bottom: '40%', left: '40%', width: '5px', height: '5px', background: '#fff', boxShadow: '0 0 5px 1px #e0f2fe', opacity: 0.5 } },
    ]
  },
  night: {
    bg: 'linear-gradient(to bottom, #020617, #1e293b, #334155)',
    shapes: [
      COMMON_SHAPES.stars,
      { 
        type: 'circle', 
        style: { 
          top: '-30%', 
          left: '10%', 
          width: '90vw', 
          height: '50vh', 
          background: '#2dd4bf', 
          filter: 'blur(100px)', 
          opacity: 0.2,
          mixBlendMode: 'screen'
        } 
      }, // Aurora 1
      { 
        type: 'circle', 
        style: { 
          top: '-20%', 
          right: '5%', 
          width: '70vw', 
          height: '40vh', 
          background: '#818cf8', 
          filter: 'blur(90px)', 
          opacity: 0.2,
          mixBlendMode: 'screen'
        } 
      }, // Aurora 2
      { 
        type: 'circle', 
        style: { 
          bottom: '0', 
          width: '100%', 
          height: '35%', 
          background: '#f1f5f9', 
          filter: 'blur(40px)', 
          opacity: 0.15 
        } 
      }, // Snow reflection
      // Icy shimmer
      {
        type: 'gradient',
        style: {
          bottom: '0',
          left: '0',
          width: '100%',
          height: '20%',
          background: 'linear-gradient(to top, rgba(255,255,255,0.05) 0%, transparent 100%)',
          filter: 'blur(20px)'
        }
      }
    ]
  }
};
