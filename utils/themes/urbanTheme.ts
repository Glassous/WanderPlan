import { ThemeDefinition } from './types';
import { COMMON_SHAPES } from './common';

export const urbanTheme: ThemeDefinition = {
  day: {
    bg: 'linear-gradient(180deg, #f1f5f9 0%, #cbd5e1 100%)',
    shapes: [
      { type: 'rect', style: { bottom: '0', left: '10%', width: '8%', height: '35%', background: '#94a3b8', opacity: 0.15 } },
      { type: 'rect', style: { bottom: '0', left: '20%', width: '12%', height: '55%', background: '#64748b', opacity: 0.1 } },
      { type: 'rect', style: { bottom: '0', left: '35%', width: '6%', height: '25%', background: '#94a3b8', opacity: 0.15 } },
      { type: 'rect', style: { bottom: '0', left: '45%', width: '10%', height: '45%', background: '#64748b', opacity: 0.1 } },
      { type: 'rect', style: { bottom: '0', left: '65%', width: '15%', height: '30%', background: '#94a3b8', opacity: 0.15 } },
      { type: 'circle', style: { top: '-20%', right: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, #f8fafc 0%, transparent 70%)', opacity: 0.7 } }
    ]
  },
  night: {
    bg: 'linear-gradient(180deg, #020617 0%, #1e1b4b 100%)',
    shapes: [
      COMMON_SHAPES.stars,
      // Skyline silhouettes
      { type: 'rect', style: { bottom: '0', left: '10%', width: '8%', height: '35%', background: '#1e293b', opacity: 0.8 } },
      { type: 'rect', style: { bottom: '0', left: '20%', width: '12%', height: '55%', background: '#0f172a', opacity: 0.9 } },
      { type: 'rect', style: { bottom: '0', left: '45%', width: '10%', height: '45%', background: '#1e293b', opacity: 0.8 } },
      { type: 'rect', style: { bottom: '0', left: '70%', width: '14%', height: '30%', background: '#0f172a', opacity: 0.9 } },
      
      // Neon glows
      { type: 'circle', style: { top: '50%', left: '15%', width: '250px', height: '250px', background: '#d946ef', filter: 'blur(100px)', opacity: 0.15 } },
      { type: 'circle', style: { bottom: '20%', right: '10%', width: '300px', height: '300px', background: '#0ea5e9', filter: 'blur(100px)', opacity: 0.15 } },
      { type: 'gradient', style: { bottom: 0, left: 0, width: '100%', height: '20%', background: 'linear-gradient(to top, rgba(14, 165, 233, 0.1), transparent)' } }
    ]
  }
};
