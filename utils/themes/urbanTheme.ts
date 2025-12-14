import { ThemeDefinition } from './types';
import { COMMON_SHAPES } from './common';

export const urbanTheme: ThemeDefinition = {
  day: {
    bg: 'linear-gradient(180deg, #e2e8f0 0%, #cbd5e1 100%)',
    shapes: [
      { 
        type: 'rect', 
        style: { 
          bottom: '0', 
          left: '5%', 
          width: '10%', 
          height: '40%', 
          background: '#94a3b8', 
          opacity: 0.3,
          boxShadow: 'inset -2px 0 5px rgba(0,0,0,0.1)'
        } 
      },
      { 
        type: 'rect', 
        style: { 
          bottom: '0', 
          left: '18%', 
          width: '12%', 
          height: '65%', 
          background: '#64748b', 
          opacity: 0.25,
          boxShadow: 'inset -2px 0 5px rgba(0,0,0,0.1)'
        } 
      },
      { 
        type: 'rect', 
        style: { 
          bottom: '0', 
          left: '35%', 
          width: '8%', 
          height: '30%', 
          background: '#94a3b8', 
          opacity: 0.3 
        } 
      },
      { 
        type: 'rect', 
        style: { 
          bottom: '0', 
          left: '45%', 
          width: '15%', 
          height: '50%', 
          background: '#64748b', 
          opacity: 0.2,
          borderRadius: '2px 2px 0 0'
        } 
      },
      { 
        type: 'rect', 
        style: { 
          bottom: '0', 
          left: '65%', 
          width: '10%', 
          height: '75%', 
          background: '#475569', 
          opacity: 0.15 
        } 
      },
      { 
        type: 'circle', 
        style: { 
          top: '-15%', 
          right: '-5%', 
          width: '40vw', 
          height: '40vw', 
          background: 'radial-gradient(circle, #f8fafc 0%, transparent 70%)', 
          opacity: 0.6 
        } 
      },
      // Windows hint
      {
        type: 'gradient',
        style: {
            bottom: '10%',
            left: '20%',
            width: '8%',
            height: '40%',
            backgroundImage: 'radial-gradient(#f1f5f9 1px, transparent 1px)',
            backgroundSize: '8px 12px',
            opacity: 0.3
        }
      }
    ]
  },
  night: {
    bg: 'linear-gradient(180deg, #020617 0%, #1e1b4b 100%)',
    shapes: [
      COMMON_SHAPES.stars,
      // Skyline silhouettes with more depth
      { type: 'rect', style: { bottom: '0', left: '5%', width: '10%', height: '40%', background: '#1e293b', opacity: 0.7 } },
      { type: 'rect', style: { bottom: '0', left: '18%', width: '12%', height: '65%', background: '#0f172a', opacity: 0.9 } },
      { type: 'rect', style: { bottom: '0', left: '35%', width: '8%', height: '30%', background: '#1e293b', opacity: 0.8 } },
      { type: 'rect', style: { bottom: '0', left: '45%', width: '15%', height: '55%', background: '#0f172a', opacity: 0.85 } },
      { type: 'rect', style: { bottom: '0', left: '65%', width: '10%', height: '70%', background: '#1e293b', opacity: 0.9 } },
      
      // Neon glows
      { type: 'circle', style: { top: '60%', left: '20%', width: '150px', height: '150px', background: '#d946ef', filter: 'blur(80px)', opacity: 0.2 } },
      { type: 'circle', style: { bottom: '30%', right: '15%', width: '200px', height: '200px', background: '#0ea5e9', filter: 'blur(90px)', opacity: 0.2 } },
      
      // Traffic light trails hint
      { type: 'gradient', style: { bottom: '0', left: '0', width: '100%', height: '5px', background: 'linear-gradient(90deg, transparent, #ef4444, #eab308, transparent)', filter: 'blur(4px)', opacity: 0.6 } }
    ]
  }
};
